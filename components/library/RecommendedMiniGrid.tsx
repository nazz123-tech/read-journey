"use client";
import { getRecommendedBooks } from "@/services/api/clientApi";
import { BookCard } from "../shared/BookCard";
import { useEffect, useState } from "react";
import { Book } from "@/types/book";
import Modal from "../shared/Modal";
import { BookPopup } from "../shared/BookPopUp";
export const RecommendedMiniGrid = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await getRecommendedBooks({ limit: 3 });
      setBooks(response.results);
    };
    fetchBooks();
  }, []);
  return (
    <div className="grid grid-cols-3 gap-4">
      {books.map((book: Book) => (
        <BookCard
          key={book._id}
          book={book}
          onClick={() => setSelectedBook(book)}
        />
      ))}

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
