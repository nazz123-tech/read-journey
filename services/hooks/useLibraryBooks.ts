"use client"
import { useState, useEffect } from "react"
import { getMyBooks } from "@/services/api/clientApi"
import type { Book } from "@/types/book"
import { useBreakpoint, Breakpoint } from "./useBreakpoint"

type FilterType = "all" | "unread" | "in-progress" | "done"

const LIMIT: Record<Breakpoint, number> = {
  mobile: 2,
  tablet: 8,
  desktop: 10,
}

export const useLibraryBooks = () => {
  const breakpoint = useBreakpoint()
  const limit = LIMIT[breakpoint]

  const [books, setBooks] = useState<Book[]>([])
  const [filter, setFilter] = useState<FilterType>("all")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      setLoading(true)
      try {
        const res = await getMyBooks({
          status: filter === "all" ? undefined : filter,
          page,
          limit,
        })
        if (!cancelled) {
          setBooks(res.results)
          setTotalPages(res.totalPages)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [filter, page, limit, breakpoint])

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter)
    setPage(1) 
  }

  return {
    books,
    filter,
    page,
    totalPages,
    loading,
    setFilter: handleFilterChange,
    goToPage: (p: number) => setPage(p),
    refetch:() => setPage(p => p),
  }
}