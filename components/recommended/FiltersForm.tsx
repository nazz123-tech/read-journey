"use client";
import { useForm } from "react-hook-form";

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
    <div className="bg-[#1C1C1C] rounded-2xl p-4">
      <p className="text-gray-400 mb-3">Filters:</p>
      <form onSubmit={handleSubmit(onApply)} className="flex flex-col gap-3">
        <div>
          <label className="text-gray-500 text-sm">Book title:</label>
          <input
            {...register("title")}
            placeholder="Enter text"
            className="w-full bg-transparent text-white outline-none"
          />
        </div>
        <div>
          <label className="text-gray-500 text-sm">The author:</label>
          <input
            {...register("author")}
            placeholder="Enter text"
            className="w-full bg-transparent text-white outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-fit border border-gray-600 text-white rounded-full px-6 py-2"
        >
          To apply
        </button>
      </form>
    </div>
  );
};
