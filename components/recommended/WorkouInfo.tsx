import Link from "next/link";
import Image from "next/image";

export const WorkoutInfo = () => {
  return (
    <div className="flex flex-col bg-inputs gap-[20px] p-[20px] rounded-xl">
      <h1 className="text-lg  leading-none tracking-tight text-left text-foreground">
        Start your workout
      </h1>
      <div>
        <ul className="flex flex-col gap-[20px]">
          <li className="flex flex-row gap-[12px]">
            <div className="w-[40px] h-[40px] shrink-0 text-lg font-bold leading-none tracking-tight text-center flex justify-center items-center bg-foreground text-background rounded-full">
              1
            </div>
            <p className="text-sm text-inactive leading-tight tracking-tight">
              <span className="text-foreground">
                Create a personal library:
              </span>{" "}
              add the books you intend to read to it.
            </p>
          </li>
          <li className="flex flex-row gap-[12px]">
            <div className="w-[40px] h-[40px] shrink-0 text-lg font-bold leading-none tracking-tight text-center flex justify-center items-center bg-foreground text-background rounded-full">
              2
            </div>
            <p className="text-sm text-inactive leading-tight tracking-tight">
              <span className="text-foreground">
                Create your first workout:
              </span>{" "}
              define a goal, choose a period, start training.
            </p>
          </li>
        </ul>
      </div>
      <div className="flex flex-row justify-between">
        <Link
          className="text-sm font-medium leading-tight tracking-tight underline text-inactive hover:text-foreground"
          href={"/library"}
        >
          My library
        </Link>
        <Link href={"/library"}>
          <Image width={24} height={24} alt="swipe" src={"/login.png"}></Image>
        </Link>
      </div>
    </div>
  );
};
