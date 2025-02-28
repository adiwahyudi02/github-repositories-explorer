import React, { FC, ChangeEvent, useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

interface ISearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceTime?: number;
}

export const SearchInput: FC<ISearchInputProps> = ({
  value,
  onChange,
  placeholder = "Type to search",
  debounceTime = 500,
}) => {
  const [search, setSearch] = useState(value);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const handleSearchDebounce = (value: string) => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = setTimeout(() => {
      onChange(value);
    }, debounceTime);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    handleSearchDebounce(value);
  };

  useEffect(() => {
    setSearch(value);
  }, [value]);

  return (
    <div className="relative w-full">
      <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder={placeholder}
        className="w-full border border-gray-500 rounded-md pl-10 pr-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1f6feb]"
      />
    </div>
  );
};
