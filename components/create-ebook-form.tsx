"use client";

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
import { Coins } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import axios from "axios";
import Spinner from "./spinner";
import { Input } from "./ui/input";

const CreateEbookForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      title: "",
      wordCount: "", // Ensure these fields are in the default values
      age: "",
      theme: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      const response = await axios.post("/api/ai/text", values);
      console.log(response.data.text);
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
                        <span className="text-yellow-400 flex items-center ml-2 gap-1">
                          2 <Coins className="h-4 w-4" />
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem value="500">
                      <div className="flex  gap-4">
                        <span>500 words</span>
                        <span className="text-yellow-400 flex items-center ml-2 gap-1">
                          5 <Coins className="h-4 w-4" />
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem value="1000">
                      <div className="flex  gap-4">
                        <span>1000 words</span>
                        <span className="text-yellow-400 flex items-center ml-2 gap-1">
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
    </Form>
  );
};

export default CreateEbookForm;
