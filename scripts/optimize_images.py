import os
from PIL import Image

def optimize_images():
    print("Starting image optimization...")
    
    # 1. Category images optimization
    category_dir = os.path.join('public', 'images', 'categories')
    category_configs = {
        'rangkaian-meja.jpg': {'max_width': 400},
        'standing-flower.jpg': {'max_width': 400},
        'buket-bunga.jpg': {'max_width': 400},
        'bunga-potong-segar.jpg': {'max_width': 400},
    }

    if os.path.exists(category_dir):
        for filename, cfg in category_configs.items():
            filepath = os.path.join(category_dir, filename)
            if os.path.exists(filepath):
                with Image.open(filepath) as img:
                    orig_size = os.path.getsize(filepath)
                    if img.mode in ('RGBA', 'P'):
                        img = img.convert('RGB')
                    
                    w, h = img.size
                    max_w = cfg['max_width']
                    if w > max_w:
                        new_h = int(h * (max_w / w))
                        img_resized = img.resize((max_w, new_h), Image.Resampling.LANCZOS)
                    else:
                        img_resized = img

                    # Save WebP version
                    webp_path = os.path.splitext(filepath)[0] + '.webp'
                    img_resized.save(webp_path, 'WEBP', quality=70, method=6)
                    webp_size = os.path.getsize(webp_path)

                    # Overwrite/re-save compressed JPG
                    img_resized.save(filepath, 'JPEG', quality=75, optimize=True)
                    jpg_size = os.path.getsize(filepath)

                    print(f"Category {filename}: Orig {orig_size/1024:.1f}KB -> JPG {jpg_size/1024:.1f}KB | WebP {webp_size/1024:.1f}KB")

    # 2. Product images optimization
    product_dir = os.path.join('public', 'images', 'products')
    if os.path.exists(product_dir):
        for f in os.listdir(product_dir):
            if f.lower().endswith(('.jpg', '.jpeg', '.png')):
                filepath = os.path.join(product_dir, f)
                with Image.open(filepath) as img:
                    orig_size = os.path.getsize(filepath)
                    if img.mode in ('RGBA', 'P'):
                        img = img.convert('RGB')
                    w, h = img.size
                    if w > 600:
                        new_h = int(h * (600 / w))
                        img_resized = img.resize((600, new_h), Image.Resampling.LANCZOS)
                    else:
                        img_resized = img

                    webp_path = os.path.splitext(filepath)[0] + '.webp'
                    img_resized.save(webp_path, 'WEBP', quality=82, method=6)
                    webp_size = os.path.getsize(webp_path)

                    img_resized.save(filepath, 'JPEG', quality=82, optimize=True)
                    jpg_size = os.path.getsize(filepath)

                    print(f"Product {f}: Orig {orig_size/1024:.1f}KB -> JPG {jpg_size/1024:.1f}KB | WebP {webp_size/1024:.1f}KB")

    # 3. Logos & Icons in public/
    public_dir = 'public'
    
    logo_png = os.path.join(public_dir, 'logo.png')
    if os.path.exists(logo_png):
        with Image.open(logo_png) as img:
            orig_size = os.path.getsize(logo_png)
            img_128 = img.resize((128, 128), Image.Resampling.LANCZOS)
            img_128.save(logo_png, 'PNG', optimize=True)
            new_png_size = os.path.getsize(logo_png)

            logo_webp = os.path.join(public_dir, 'logo.webp')
            img_128.save(logo_webp, 'WEBP', quality=90, method=6)
            webp_size = os.path.getsize(logo_webp)
            print(f"Logo PNG: Orig {orig_size/1024:.1f}KB -> PNG {new_png_size/1024:.1f}KB | WebP {webp_size/1024:.1f}KB")

    logo_jpg = os.path.join(public_dir, 'logo.jpg')
    if os.path.exists(logo_jpg):
        with Image.open(logo_jpg) as img:
            orig_size = os.path.getsize(logo_jpg)
            img_512 = img.resize((512, 512), Image.Resampling.LANCZOS)
            if img_512.mode in ('RGBA', 'P'):
                img_512 = img_512.convert('RGB')
            img_512.save(logo_jpg, 'JPEG', quality=85, optimize=True)
            new_jpg_size = os.path.getsize(logo_jpg)
            print(f"Logo JPG: Orig {orig_size/1024:.1f}KB -> JPG {new_jpg_size/1024:.1f}KB")

    favicon_specs = {
        'favicon-48.png': (48, 48),
        'favicon.png': (32, 32),
        'apple-touch-icon.png': (180, 180),
    }

    for name, (target_w, target_h) in favicon_specs.items():
        fp = os.path.join(public_dir, name)
        if os.path.exists(fp):
            with Image.open(fp) as img:
                orig_size = os.path.getsize(fp)
                img_resized = img.resize((target_w, target_h), Image.Resampling.LANCZOS)
                img_resized.save(fp, 'PNG', optimize=True)
                new_size = os.path.getsize(fp)
                print(f"Icon {name}: Orig {orig_size/1024:.1f}KB -> PNG {new_size/1024:.1f}KB")

    print("Image optimization finished.")

if __name__ == '__main__':
    optimize_images()
