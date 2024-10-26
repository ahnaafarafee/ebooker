import BookList from "@/components/book-list";
import prisma from "@/prisma/client";
import Link from "next/link";

const MyBooksPage = async () => {
  const response = await prisma.book.findMany({
    include: {
      author: true,
    },
  });

  return (
    <div className="mt-4">
      {response.length === 0 ? (
        <p>
          No Books to show yet! Be the first to create one:
          <Link href="/create" className="text-blue-500">
            Create Now
          </Link>
        </p>
      ) : (
        <BookList books={response} />
      )}
    </div>
  );
};

export default MyBooksPage;
