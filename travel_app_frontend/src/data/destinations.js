const placeholder = (w, h, text) =>
  `https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=${w}&h=${h}&fit=crop&auto=format&txt=${encodeURIComponent(
    text || ''
  )}`

export const stubDestinations = [
  {
    id: 'paris',
    title: 'Paris Getaway',
    location: 'Paris, France',
    blurb: 'Explore iconic landmarks, charming cafés, and art-filled streets.',
    image:
      'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=800&h=600&fit=crop&auto=format',
    cta: 'View Details',
  },
  {
    id: 'kyoto',
    title: 'Kyoto Temples',
    location: 'Kyoto, Japan',
    blurb: 'Serene shrines, bamboo forests, and timeless tea houses.',
    image:
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d0?q=80&w=800&h=600&fit=crop&auto=format',
    cta: 'View Details',
  },
  {
    id: 'bali',
    title: 'Bali Retreat',
    location: 'Bali, Indonesia',
    blurb: 'Lush jungles, coral reefs, and spiritual escapes.',
    image:
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=800&h=600&fit=crop&auto=format',
    cta: 'View Details',
  },
  {
    id: 'newyork',
    title: 'New York Lights',
    location: 'New York, USA',
    blurb: 'Skyscrapers, theater, and world-class dining.',
    image:
      'https://images.unsplash.com/photo-1423655156442-ccc11daa4e99?q=80&w=800&h=600&fit=crop&auto=format',
    cta: 'View Details',
  },
  {
    id: 'santorini',
    title: 'Santorini Views',
    location: 'Santorini, Greece',
    blurb: 'Whitewashed villages and azure seas.',
    image:
      'https://images.unsplash.com/photo-1505731132164-cca02d9c74ef?q=80&w=800&h=600&fit=crop&auto=format',
    cta: 'View Details',
  },
  {
    id: 'capeTown',
    title: 'Cape Town Adventure',
    location: 'Cape Town, South Africa',
    blurb: 'Table Mountain hikes and vibrant waterfronts.',
    image:
      'https://images.unsplash.com/photo-1520779723752-53d7bdff92d6?q=80&w=800&h=600&fit=crop&auto=format',
    cta: 'View Details',
  },
]

/**
 * PUBLIC_INTERFACE
 * Fetch destinations from API when VITE_API_BASE is provided; otherwise return stubs.
 * Never block rendering—callers should set stub data before awaiting this function.
 */
export async function fetchDestinations() {
  const apiBase = import.meta?.env?.VITE_API_BASE
  const hasApi =
    typeof apiBase === 'string' && apiBase.trim().length > 0

  if (!hasApi) {
    console.info('[data] VITE_API_BASE not set; using stub destinations')
    return stubDestinations
  }

  try {
    const base = apiBase.replace(/\/$/, '')
    const res = await fetch(`${base}/destinations`, {
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) {
      console.warn('[data] Non-OK response, using stubs. Status:', res.status)
      return stubDestinations
    }
    const data = await res.json()
    if (Array.isArray(data)) {
      console.info('[data] fetched destinations:', data.length)
      return data.length ? data : stubDestinations
    }
    console.warn('[data] unexpected payload; using stubs')
    return stubDestinations
  } catch (e) {
    console.warn('[data] fetch failed; using stubs:', e?.message || e)
    return stubDestinations
  }
}
