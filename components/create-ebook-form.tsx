"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formSchema } from "@/lib/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Coins, Info } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import axios from "axios";
import { useState } from "react";
import PreviewGeneratedText from "./preview-generated-text";
import Spinner from "./spinner";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";

const CreateEbookForm = () => {
  const [generatedText, setGeneratedText] = useState<string>("");
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      title: "",
      wordCount: "",
      age: "",
      theme: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    let coins = 0;
    if (values.wordCount === "200") {
      coins = 2;
    } else if (values.wordCount === "500") {
      coins = 5;
    } else if (values.wordCount === "1000") {
      coins = 10;
    }
    try {
      const response = await axios.post("/api/ai/text", values);
      setGeneratedText(response.data.text);
      toast({
        title: "Text Generated Successfully!",
        description: `${coins} coins have been deducted from your account`,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Write the title of the book" {...field} />
              </FormControl>
              <FormMessage className="pl-3 pb-2" />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          {/* Word Count Select */}
          <FormField
            control={form.control}
            name="wordCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Word Count</FormLabel>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-3 w-3 text-yellow-600 dark:text-yellow-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="!text-xs !max-w-40 md:!max-w-lg">
                        The word count provided is an estimate and may not be
                        exactly accurate. While we aim to generate content close
                        to the specified number, the final result might vary
                        slightly due to the natural flow and structure of the
                        text.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Word Count" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="200">
                      <div className="flex gap-4">
                        <span>200 words</span>
                        <span className="text-yellow-600 dark:text-yellow-400 flex items-center ml-2 gap-1">
                          2 <Coins className="h-4 w-4" />
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem value="500">
                      <div className="flex  gap-4">
                        <span>500 words</span>
                        <span className="text-yellow-600 dark:text-yellow-400 flex items-center ml-2 gap-1">
                          5 <Coins className="h-4 w-4" />
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem value="1000">
                      <div className="flex  gap-4">
                        <span>1000 words</span>
                        <span className="text-yellow-600 dark:text-yellow-400 flex items-center ml-2 gap-1">
                          10 <Coins className="h-4 w-4" />
                        </span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Age Group Select */}
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Suitable for</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Suitable for" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="children">Children</SelectItem>
                    <SelectItem value="any">Everyone</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Theme</FormLabel>
              <FormControl>
                <Input placeholder="Theme of the book" {...field} />
              </FormControl>
              <FormMessage className="pl-3 pb-2" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Additional Information</FormLabel>
              <FormControl>
                <Input placeholder="Write something here..." {...field} />
              </FormControl>
              <FormMessage className="pl-3 pb-2" />
            </FormItem>
          )}
        />

        <Button
          disabled={isSubmitting}
          type="submit"
          variant={isSubmitting ? "ghost" : "default"}
          className="w-full !rounded-full"
        >
          {isSubmitting ? (
            <div className="flex gap-2 justify-center items-center">
              <span>Hang tight. Ai is generating your ebook...</span>
              <Spinner />
            </div>
          ) : (
            "Generate"
          )}
        </Button>
      </form>
      {/* Preview Generated Text Component */}
      <PreviewGeneratedText text={generatedText} />
    </Form>
  );
};

export default CreateEbookForm;
