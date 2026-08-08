export const wedding = {
  groom: {
    name: 'Vikram Rathore',
    short: 'Vikram',
    parents: 'Son of Shri Prakash Rathore & Smt. Anshi Devi',
  },
  bride: {
    name: 'Kavita Ghelot',
    short: 'Kavita',
    parents: 'Daughter of Shri Samaram Ghelot & Smt. Geeta Devi',
  },
  weddingDate: '2026-11-26T10:00:00',
  weddingDateReveal: {
    day: '26',
    month: 'November',
    year: '2026',
    weekday: 'Thursday',
    label: '26 November 2026',
  },
  dateRangeLabel: '23 — 27 November 2026',
  city: 'Sirohi',
  weddingVenue: {
    label: 'Wedding (Phera)',
    place: 'Bankli, Sumerpur, Pali',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Bankli+Sumerpur+Pali+Rajasthan',
    mapsEmbed:
      'https://maps.google.com/maps?q=Bankli%2C%20Sumerpur%2C%20Pali%2C%20Rajasthan&t=&z=14&ie=UTF8&iwloc=&output=embed',
  },
  tagline: 'Two souls. One sacred journey.',
  host: {
    name: 'Prakash Rathore',
    lineage: 'S/o Ukaji Rathore',
    label: 'Shubh Sathal',
    address: '1/340, Housing Board Colony, Sirohi',
    mapsQuery: '1/340 Housing Board Colony Sirohi Rajasthan',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=1%2F340+Housing+Board+Colony+Sirohi',
    mapsEmbed:
      'https://maps.google.com/maps?q=Housing%20Board%20Colony%2C%20Sirohi%2C%20Rajasthan&t=&z=15&ie=UTF8&iwloc=&output=embed',
  },
  contact: {
    name: 'Guest Assistance',
    phone: '',
    note: 'For venue directions, stay arrangements, or any queries, please reach out to the family.',
  },
  assets: {
    logo: '/logo-vk.png',
    hero: '/hero-palace.jpg',
  },
  /**
   * Drop your licensed MP3 files into public/music/ with these exact names.
   * On each card open / refresh, one track is chosen at random (not repeating the last one).
   */
  playlist: [
    { id: 'kesariya', title: 'Kesariya Balam', src: '/music/kesariya-balam.mp3', startAt: 40 },
    { id: 'mangalyam-sathiya', title: 'Mangalyam Sathiya', src: '/music/mangalyam-sathiya.mp3', startAt: 0 },
    { id: 'jalalo-bilalo', title: 'Jalalo Bilalo', src: '/music/jalalo-bilalo.mp3', startAt: 50 },
    { id: 'kudmayi', title: 'Kudmayi', src: '/music/kudmayi.mp3', startAt: 45 },
  ],
  dressCode: {
    title: 'Wardrobe & Dress Code',
    note: 'Traditional Indian festive attire is warmly encouraged. Embrace jewel tones, soft pastels, or classic ethnic wear — celebrate with colour and grace.',
    suggestions: [
      { event: 'Haldi & Bandoli', tip: 'Bright yellows, florals & festive casuals' },
      { event: 'Sangeet', tip: 'Glam ethnic — lehengas, sherwanis, Indo-western' },
      { event: 'Wedding', tip: 'Elegant traditional — reds, maroons, golds & creams' },
      { event: 'Reception', tip: 'Formal festive — chic ethnic or formal wear' },
    ],
  },
  gallery: [
    { src: '/gallery/couple-1.png', caption: 'Golden hour', position: 'center 20%' },
    { src: '/gallery/couple-2.png', caption: 'Together', position: 'center 18%' },
    { src: '/gallery/couple-3.png', caption: 'Hand in hand', position: 'center 22%' },
    { src: '/gallery/couple-4.png', caption: 'Our story', position: 'center 22%' },
  ],
  events: [
    {
      id: 'vinayak',
      title: 'Vinayak Pujan',
      date: '23rd November 2026',
      time: 'Morning',
      description: 'Seeking Lord Ganesha’s blessings to begin the celebrations.',
      icon: 'om',
      image: '/events/vinayak.jpg',
      imagePosition: 'center 18%',
    },
    {
      id: 'haldi',
      title: 'Haldi',
      date: '23rd November 2026',
      time: 'Afternoon',
      description: 'Turmeric rituals & joyful blessings for the bride and groom.',
      icon: 'flower',
      image: '/events/haldi.jpg',
      imagePosition: 'center 12%',
    },
    {
      id: 'bandoli',
      title: 'Bandoli',
      date: '24th November 2026',
      time: 'Morning',
      description: 'Traditional Bandoli festivities with family and friends.',
      icon: 'sparkle',
      image: '/events/bandoli.jpg',
      imagePosition: 'center 20%',
    },
    {
      id: 'sangeet',
      title: 'Sangeet',
      date: '24th November 2026',
      time: 'Evening',
      description: 'An evening of music, dance, and celebration.',
      icon: 'music',
      image: '/events/sangeet.jpg',
      imagePosition: 'center 15%',
    },
    {
      id: 'barat',
      title: 'Barat Prasthan',
      date: '25th November 2026',
      time: 'Evening',
      description: 'The groom’s procession begins its joyful journey.',
      icon: 'horse',
      image: '/events/barat.jpg',
      imagePosition: 'center 22%',
    },
    {
      id: 'wedding',
      title: 'Wedding (Phera)',
      date: '26th November 2026',
      time: 'Muhurat',
      description: 'Sacred pheras at Bankli, Sumerpur, Pali — the union of Vikram & Kavita.',
      location: 'Bankli, Sumerpur, Pali',
      icon: 'rings',
      highlight: true,
      image: '/events/wedding.jpg',
      imagePosition: 'center 16%',
    },
    {
      id: 'reception',
      title: 'Reception',
      date: '27th November 2026',
      time: 'Evening',
      description: 'Join us for an evening of blessings, dinner & celebration.',
      icon: 'cheers',
      image: '/events/reception.jpg',
      imagePosition: 'center 14%',
    },
  ],
  /** Prefer Vercel env VITE_FORMSPREE_ENDPOINT; fallback to hardcoded Formspree URL */
  formspreeEndpoint:
    import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/YOUR_FORM_ID',
}
