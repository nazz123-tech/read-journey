import { Book } from "@/types/book";
import Image from "next/image";
interface BookCardProps {
  book: Book;
  onClick: () => void;
}
export const BookCard = ({ book, onClick }: BookCardProps) => {
  return (
    <button onClick={onClick} className="flex flex-col">
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
      <div>
        <p className="">{book.title}</p>
        <p className="">{book.author}</p>
      </div>
    </button>
  );
};
