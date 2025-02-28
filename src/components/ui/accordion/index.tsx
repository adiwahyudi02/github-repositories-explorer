"use client";

import React, { useEffect, useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

interface AccordionProps {
  title: React.ReactNode;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  children: React.ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({
  title,
  isOpen = false,
  onOpen,
  onClose,
  children,
}) => {
  const [isOpenAccordion, setIsOpenAccordion] = useState(false);

  const toggleAccordion = () => {
    setIsOpenAccordion((prev) => !prev);
    if (!isOpenAccordion && onOpen) onOpen();
    if (isOpenAccordion && onClose) onClose();
  };

  useEffect(() => {
    setIsOpenAccordion(isOpen);
  }, [isOpen]);

  return (
    <div className="border border-gray-500 overflow-hidden rounded-md mb-2">
      <button
        className="w-full flex justify-between items-center p-3 text-left cursor-pointer"
        onClick={toggleAccordion}
      >
        {typeof title === "string" ? (
          <p className="text-md font-semibold">{title}</p>
        ) : (
          title
        )}
        {isOpenAccordion ? (
          <IoChevronUp className="text-xl" />
        ) : (
          <IoChevronDown className="text-xl" />
        )}
      </button>
      {isOpenAccordion && (
        <div className="p-4 border-t border-gray-500">{children}</div>
      )}
    </div>
  );
};
