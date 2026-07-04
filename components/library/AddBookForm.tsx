"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addOwnBook } from "@/services/api/clientApi";

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
      <p>Create your library:</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Book title:</label>
          <input {...register("title")} placeholder="Enter text" />
          {errors.title && <p>{errors.title.message}</p>}
        </div>
        <div>
          <label>The author:</label>
          <input {...register("author")} placeholder="Enter text" />
          {errors.author && <p>{errors.author.message}</p>}
        </div>
        <div>
          <label>Number of pages:</label>
          <input {...register("totalPages")} type="number" placeholder="0" />
          {errors.totalPages && <p>{errors.totalPages.message}</p>}
        </div>
        <button type="submit">Add book</button>
      </form>
    </div>
  );
};
