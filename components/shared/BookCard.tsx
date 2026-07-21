import { Book } from "@/types/book";
import Image from "next/image";

interface BookCardProps {
  book: Book;
  onClick: () => void;
  variant?: "default" | "mini";
}

const SIZES = {
  default: { width: 132, height: 208 },
  mini: { width: 71, height: 107 },
};

export const BookCard = ({
  book,
  onClick,
  variant = "default",
}: BookCardProps) => {
  const { width, height } = SIZES[variant];

  return (
    <button onClick={onClick} className="flex flex-col">
      <div style={{ width, height }}>
        {book.imageUrl ? (
          <Image
            width={width}
            height={height}
            src={book.imageUrl}
            alt={book.title}
            className="object-cover w-full h-full rounded-lg"
          />
        ) : (
          <div
            style={{ width, height }}
            className="bg-[#2C2C2C] flex items-center justify-center rounded-lg"
          >
            <img
              src="/book-opened.svg"
              alt={book.title}
              width={variant === "mini" ? 24 : 50}
              height={variant === "mini" ? 24 : 50}
              style={{ filter: "brightness(0) invert(0.3)" }}
            />
          </div>
        )}
      </div>

      {variant === "default" ? (
        <div
          className="flex flex-col mt-[8px] gap-[2px] text-left"
          style={{ width }}
        >
          <p className="text-sm font-title leading-tight tracking-tight truncate text-foreground">
            {book.title}
          </p>
          <p className="text-inactive text-[10px] font-main leading-[12px] tracking-tight">
            {book.author}
          </p>
        </div>
      ) : (
        <div
          className="flex flex-col mt-[8px] gap-[2px] text-left"
          style={{ width }}
        >
          <p className="text-[10px] font-title leading-tight tracking-tight  truncate text-foreground">
            {book.title}
          </p>
          <p className="text-inactive text-[10px] font-main leading-[12px] tracking-tight">
            {book.author}
          </p>
        </div>
      )}
    </button>
  );
};
