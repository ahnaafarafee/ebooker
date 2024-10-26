import CreateEbookForm from "@/components/create-ebook-form";

const CreatePage = () => {
  return (
    <div className="max-w-xl mx-auto mt-16 px-4 sm:px-6 lg:px-8 shadow-lg p-4 rounded-lg">
      <h1 className="text-center p-2 text-xl font-bold">Create Ebook</h1>
      <CreateEbookForm />
    </div>
  );
};

export default CreatePage;
