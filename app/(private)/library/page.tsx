"use client";
import { Dashboard } from "@/components/shared/Dashboard";
import { LibraryBooksGrid } from "@/components/library/LibraryBooksGrid";
import { useLibraryBooks } from "@/services/hooks/useLibraryBooks";
export default function LibraryPage() {
  const {
    books,
    filter,
    page,
    totalPages,
    loading,
    setFilter,
    goToPage,
    refetch,
  } = useLibraryBooks();

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <Dashboard variant="library" onBookAdded={refetch} />
      <LibraryBooksGrid
        books={books}
        filter={filter}
        onFilterChange={setFilter}
        loading={loading}
        page={page}
        totalPages={totalPages}
        onPageChange={goToPage}
      />
    </div>
  );
}
