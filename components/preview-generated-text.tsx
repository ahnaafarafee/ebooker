import "easymde/dist/easymde.min.css";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Markdown from "react-markdown";
import SimpleMDE from "react-simplemde-editor";
import { Button } from "./ui/button";
import { Info } from "lucide-react";
import { textSchema } from "@/lib/textSchema";
import { z } from "zod";
import axios from "axios";
import Spinner from "./spinner";

interface PreviewGeneratedTextProps {
  text: string;
  title: string;
}

const PreviewGeneratedText: React.FC<PreviewGeneratedTextProps> = ({
  text,
  title,
}) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const { control, handleSubmit } = useForm<z.infer<typeof textSchema>>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (text && previewRef.current) {
      // Scroll to the preview section when text is generated
      previewRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [text]);

  async function onSubmit(values: z.infer<typeof textSchema>) {
    try {
      setIsLoading(true);
      await axios.post("/api/books", { ...values, title });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  return (
    <>
      {text ? (
        <div className="mt-8 p-4 !leading-6  rounded-lg border-dotted border-2">
          <div>
            <h2 className="text-lg font-semibold mb-4">Preview</h2>
            <div className="mb-4 flex gap-2">
              <Info className="h-4 w-4" />
              <span className="text-sm underline decoration-dotted">
                Edit the generated text and click "Save and Publish". Add as
                many words as you want. Use the editor to see the edits you've
                made.
              </span>
            </div>
            <form className="prose" onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="text"
                defaultValue={text}
                control={control}
                render={({ field }) => (
                  <SimpleMDE placeholder="Description" {...field} />
                )}
              />
              <div ref={previewRef}>
                <Button
                  disabled={isLoading}
                  type="submit"
                  variant={isLoading ? "ghost" : "default"}
                  className="w-full !rounded-full"
                >
                  {isLoading ? (
                    <div className="flex gap-2 justify-center items-center">
                      <span>saving</span>
                      <Spinner />
                    </div>
                  ) : (
                    "Save and Publish"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default PreviewGeneratedText;
