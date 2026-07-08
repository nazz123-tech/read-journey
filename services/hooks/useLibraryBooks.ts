"use client";
import { useState, useEffect } from "react";
import { getMyBooks } from "@/services/api/clientApi";
import type { Book } from "@/types/book";

type FilterType = "all" | "unread" | "in-progress" | "done";

export const useLibraryBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [loading, setLoading] = useState(false);

  const fetchBooks = async (status: FilterType) => {
    setLoading(true);
    try {
      const res = await getMyBooks(status === "all" ? undefined : status);
      setBooks(res);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(filter);
  }, [filter]);

  return {
    books,
    filter,
    setFilter,
    loading,
    refetch: () => fetchBooks(filter),
  };
};
