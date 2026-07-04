"use client";
import { LibraryBooksGrid } from "@/components/library/LibraryBooksGrid";
import { Dashboard } from "@/components/shared/Dashboard";
import { useLibraryBooks } from "../../../services/hooks/useLibraryBooks";

export default function LibraryPage() {
  const { books, filter, setFilter, loading, refetch } = useLibraryBooks();

  return (
    <div className="flex flex-col xl:flex-row gap-4">
      <Dashboard variant="library" onApplyFilters={refetch} />
      <LibraryBooksGrid
        books={books}
        filter={filter}
        onFilterChange={setFilter}
        loading={loading}
      />
    </div>
  );
}
