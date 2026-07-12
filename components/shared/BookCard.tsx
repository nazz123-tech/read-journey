import { Book } from "@/types/book";
import Image from "next/image";
interface BookCardProps {
  book: Book;
  onClick: () => void;
}
export const BookCard = ({ book, onClick }: BookCardProps) => {
  return (
    <button onClick={onClick} className="flex flex-col">
      <div className="w-[132px] h-[206px] ">
        {book.imageUrl ? (
          <Image
            width={132}
            height={206}
            src={book.imageUrl}
            alt={book.title}
            className="object-cover w-full h-full rounded-lg"
          />
        ) : (
          <div className="w-[132px] h-[206px] bg-[#2C2C2C] flex items-center justify-center">
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
      <div className="flex flex-col mt-[8px] gap-[2px] text-left">
        <p className="text-sm font-bold leading-tight tracking-tight text-foreground">
          {book.title}
        </p>
        <p className="text-inactive text-[10px] font-medium leading-[12px] tracking-tight">
          {book.author}
        </p>
      </div>
    </button>
  );
};
