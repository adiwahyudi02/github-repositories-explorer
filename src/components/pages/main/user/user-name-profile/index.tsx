import React from "react";
import Image from "next/image";

interface UserNameProfileProps {
  imageUrl: string;
  username: string;
}

export const UserNameProfile: React.FC<UserNameProfileProps> = ({
  imageUrl,
  username,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Image
        src={imageUrl}
        alt={`${username} image`}
        width={32}
        height={32}
        className="rounded-full"
      />
      <div className="flex flex-col">
        <p className="text-blue-500 hover:underline cursor-pointer">
          {username}
        </p>
      </div>
    </div>
  );
};
