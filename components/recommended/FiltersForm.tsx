"use client";
import { useForm } from "react-hook-form";
import { Input } from "../shared/Input";

interface FiltersData {
  title: string;
  author: string;
}

interface FiltersFormProps {
  onApply: (data: FiltersData) => void;
}

export const FiltersForm = ({ onApply }: FiltersFormProps) => {
  const { register, handleSubmit } = useForm<FiltersData>();

  return (
    <div className=" ">
      <p className="text-foreground  pl-[14px] mb-2 text-[10px] xl:text-sm font-main leading-[12px] tracking-tight">
        Filters:
      </p>
      <form
        onSubmit={handleSubmit(onApply)}
        className="flex flex-col gap-3 md:w-[295px] xl:w-[313px]"
      >
        <Input
          {...register("title")}
          label="Book title:"
          placeholder="Enter text"
          status="basic"
        ></Input>
        <Input
          {...register("author")}
          label="The author:"
          placeholder="Enter text"
          status="basic"
        ></Input>
        <button
          type="submit"
          className="black-button font-title text-[16px] leading-[18px] tracking-wide border border-zinc-50/20 hover:bg-foreground hover:text-background w-[98px] h-[38px] hover:border-transparent "
        >
          To apply
        </button>
      </form>
    </div>
  );
};
