"use client";
import { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  status: "basic" | "password";
  error?: string;
  success?: boolean;
}

export const Input = ({
  label,
  error,
  success,
  status,
  ...props
}: InputProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const borderClass = error
    ? "border border-destructured"
    : success
      ? "border border-success"
      : "border border-transparent";
  return (
    <div
      className={`flex flex-row items-center gap-2.5 pt-3.5 pb-3.5 px-[14px] bg-inputs hover:border-white/10 rounded-xl ${borderClass}`}
    >
      <span className="text-inactive text-xs font-medium leading-snug shrink-0 tracking-tight">
        {label}
      </span>
      <input
        {...props}
        type={
          status === "password" ? (isVisible ? "text" : "password") : props.type
        }
        className="font-main text-xs font-medium leading-snug tracking-tight  bg-transparent outline-none w-full"
      />
      {error && (
        <span className="text-red-500  shrink-0">
          <img src="./error.png" />
        </span>
      )}
      {success && (
        <span className="text-green-500 w-[20px] h-[20px] shrink-0 ">
          <img src="./success.png" />
        </span>
      )}
      {status === "password" && !error && !success && (
        <button
          className="w-[20px] h-[20px] scale-125"
          type="button"
          onClick={() => setIsVisible((prev) => !prev)}
        >
          {!isVisible ? (
            <img className="" src="/eye-off.png" />
          ) : (
            <img className="" src="/eye.png" />
          )}
        </button>
      )}
    </div>
  );
};
