"use client";
import Modal from "../shared/Modal";
import { AddBookForm } from "./AddBookForm";
import { RecommendedMiniGrid } from "./RecommendedMiniGrid";
import { useState } from "react";
import Image from "next/image";

interface LibrarySidebarProps {
  onApplyFilters?: (filters: {
    title?: string;
    author?: string;
    totalPages?: number;
  }) => void;
}

export const LibrarySidebar = ({ onApplyFilters }: LibrarySidebarProps) => {
  const [isBookAdded, setIsBookAdded] = useState(false);
  return (
    <div className="flex flex-col gap-4 ">
      <AddBookForm onBookAdded={() => setIsBookAdded(true)} />
      <RecommendedMiniGrid />
      {isBookAdded && (
        <Modal variant="popup" onClose={() => setIsBookAdded(false)}>
          <div>
            <Image src={"/finger.png"} alt="finger" width={100} height={100} />
          </div>
          <h3>Good job</h3>
          <p>
            Your book is now in the library! The joy knows no bounds and now you
            can start your training.
          </p>
        </Modal>
      )}
    </div>
  );
};
