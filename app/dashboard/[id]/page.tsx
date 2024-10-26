import SingleBookContent from "@/components/single-book-content";
import prisma from "@/prisma/client";

interface Params {
  params: {
    id: string;
  };
}

const SingleBookPage = async ({ params: { id } }: Params) => {
  const content = await prisma.book.findUnique({
    where: { id },
  });

  return <div>{content && <SingleBookContent content={content} />}</div>;
};

export default SingleBookPage;
