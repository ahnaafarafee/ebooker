import "easymde/dist/easymde.min.css";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import Markdown from "react-markdown";
import SimpleMDE from "react-simplemde-editor";
import { Button } from "./ui/button";
import { Info } from "lucide-react";

interface PreviewGeneratedTextProps {
  text: string;
}

const PreviewGeneratedText: React.FC<PreviewGeneratedTextProps> = ({
  text,
}) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const { control } = useForm();

  useEffect(() => {
    if (text && previewRef.current) {
      // Scroll to the preview section when text is generated
      previewRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [text]);

  return (
    <>
      {!text ? (
        <div
          ref={previewRef}
          className="mt-8 p-4 !leading-6  rounded-lg border-dotted border-2"
        >
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
            <form className="prose">
              <Controller
                name="description"
                defaultValue={text}
                control={control}
                render={({ field }) => (
                  <SimpleMDE placeholder="Description" {...field} />
                )}
              />
              <Button className="w-full mt-4" type="submit">
                Save and Publish
              </Button>
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
