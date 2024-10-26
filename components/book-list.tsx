"use client";

import { Book, User } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
interface BookWithAuthor extends Book {
  author: User;
}

interface Props {
  books: BookWithAuthor[];
}

const BookList = ({ books }: Props) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Library</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <Card
            key={book.id}
            className="overflow-hidden transition-shadow duration-300 hover:shadow-lg"
          >
            <CardContent className="p-4">
              <h2 className="text-lg  text-center line-clamp-2 capitalize">
                {book.title}
              </h2>
              <h2 className="text-center line-clamp-2 text-gray-600 capitalize">
                By {book.author.firstName} {book.author.lastName}
              </h2>
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
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BookList;
