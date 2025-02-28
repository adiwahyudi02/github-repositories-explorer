import { updatedOnFormatDate } from "@/utils/date.utils";
import React from "react";
import { IoStarOutline } from "react-icons/io5";

interface IRepositoryCardProps {
  repoName: string;
  repoUrl: string;
  description: string | null;
  language: string | null;
  stars: number;
  updatedAt: string;
}

export const RepositoryCard: React.FC<IRepositoryCardProps> = ({
  repoName,
  repoUrl,
  description,
  language,
  stars,
  updatedAt,
}) => {
  return (
    <div className="bg-gray-800 text-white rounded-lg p-4 mb-2 w-full shadow-md">
      <a
        href={repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 text-xl font-semibold hover:underline cursor-pointer"
      >
        {repoName}
      </a>
      <p className="text-gray-400 mt-1">{description}</p>
      <div className="flex items-center justify-between flex-wrap gap-4 text-sm text-gray-400 mt-4">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <IoStarOutline />
            {stars.toLocaleString()}
          </span>
          {!!language && (
            <span className="flex items-center gap-1">
              <span>●</span>
              {language}
            </span>
          )}
        </div>
        <span>Updated on {updatedOnFormatDate(updatedAt)}</span>
      </div>
    </div>
  );
};
