"use client";
import { useRecommendedBooks } from "@/services/hooks/useRecommendedBooks";
import { RecommendedBooksGrid } from "@/components/recommended/RecommendedBooksGrid";
import { Dashboard } from "@/components/shared/Dashboard";

export default function RecommendedPage() {
  const { books, page, totalPages, loading, applyFilters, goToPage } =
    useRecommendedBooks();
  return (
    <div className="flex flex-col xl:flex-row gap-4">
      <Dashboard onApplyFilters={applyFilters} variant="recommended" />
      <RecommendedBooksGrid
        books={books}
        page={page}
        totalPages={totalPages}
        loading={loading}
        onPageChange={goToPage}
      />
    </div>
  );
}
