import React from "react";

interface IPlaceholderProps {
  count?: number;
  isVisible?: boolean;
}

export const RepositoryCardPlaceholder: React.FC<IPlaceholderProps> = ({
  count = 1,
  isVisible = true,
}) => {
  if (!isVisible) return null;

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          role="status"
          className="flex items-end justify-between gap-4 w-full p-4 bg-gray-800 rounded-lg animate-pulse mb-4"
        >
          <div className="w-full flex flex-col">
            <div className="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>
            <div className="h-3 bg-gray-700 rounded w-2/3 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
          </div>
          <div className="h-4 bg-gray-700 rounded w-1/6 mb-4"></div>
        </div>
      ))}
    </>
  );
};
