"use client"
import { useState, useEffect, useCallback } from "react"
import { getRecommendedBooks } from "@/services/api/clientApi"
import type { Book } from "@/types/book"

interface Filters {
  title?: string
  author?: string
}

export const useRecommendedBooks = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filters, setFilters] = useState<Filters>({})
  const [loading, setLoading] = useState(false)

  const fetchBooks = useCallback(async (newPage: number, newFilters?: Filters) => {
    setLoading(true)
    try {
      const activeFilters = newFilters ?? filters
      const res = await getRecommendedBooks({
        page: newPage,
        limit: 10,
        ...activeFilters,
      })
      setBooks(res.results)
      setPage(res.page)
      setTotalPages(res.totalPages)
      if (newFilters) setFilters(newFilters)
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    fetchBooks(1)
  }, [])

  return {
    books,
    page,
    totalPages,
    loading,
    applyFilters: (f: Filters) => fetchBooks(1, f),
    goToPage: (p: number) => fetchBooks(p),
  }
}