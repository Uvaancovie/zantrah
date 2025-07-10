"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { studentSchema } from "@/lib/verification-schemas";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface StudentVerificationFormProps {
  setCompleted: (completed: boolean) => void;
  initialData: z.infer<typeof studentSchema>;
  updateFormData: (data: z.infer<typeof studentSchema>) => void;
}

export default function StudentVerificationForm({
  setCompleted,
  initialData,
  updateFormData,
}: StudentVerificationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => (currentYear + i).toString());

  const form = useForm<z.infer<typeof studentSchema>>({
    resolver: zodResolver(studentSchema),
    defaultValues: initialData,
  });

  async function onSubmit(values: z.infer<typeof studentSchema>) {
    setIsSubmitting(true);
    try {
      console.log("Student verification values:", values);
      updateFormData(values);
      setCompleted(true);
      // Show success message
      alert("Student verification information submitted successfully!");
    } catch (error) {
      console.error("Error during student verification:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Simulate file upload
  const handleFileUpload = (field: string) => {
    const value = "https://example.com/uploaded-file.pdf";
    form.setValue(field as any, value);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="institutionName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Institution Name</FormLabel>
              <FormControl>
                <Input placeholder="University or College Name" {...field} />
              </FormControl>
              <FormDescription>
                Enter the name of your educational institution
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="studentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student ID</FormLabel>
              <FormControl>
                <Input placeholder="Your Student ID" {...field} />
              </FormControl>
              <FormDescription>
                Enter your student identification number
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="program"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Program of Study</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Computer Science" {...field} />
              </FormControl>
              <FormDescription>
                Enter your program, degree or major
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="graduationYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expected Graduation Year</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select graduation year" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Your expected year of graduation
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="studentIdCard"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student ID Card</FormLabel>
              <div className="flex items-center gap-4">
                <FormControl>
                  <Input
                    type="text"
                    readOnly
                    placeholder="Upload your student ID card"
                    {...field}
                    className="bg-gray-50"
                  />
                </FormControl>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => handleFileUpload('studentIdCard')}
                >
                  Upload
                </Button>
              </div>
              <FormDescription>
                Upload an image or scan of your student ID card
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="enrollmentProof"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enrollment Proof</FormLabel>
              <div className="flex items-center gap-4">
                <FormControl>
                  <Input
                    type="text"
                    readOnly
                    placeholder="Upload proof of enrollment"
                    {...field}
                    className="bg-gray-50"
                  />
                </FormControl>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => handleFileUpload('enrollmentProof')}
                >
                  Upload
                </Button>
              </div>
              <FormDescription>
                Upload a document proving your current enrollment (e.g., transcript, enrollment letter)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          ) : "Submit Student Verification"}
        </Button>
      </form>
    </Form>
  );
}
