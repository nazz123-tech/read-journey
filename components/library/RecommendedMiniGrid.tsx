"use client";
import { getRecommendedBooks } from "@/services/api/clientApi";
import { BookCard } from "../shared/BookCard";
import { useEffect, useState } from "react";
import { Book } from "@/types/book";
import Modal from "../shared/Modal";
import { BookPopup } from "../shared/BookPopUp";
import Link from "next/link";
import Image from "next/image";
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
    <div className="flex flex-col bg-inputs p-[20px] pr-[40px] rounded-xl mt-[78px]">
      <h2 className="text-xl font-title leading-none tracking-tight text-foreground mb-[20px]">
        Recommended books
      </h2>
      <div className="grid grid-cols-3 gap-5 ">
        {books.map((book: Book) => (
          <BookCard
            key={book._id}
            book={book}
            onClick={() => setSelectedBook(book)}
            variant="mini"
          />
        ))}
        <div className="flex flex-row items-center justify-between w-[273px] ">
          <Link
            className="text-sm font-main leading-tight tracking-tight underline text-inactive hover:text-foreground"
            href={"/recommended"}
          >
            Home
          </Link>
          <Link href={"/recommended"}>
            <Image
              width={24}
              height={24}
              alt="swipe"
              src={"/login.png"}
            ></Image>
          </Link>
        </div>
        {selectedBook && (
          <Modal variant="popup" onClose={() => setSelectedBook(null)}>
            <BookPopup
              book={selectedBook}
              onClose={() => setSelectedBook(null)}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};
