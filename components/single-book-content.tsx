"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { libreCaslonText } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Book } from "@prisma/client";
import Markdown from "react-markdown";

interface Props {
  content: Book;
}

export default function SingleBookContent({ content }: Props) {
  const [currentPage, setCurrentPage] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [pages, setPages] = useState<string[]>([]);

  useEffect(() => {
    const wordsPerPage = 90;
    const words = content.text.split(" ");
    const newPages = [];
    for (let i = 0; i < words.length; i += wordsPerPage) {
      newPages.push(words.slice(i, i + wordsPerPage).join(" "));
    }
    setPages(newPages);
  }, []);

  const totalPages = pages.length;

  const flipPage = (direction: "next" | "prev") => {
    setFlipping(true);
    setTimeout(() => {
      if (direction === "next" && currentPage < totalPages - 1) {
        setCurrentPage(currentPage + 1);
      } else if (direction === "prev" && currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
      setFlipping(false);
    }, 500); // Half of the animation duration
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      <h1
        className={cn(
          "text-3xl font-bold mb-8 text-center",
          libreCaslonText.className
        )}
      >
        {content.title}
      </h1>
      <div
        className={cn(
          "relative w-full max-w-4xl aspect-[3/4] sm:aspect-[4/3] light:bg-amber-50 shadow-lg rounded-lg overflow-hidden",
          libreCaslonText.className
        )}
      >
        <div
          className={`absolute inset-0 flex ${
            flipping ? "animate-page-flip" : ""
          }`}
        >
          <div className="w-full sm:w-1/2 h-full bg-zinc-50 dark:bg-[#0E1524]  shadow-2xl dark:shadow-gray-800 dark:shadow-md  z-10 flex items-center justify-center p-4 sm:p-8 text-justify">
            <div className="prose text-sm sm:text-lg">
              <Markdown>{pages[currentPage]}</Markdown>
            </div>
          </div>
          <div className="hidden sm:flex w-1/2 h-full bg-zinc-50 dark:bg-[#0E1524]  shadow-md z-0 items-center justify-center p-8 text-justify">
            <div className="text-lg prose">
              <Markdown>{pages[currentPage + 1] || "End of book"}</Markdown>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full max-w-2xl mt-4">
        <Button
          onClick={() => flipPage("prev")}
          disabled={currentPage === 0 || flipping}
          aria-label="Previous page"
          className="text-xs sm:text-sm"
        >
          <ChevronLeft className="mr-1 h-3 w-3 sm:h-4 sm:w-4" /> Prev
        </Button>
        <span className="text-xs sm:text-sm self-center">
          Page {currentPage + 1} of {totalPages}
        </span>
        <Button
          onClick={() => flipPage("next")}
          disabled={currentPage >= totalPages - 1 || flipping}
          aria-label="Next page"
          className="text-xs sm:text-sm"
        >
          Next <ChevronRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </div>
    </div>
  );
}
