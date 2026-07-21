"use client";
import Image from "next/image";
import { useState } from "react";
import { addToLibrary } from "@/services/api/clientApi";
import type { Book } from "@/types/book";
import { toast } from "react-toastify";

interface BookPopupProps {
  book: Book;
  onClose: () => void;
}

export const BookPopup = ({ book, onClose }: BookPopupProps) => {
  const [loading, setLoading] = useState(false);

  const handleAddToLibrary = async () => {
    setLoading(true);
    try {
      await addToLibrary(book._id);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      toast.success("Book added to library!");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center pt-[50px] ">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 hover:opacity-70 transition-opacity"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.5 5.5L5.5 16.5"
            stroke="#F9F9F9"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.5 5.5L16.5 16.5"
            stroke="#F9F9F9"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <Image
        src={book.imageUrl}
        alt={book.title}
        width={153}
        height={233}
        className="object-cover rounded-lg mb-[16px]"
      />
      <div className="flex flex-col gap-[4px] items-center text-center">
        <h3 className="font-title text-xl leading-none tracking-tight text-foreground">
          {book.title}
        </h3>
        <p className="text-sm font-main leading-tight tracking-tight text-inactive">
          {book.author}
        </p>
        <p className="text-[10px] font-main leading-[12px] tracking-tight text-center text-foreground">
          {book.totalPages} pages
        </p>
      </div>

      <button
        onClick={handleAddToLibrary}
        disabled={loading}
        className="black-button mt-[32px] py-3.5 px-7 border border-zinc-50/20 rounded-full font-title leading-[18px] tracking-wide text-foreground  hover:bg-foreground hover:text-background hover:border-transparent"
      >
        {loading ? "Adding..." : "Add to library"}
      </button>
    </div>
  );
};
