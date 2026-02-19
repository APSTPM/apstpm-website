"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "./lib/utils";

export interface SearchableSelectOption {
  value: string;
  label: string;
}

export interface SearchableSelectProps {
  options: SearchableSelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  noResultsText?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
}

export function SearchableSelect({
  options,
  value,
  onChange,
  name,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  noResultsText = "No results",
  required,
  className,
  disabled,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedOption = options.find((o) => o.value === value);

  const filtered = search
    ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  const open = useCallback(() => {
    if (disabled) return;
    setIsOpen(true);
    setSearch("");
    setHighlightedIndex(-1);
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [disabled]);

  const close = useCallback(() => {
    setIsOpen(false);
    setSearch("");
    setHighlightedIndex(-1);
  }, []);

  const select = useCallback(
    (val: string) => {
      onChange?.(val);
      close();
    },
    [onChange, close]
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [close]);

  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const item = listRef.current.children[highlightedIndex] as HTMLElement;
      item?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        open();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((i) => (i < filtered.length - 1 ? i + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((i) => (i > 0 ? i - 1 : filtered.length - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && filtered[highlightedIndex]) {
          select(filtered[highlightedIndex].value);
        }
        break;
      case "Escape":
        e.preventDefault();
        close();
        break;
    }
  };

  return (
    <div ref={containerRef} className={cn("relative", className)} onKeyDown={handleKeyDown}>
      <input type="hidden" name={name} value={value ?? ""} required={required} />

      <button
        type="button"
        onClick={() => (isOpen ? close() : open())}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none transition-colors",
          "focus:ring-2 focus:ring-robot-500 focus:border-transparent",
          "disabled:cursor-not-allowed disabled:opacity-50",
          !selectedOption && "text-gray-400"
        )}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronIcon open={isOpen} />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
          <div className="p-2">
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setHighlightedIndex(0);
              }}
              placeholder={searchPlaceholder}
              className="w-full rounded-md border border-gray-200 px-3 py-1.5 text-sm outline-none focus:border-robot-500 focus:ring-1 focus:ring-robot-500"
            />
          </div>

          <ul
            ref={listRef}
            role="listbox"
            className="max-h-60 overflow-y-auto px-1 pb-1"
          >
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-sm text-gray-400">{noResultsText}</li>
            ) : (
              filtered.map((option, idx) => (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={option.value === value}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  onClick={() => select(option.value)}
                  className={cn(
                    "cursor-pointer rounded-md px-3 py-2 text-sm transition-colors",
                    idx === highlightedIndex && "bg-robot-50 text-robot-900",
                    option.value === value && "font-medium text-robot-600",
                    idx !== highlightedIndex && "hover:bg-gray-50"
                  )}
                >
                  {option.label}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={cn(
        "ml-2 h-4 w-4 shrink-0 text-gray-400 transition-transform",
        open && "rotate-180"
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}
