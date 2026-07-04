import Image from "next/image";
import type { Book } from "@/types/book";

interface LibraryBookPopupProps {
  book: Book;
  onClose: () => void;
  onStartReading: (bookId: string) => void;
}

export const LibraryBookPopup = ({
  book,
  onClose,
  onStartReading,
}: LibraryBookPopupProps) => {
  return (
    <div className="flex flex-col bg-blocks rounded-2xl p-5 gap-4">
      <button onClick={onClose} className="self-end">
        ×
      </button>
      <div className="w-[100px] h-[165px] ">
        {book.imageUrl ? (
          <Image
            width={100}
            height={165}
            src={book.imageUrl}
            alt={book.title}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-[100px] h-[165px] bg-[#2C2C2C] flex items-center justify-center">
            <img
              src="/book-opened.svg"
              alt={book.title}
              width={50}
              height={50}
              style={{ filter: "brightness(0) invert(0.3)" }}
            />
          </div>
        )}
      </div>
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <p>{book.totalPages} pages</p>
      <button onClick={() => onStartReading(book._id)}>Start reading</button>
    </div>
  );
};
