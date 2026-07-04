"use client";
import Image from "next/image";
import { useState } from "react";
import { addToLibrary } from "@/services/api/clientApi";
import type { Book } from "@/types/book";

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
    }
  };

  return (
    <div className="">
      <button onClick={onClose} className="">
        ×
      </button>

      <div className="">
        <Image
          src={book.imageUrl}
          alt={book.title}
          width={100}
          height={100}
          className="object-cover"
        />
      </div>

      <h3 className="">{book.title}</h3>
      <p className="">{book.author}</p>
      <p className="">{book.totalPages} pages</p>

      <button onClick={handleAddToLibrary} disabled={loading} className="">
        {loading ? "Adding..." : "Add to library"}
      </button>
    </div>
  );
};
