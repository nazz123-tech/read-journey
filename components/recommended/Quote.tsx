import Image from "next/image";
export const Quote = () => {
  return (
    <div className="hidden xl:flex xl:flex-row">
      <Image src="/quote.png" alt="quote" width={50} height={50} />
      <p>
        "Books are windows to the world, and reading is a journey into the
        unknown."
      </p>
    </div>
  );
};
