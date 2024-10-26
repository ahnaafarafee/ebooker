"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Book } from "@prisma/client";
import axios from "axios";
import { BookOpen, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Spinner from "./spinner";
import { Button } from "./ui/button";

interface Props {
  books: Book[];
}

const MyBookList = ({ books }: Props) => {
  const [loadingBooks, setLoadingBooks] = useState<Record<string, boolean>>({});

  const handleDelete = async (bookId: string) => {
    try {
      setLoadingBooks((prev) => ({ ...prev, [bookId]: true })); // Set loading for specific book
      await axios.delete(`/api/books/${bookId}`);
      // Optionally, re-fetch the book list or update the UI
      // reload the window
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingBooks((prev) => ({ ...prev, [bookId]: false })); // Reset loading state
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">My Book Library</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <Card
            key={book.id}
            className="overflow-hidden transition-shadow duration-300 hover:shadow-lg"
          >
            <CardContent className="p-4">
              <h2 className="text-lg text-center line-clamp-2">{book.title}</h2>
              <div className="aspect-[3.5/4] relative">
                <Image
                  src="/book-cover.png"
                  alt={`Cover of ${book.title}`}
                  fill
                  className="object-cover rounded-md"
                />
              </div>

              <Link href={`/dashboard/${book.id}`}>
                <div className="flex gap-2 items-center justify-center bg-yellow-400 hover:bg-yellow-500 p-1 transition-colors duration-300">
                  <BookOpen /> Read
                </div>
              </Link>
              <Button
                className="w-full mt-1"
                variant="destructive"
                onClick={() => handleDelete(book.id)}
                disabled={loadingBooks[book.id]} // Disable specific button
              >
                {loadingBooks[book.id] ? (
                  <Spinner />
                ) : (
                  <span className="flex gap-2">
                    <Trash /> Delete
                  </span>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyBookList;
