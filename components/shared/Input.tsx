"use client";
import { useState } from "react";
import Icon from "./Icon";

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
      <span className="text-inactive text-xs xl:text-sm font-main leading-snug shrink-0 tracking-tight">
        {label}
      </span>
      <input
        {...props}
        type={
          status === "password" ? (isVisible ? "text" : "password") : props.type
        }
        className="font-main text-xs font-main xl:text-sm leading-tight tracking-tight  bg-transparent outline-none w-full"
      />
      {error && (
        <span className="text-red-500  shrink-0">
          <Icon name="error" size={20} />
        </span>
      )}
      {success && (
        <span className="text-green-500 w-[20px] h-[20px] shrink-0 ">
          <Icon name="success" size={20} />
        </span>
      )}
      {status === "password" && (
        <button
          className="w-[20px] h-[20px] scale-125"
          type="button"
          onClick={() => setIsVisible((prev) => !prev)}
        >
          {!isVisible ? (
            <Icon name="eye-off" size={20} />
          ) : (
            <Icon name="eye" size={20} />
          )}
        </button>
      )}
    </div>
  );
};
