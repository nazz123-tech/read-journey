"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookCard } from "@/components/shared/BookCard";
import Modal from "../shared/Modal";
import { LibraryBookPopup } from "./LibraryBookPopup";
import type { Book } from "@/types/book";

const FILTERS = [
  { label: "All books", value: "all" },
  { label: "Unread", value: "unread" },
  { label: "In progress", value: "in-progress" },
  { label: "Done", value: "done" },
] as const;

type FilterType = "all" | "unread" | "in-progress" | "done";

interface MyLibraryBooksProps {
  books: Book[];
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  loading: boolean;
}

export const LibraryBooksGrid = ({
  books,
  filter,
  onFilterChange,
  loading,
}: MyLibraryBooksProps) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  return (
    <div>
      <div>
        <h2>My library</h2>
        <div>
          <button onClick={() => setDropdownOpen((p) => !p)}>
            {FILTERS.find((f) => f.value === filter)?.label}
          </button>
          {dropdownOpen && (
            <div>
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => {
                    onFilterChange(f.value);
                    setDropdownOpen(false);
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : books.length === 0 ? (
        <p>Бібліотека порожня. Додай книги!</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {books.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              onClick={() => setSelectedBook(book)}
            />
          ))}
        </div>
      )}

      {selectedBook && (
        <Modal variant="popup" onClose={() => setSelectedBook(null)}>
          <LibraryBookPopup
            book={selectedBook}
            onClose={() => setSelectedBook(null)}
            onStartReading={(bookId) => router.push(`/reading/${bookId}`)}
          />
        </Modal>
      )}
    </div>
  );
};
