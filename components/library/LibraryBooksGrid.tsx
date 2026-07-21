"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookCard } from "@/components/shared/BookCard";
import Modal from "../shared/Modal";
import { LibraryBookPopup } from "./LibraryBookPopup";
import type { Book } from "@/types/book";
import { Loader } from "../shared/Loader";
import { Dropdown } from "../library/Dropdown";
import Icon from "../shared/Icon";

type FilterType = "all" | "unread" | "in-progress" | "done";

interface MyLibraryBooksProps {
  books: Book[];
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  loading: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const LibraryBooksGrid = ({
  books,
  filter,
  onFilterChange,
  loading,
  page,
  totalPages,
  onPageChange,
}: MyLibraryBooksProps) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const router = useRouter();

  return (
    <div className="xl:w-[847px] xl:h-[651px] px-[20px] py-[40px] md:px-[40px] xl:pb-[28px] bg-blocks rounded-[30px]">
      <div className="flex flex-row justify-between items-center mb-[28px]">
        <h2 className="text-white text-[28px] font-title leading-[32px] tracking-wide">
          My library
        </h2>

        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
              className="group text-white disabled:opacity-30 disabled:pointer-events-none border border-zinc-50/20 flex items-center justify-center p-[10px] rounded-full hover:bg-foreground"
            >
              <Icon
                name="chevron"
                size={20}
                className="-rotate-90 group-hover:text-background"
              />
            </button>
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages}
              className="group text-white disabled:opacity-30 disabled:pointer-events-none border border-zinc-50/20 flex items-center justify-center p-[10px] rounded-full hover:bg-foreground"
            >
              <Icon
                name="chevron"
                size={20}
                className="rotate-90 group-hover:text-background"
              />
            </button>
          </div>

          <Dropdown value={filter} onChange={onFilterChange} />
        </div>
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
