import Image from "next/image";
import React from "react";

interface IMessageProps {
  title?: string;
  message?: string;
  imageSrc?: string;
}

export const Message: React.FC<IMessageProps> = ({
  imageSrc,
  title,
  message,
}) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center my-12">
      {imageSrc && (
        <Image src={imageSrc} alt="Message image" width={400} height={300} />
      )}
      <div>
        {title && <p className="text-2xl font-semibold">{title}</p>}
        {message && <p className="text-gray-500">{message}</p>}
      </div>
    </div>
  );
};
