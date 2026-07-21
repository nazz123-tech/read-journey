"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookCard } from "@/components/shared/BookCard";
import Modal from "../shared/Modal";
import { LibraryBookPopup } from "./LibraryBookPopup";
import type { Book } from "@/types/book";
import { Loader } from "../shared/Loader";
import { Dropdown } from "../library/Dropdown";

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
  const router = useRouter();

  return (
    <div className="xl:w-[847px] xl:h-[651px] px-[20px] py-[40px] md:px-[40px] xl:pb-[28px] bg-blocks rounded-[30px]">
      <div className="flex flex-row justify-between items-center mb-[28px]">
        <h2 className="text-white text-[28px] font-title leading-[32px] tracking-wide">
          My library
        </h2>

        <Dropdown value={filter} onChange={onFilterChange} />
      </div>

      {loading ? (
        <Loader />
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
