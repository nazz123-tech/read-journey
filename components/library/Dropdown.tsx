"use client";
import { useState } from "react";
import Icon from "../shared/Icon";

const FILTERS = [
  { label: "Unread", value: "unread" },
  { label: "In progress", value: "in-progress" },
  { label: "Done", value: "done" },
  { label: "All books", value: "all" },
] as const;

type FilterValue = "unread" | "in-progress" | "done" | "all";

interface DropdownProps {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
}

export const Dropdown = ({ value, onChange }: DropdownProps) => {
  const [open, setOpen] = useState(false);

  const current = FILTERS.find((f) => f.value === value);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-[53px] p-3.5 border border-neutral-700 rounded-xl text-white text-sm"
      >
        {current?.label}
        <span className="text-xs">
          {open ? (
            <Icon name="chevron" size={16} />
          ) : (
            <Icon name="chevron" size={16} className="rotate-180" />
          )}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 bg-[#1C1C1C] w-[153px] p-[14px] bg-inputs rounded-xl ">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => {
                onChange(f.value);
                setOpen(false);
              }}
              className={`block w-full text-left hover:text-zinc-300 py-[3.5px] text-sm ${
                f.value === value ? "text-foreground" : "text-inactive"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
