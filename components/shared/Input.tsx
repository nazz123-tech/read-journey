"use client";
import { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  status: "basic" | "password";
}

export const Input = ({ label, status, ...props }: InputProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="flex flex-row items-center gap-2.5 pt-3.5 pb-3.5 px-[14px] bg-inputs rounded-xl">
      <span className="text-inactive shrink-0 text-sm">{label}</span>
      <input
        {...props}
        type={
          status === "password" ? (isVisible ? "text" : "password") : props.type
        }
        className="font-main bg-transparentv font-bold outline-none w-full text-sm"
      />
      {status === "password" && (
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
