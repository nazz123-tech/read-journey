import { BookCard } from "@/components/shared/BookCard";
import type { Book } from "@/types/book";
import { useState } from "react";
import Modal from "../shared/Modal";
import { BookPopup } from "../shared/BookPopUp";
import { Loader } from "../shared/Loader";

interface RecommendedBooksGridProps {
  books: Book[];
  page: number;
  totalPages: number;
  loading: boolean;
  onPageChange: (page: number) => void;
}

export const RecommendedBooksGrid = ({
  books,
  page,
  totalPages,
  loading,
  onPageChange,
}: RecommendedBooksGridProps) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  return (
    <div className="flex-1 bg-blocks px-[20px] py-[40px] md:px-[40px] xl:pb-[28px]  rounded-[30px] xl:w-[847px] xl:h-[651px]">
      <div className="flex justify-between items-center mb-[28px]">
        <h2 className="text-white text-[28px] font-title leading-[32px] tracking-wide">
          Recommended
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className="text-white disabled:opacity-30"
          >
            ←
          </button>
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            className="text-white disabled:opacity-30"
          >
            →
          </button>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[25px] xl:gap-[20px] xl:grid-cols-5">
          {books.map((book) => (
            <BookCard
              onClick={() => setSelectedBook(book)}
              key={book._id}
              book={book}
            />
          ))}
        </div>
      )}
      {selectedBook && (
        <Modal variant="popup" onClose={() => setSelectedBook(null)}>
          <BookPopup
            book={selectedBook}
            onClose={() => setSelectedBook(null)}
          />
        </Modal>
      )}
    </div>
  );
};
