-- =======================================================
-- KEMBANG SELADANG WEB - PRODUCT DISCOUNT & SOLD COUNT
-- =======================================================
-- Jalankan di Supabase SQL Editor agar admin bisa menyimpan harga coret
-- dan storefront bisa menampilkan harga promo serta jumlah terjual.

ALTER TABLE products
ADD COLUMN IF NOT EXISTS original_price NUMERIC;

ALTER TABLE products
ADD COLUMN IF NOT EXISTS sold_count NUMERIC DEFAULT 0;

COMMENT ON COLUMN products.original_price IS
  'Harga normal sebelum diskon. Kosongkan/null jika produk tidak sedang promo.';

COMMENT ON COLUMN products.sold_count IS
  'Jumlah produk terjual yang dihitung dari pesanan lunas dan selesai/terkirim.';

UPDATE products
SET original_price = NULL
WHERE original_price IS NOT NULL
  AND original_price <= base_price;

UPDATE products
SET sold_count = 0
WHERE sold_count IS NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'products_original_price_positive'
  ) THEN
    ALTER TABLE products
    ADD CONSTRAINT products_original_price_positive
    CHECK (original_price IS NULL OR original_price >= 0);
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'products_original_price_above_base_price'
  ) THEN
    ALTER TABLE products
    ADD CONSTRAINT products_original_price_above_base_price
    CHECK (original_price IS NULL OR original_price > base_price);
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'products_sold_count_positive'
  ) THEN
    ALTER TABLE products
    ADD CONSTRAINT products_sold_count_positive
    CHECK (sold_count IS NULL OR sold_count >= 0);
  END IF;
END $$;

UPDATE products
SET base_price = 85000,
    original_price = 100000
WHERE lower(coalesce(flower_type, '')) = 'mawar'
  AND lower(coalesce(color, '')) IN ('merah', 'putih');

CREATE OR REPLACE FUNCTION public.recalculate_product_sold_counts()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE products
  SET sold_count = 0;

  WITH sold AS (
    SELECT
      matched.product_id,
      SUM(order_quantity.qty) AS total_qty
    FROM orders
    CROSS JOIN LATERAL jsonb_array_elements(coalesce(orders.items, '[]'::jsonb)) AS order_item(value)
    CROSS JOIN LATERAL (
      SELECT
        CASE
          WHEN coalesce(order_item.value->>'qty', '') ~ '^[0-9]+(\.[0-9]+)?$'
            THEN (order_item.value->>'qty')::numeric
          ELSE 0
        END AS qty
    ) AS order_quantity
    CROSS JOIN LATERAL (
      SELECT products.id AS product_id
      FROM products
      WHERE lower(coalesce(order_item.value->>'product_id', '')) = lower(products.id::text)
        OR lower(coalesce(order_item.value->>'productId', '')) = lower(products.id::text)
        OR lower(coalesce(order_item.value->>'name', order_item.value->>'flower_type', '')) = lower(coalesce(products.name, ''))
        OR (
          lower(coalesce(products.flower_type, '')) = lower(coalesce(order_item.value->>'flower_type', ''))
          AND lower(coalesce(products.color, '')) = lower(coalesce(order_item.value->>'color', ''))
          AND lower(coalesce(products.unit, '')) = lower(coalesce(order_item.value->>'unit', ''))
          AND lower(coalesce(products.stem_length, '')) = lower(coalesce(order_item.value->>'stem_length', ''))
        )
        OR (
          lower(coalesce(products.flower_type, '')) = lower(coalesce(order_item.value->>'flower_type', ''))
          AND lower(coalesce(products.color, '')) = lower(coalesce(order_item.value->>'color', ''))
          AND lower(coalesce(products.unit, '')) = lower(coalesce(order_item.value->>'unit', ''))
        )
      ORDER BY
        CASE
          WHEN lower(coalesce(order_item.value->>'product_id', '')) = lower(products.id::text) THEN 1
          WHEN lower(coalesce(order_item.value->>'productId', '')) = lower(products.id::text) THEN 2
          WHEN lower(coalesce(order_item.value->>'name', order_item.value->>'flower_type', '')) = lower(coalesce(products.name, '')) THEN 3
          WHEN lower(coalesce(products.stem_length, '')) = lower(coalesce(order_item.value->>'stem_length', '')) THEN 4
          ELSE 5
        END
      LIMIT 1
    ) AS matched
    WHERE lower(coalesce(orders.payment_status, '')) = 'lunas'
      AND lower(coalesce(orders.order_status, '')) IN ('selesai', 'terkirim', 'delivered')
      AND order_quantity.qty > 0
    GROUP BY matched.product_id
  )
  UPDATE products
  SET sold_count = sold.total_qty
  FROM sold
  WHERE products.id = sold.product_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.refresh_product_sold_counts_trigger()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  PERFORM public.recalculate_product_sold_counts();
  RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS orders_refresh_product_sold_counts ON public.orders;

CREATE TRIGGER orders_refresh_product_sold_counts
AFTER INSERT OR UPDATE OR DELETE
ON public.orders
FOR EACH STATEMENT
EXECUTE FUNCTION public.refresh_product_sold_counts_trigger();

SELECT public.recalculate_product_sold_counts();
