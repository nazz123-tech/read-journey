"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addOwnBook } from "@/services/api/clientApi";
import { Input } from "../shared/Input";

const schema = yup.object({
  title: yup.string().required("Назва обовʼязкова"),
  author: yup.string().required("Автор обовʼязковий"),
  totalPages: yup.number().typeError("Введіть число").positive().required(),
});

interface AddBookData {
  title: string;
  author: string;
  totalPages: number;
}

interface AddBookFormProps {
  onBookAdded?: () => void;
}

export const AddBookForm = ({ onBookAdded }: AddBookFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddBookData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: AddBookData) => {
    try {
      await addOwnBook(data);
      reset();
      onBookAdded?.();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <p className="text-foreground  pl-[14px] mb-2 text-[10px] xl:text-sm font-main leading-[12px] tracking-tight">
        Create your library:
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col xl:gap-[8px] xl:mb-[20px]">
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
          <Input
            {...register("totalPages")}
            label="Total pages:"
            placeholder="Enter text"
            type="number"
            status="basic"
            className=""
          ></Input>
        </div>
        <button
          className="black-button font-title text-[16px] leading-[18px] tracking-wide border border-zinc-50/20 hover:bg-foreground hover:text-background py-3 px-7 hover:border-transparent "
          type="submit"
        >
          Add book
        </button>
      </form>
    </div>
  );
};
