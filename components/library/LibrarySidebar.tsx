"use client";
import Modal from "../shared/Modal";
import { AddBookForm } from "./AddBookForm";
import { RecommendedMiniGrid } from "./RecommendedMiniGrid";
import { useState } from "react";
import Image from "next/image";

interface LibrarySidebarProps {
  onBookAdded?: () => void;
}

export const LibrarySidebar = ({ onBookAdded }: LibrarySidebarProps) => {
  const handleBookAdded = () => {
    setIsBookAdded(true);
    onBookAdded?.();
  };
  const [isBookAdded, setIsBookAdded] = useState(false);
  return (
    <div className="flex flex-col ">
      <AddBookForm onBookAdded={handleBookAdded} />
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
