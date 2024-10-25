import MyBookList from "@/components/my-book-list";
import prisma from "@/prisma/client";
import { currentUser } from "@clerk/nextjs/server";

const MyBooksPage = async () => {
  const user = await currentUser();
  const authorId = user?.publicMetadata.userId;
  const response = await prisma.book.findMany({
    where: { authorId: authorId! },
  });

  return (
    <div className="mt-4">
      {response.length === 0 ? (
        <p>You haven't created any books yet</p>
      ) : (
        <MyBookList books={response} />
      )}
    </div>
  );
};

export default MyBooksPage;
