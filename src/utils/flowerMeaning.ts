import type { Product } from '../store/useCartStore'

export interface FlowerMeaningInfo {
  tagline: string
  description: string
  emotion: string
  colorBadge: string
}

export const FLOWER_MEANING_DATABASE: Record<string, FlowerMeaningInfo> = {
  merah: {
    tagline: 'Cinta Membara & Romansa Sejati',
    description: 'Mawar merah adalah simbol keabadian cinta, hasrat yang mendalam, dan keberanian. Sangat sempurna untuk perayaan anniversary pernikahan, Valentine, atau kejutan romantis pasangan.',
    emotion: '🔥 Romantis & Passionate',
    colorBadge: 'bg-rose-100 text-rose-800 border-rose-200'
  },
  pinksweet: {
    tagline: 'Kelembutan, Kasih Sayang & Apresiasi Tulus',
    description: 'Warna pink manis melambangkan kelembutan hati, kebahagiaan, dan rasa terima kasih yang mendalam. Pilihan favorit untuk hadiah ulang tahun sahabat, ucapan terima kasih untuk Ibu, atau hadiah wisuda.',
    emotion: '🌸 Manis & Penuh Apresiasi',
    colorBadge: 'bg-pink-100 text-pink-800 border-pink-200'
  },
  pink: {
    tagline: 'Kelembutan & Kasih Sayang',
    description: 'Melambangkan kelembutan hati dan rasa kagum. Sangat pas untuk kado ulang tahun sahabat atau ungkapan kasih sayang.',
    emotion: '🌸 Kelembutan Hati',
    colorBadge: 'bg-pink-100 text-pink-800 border-pink-200'
  },
  peach: {
    tagline: 'Ketulusan Hati & Kehangatan Persahabatan',
    description: 'Mawar warna peach memancarkan nuansa hangat, bersahaja, dan jujur. Menjadi simbol ketulusan hubungan dan apresiasi tinggi untuk rekan kerja atau sahabat dekat.',
    emotion: '🍑 Hangat & Tulus',
    colorBadge: 'bg-orange-100 text-orange-800 border-orange-200'
  },
  putih: {
    tagline: 'Kesucian, Kedamaian & Harapan Baru',
    description: 'Bunga mawar putih menyampaikan pesan kemurnian niat, ketenangan, dan awal perjalanan baru yang suci. Cocok untuk buket pengantin (wedding bouquet), peresmian, maupun ucapan duka cita.',
    emotion: '🕊️ Suci & Suasana Hening',
    colorBadge: 'bg-slate-100 text-slate-800 border-slate-200'
  },
  candy: {
    tagline: 'Keceriaan, Energi Positif & Perayaan Manis',
    description: 'Perpaduan warna cerah yang memancarkan energi positif dan antusiasme. Sangat pas untuk kejutan keberhasilan karir, kado wisuda, dan pesta ulang tahun meriah.',
    emotion: '🍬 Ceria & Penuh Energi',
    colorBadge: 'bg-amber-100 text-amber-800 border-amber-200'
  },
  kuning: {
    tagline: 'Persahabatan Sejati & Optimisme',
    description: 'Warna kuning cerah membawa kehangatan seperti sinar matahari. Melambangkan persahabatan yang erat, harapan baru, serta memberikan semangat positif.',
    emotion: '☀️ Optimis & Ceria',
    colorBadge: 'bg-yellow-100 text-yellow-800 border-yellow-200'
  },
  ungu: {
    tagline: 'Pesona Anggun, Kemewahan & Kebanggaan',
    description: 'Mawar ungu memancarkan pesona misterius yang elegan, kebanggaan pencapaian, dan rasa kagum pada pandangan pertama.',
    emotion: '💜 Anggun & Mewah',
    colorBadge: 'bg-purple-100 text-purple-800 border-purple-200'
  },
  sunflower: {
    tagline: 'Semangat Pantang Menyerah & Harapan Masa Depan Cerah',
    description: 'Bunga matahari selalu menghadap ke arah cahaya, melambangkan kehangatan, kebahagiaan sejati, dan harapan sukses di masa depan.',
    emotion: '🌻 Semangat Masa Depan',
    colorBadge: 'bg-amber-100 text-amber-900 border-amber-200'
  },
  lily: {
    tagline: 'Keanggunan, Kemewahan & Kemurnian Hati',
    description: 'Bunga lily memancarkan aroma harum yang menenangkan serta bentuk kuntum besar yang sangat anggun untuk hiasan meja dan buket wisuda.',
    emotion: '👑 Anggun & Harum',
    colorBadge: 'bg-emerald-100 text-emerald-800 border-emerald-200'
  }
}

/**
 * Returns the emotional meaning and symbolism for a given product
 */
export function getProductFlowerMeaning(product: Partial<Product> | null | undefined): FlowerMeaningInfo {
  if (!product) {
    return FLOWER_MEANING_DATABASE.merah
  }

  // If admin provided a custom meaning in CMS, use it!
  if (product.flower_meaning_custom && product.flower_meaning_custom.trim().length > 0) {
    return {
      tagline: `Makna Spesial Rangkaian ${product.name || 'Bunga'}`,
      description: product.flower_meaning_custom.trim(),
      emotion: product.moment_tag ? `✨ ${product.moment_tag}` : '🌸 Makna Spesial',
      colorBadge: 'bg-primary-100 text-primary-900 border-primary-200'
    }
  }

  const searchable = [
    product.color,
    product.name,
    product.flower_type,
    product.description
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  if (searchable.includes('pinksweet') || searchable.includes('pink sweet')) return FLOWER_MEANING_DATABASE.pinksweet
  if (searchable.includes('peach') || searchable.includes('salem')) return FLOWER_MEANING_DATABASE.peach
  if (searchable.includes('merah') || searchable.includes('red')) return FLOWER_MEANING_DATABASE.merah
  if (searchable.includes('putih') || searchable.includes('white')) return FLOWER_MEANING_DATABASE.putih
  if (searchable.includes('candy') || searchable.includes('rainbow')) return FLOWER_MEANING_DATABASE.candy
  if (searchable.includes('kuning') || searchable.includes('yellow')) return FLOWER_MEANING_DATABASE.kuning
  if (searchable.includes('ungu') || searchable.includes('purple')) return FLOWER_MEANING_DATABASE.ungu
  if (searchable.includes('matahari') || searchable.includes('sunflower')) return FLOWER_MEANING_DATABASE.sunflower
  if (searchable.includes('lili') || searchable.includes('lily')) return FLOWER_MEANING_DATABASE.lily
  if (searchable.includes('pink')) return FLOWER_MEANING_DATABASE.pink

  return {
    tagline: 'Kesegaran Bunga Alami & Estetika Keindahan',
    description: `Rangkaian ${product.name || 'bunga segar'} dipetik khusus dari perkebunan alami untuk menyampaikan bentuk perhatian dan kehangatan ucapan bagi orang tersayang.`,
    emotion: '🌸 Keindahan Alami',
    colorBadge: 'bg-primary-50 text-primary-800 border-primary-100'
  }
}
