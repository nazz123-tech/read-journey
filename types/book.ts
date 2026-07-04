export interface Book {
  _id: string
  title: string
  author: string
  imageUrl: string
  totalPages: number
}

export interface BooksResponse {
  results: Book[]
  totalPages: number
  page: number
  perPage: number
}