interface Game {
  id: number
  category: number
  cover: {
    id: number
    url: string // Relative URL to the cover image (needs prefix like 'https:')
  }
  first_release_date: number // Unix timestamp
  genres: {
    id: number
    name: string
  }[]
  involved_companies: number[] // Array of company IDs
  name: string
  rating: number // Average rating (0-100 scale)
  rating_count: number // Number of ratings
  release_dates: {
    id: number
    date: number // Unix timestamp
  }[]
  screenshots: {
    id: number
    url: string // Relative URL to screenshot (needs prefix like 'https:')
  }[]
  summary: string
  tags: number[] // Array of tag IDs
}
