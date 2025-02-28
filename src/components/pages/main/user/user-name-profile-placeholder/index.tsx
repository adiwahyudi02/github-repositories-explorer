import React from "react";

interface IUserNameProfilePlaceholderProps {
  count?: number;
  isVisible?: boolean;
}

export const UserNameProfilePlaceholder: React.FC<
  IUserNameProfilePlaceholderProps
> = ({ count = 1, isVisible = true }) => {
  if (!isVisible) return null;

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          role="status"
          className="flex items-center gap-4 w-full p-4 bg-gray-800 rounded-lg animate-pulse mb-4"
        >
          <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
          <div className="h-4 bg-gray-700 rounded w-1/3"></div>
        </div>
      ))}
    </>
  );
};
