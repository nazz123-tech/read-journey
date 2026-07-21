import Image from "next/image";
export const Quote = () => {
  return (
    <div className="hidden xl:flex xl:flex-row items-center bg-inputs gap-[14px] pt-[15px] px-[20px] pb-[14px] rounded-xl">
      <Image
        src="/images/quote.png"
        alt="quote"
        width={40}
        height={40}
        className="w-[40px] h-[40px]"
      />
      <p className="text-sm text-inactive font-medium leading-tight tracking-tight">
        Books are <span className="text-foreground">windows</span> to the world,
        and reading is a journey into the unknown.
      </p>
    </div>
  );
};
