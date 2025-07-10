"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { govIdSchema } from "@/lib/verification-schemas";
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
  SelectValue,
} from "@/components/ui/select";
import { Upload } from "lucide-react";

interface GovIdVerificationFormProps {
  setCompleted: (completed: boolean) => void;
  initialData: z.infer<typeof govIdSchema>;
  updateFormData: (data: z.infer<typeof govIdSchema>) => void;
}

export default function GovIdVerificationForm({
  setCompleted,
  initialData,
  updateFormData,
}: GovIdVerificationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(initialData.idFile || null);

  const form = useForm<z.infer<typeof govIdSchema>>({
    resolver: zodResolver(govIdSchema),
    defaultValues: initialData,
  });

  async function onSubmit(values: z.infer<typeof govIdSchema>) {
    setIsSubmitting(true);
    // Here you would typically send the ID information to your backend for verification
    // For demo purposes, we'll simulate a successful verification
    try {
      console.log("ID verification values:", values);
      updateFormData(values);
      
      // Simulate verification process
      setTimeout(() => {
        setCompleted(true);
        alert("Government ID verified successfully!");
      }, 1500);
      
    } catch (error) {
      console.error("Error during ID verification:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Simulate file upload
  const handleFileUpload = () => {
    // In a real app, you'd handle the file upload
    const mockFileName = "id_document.pdf";
    setUploadedFile(mockFileName);
    form.setValue("idFile", mockFileName);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="idType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID Type</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ID type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="passport">Passport</SelectItem>
                  <SelectItem value="national_id">National ID</SelectItem>
                  <SelectItem value="drivers_license">Driver's License</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Select the type of government-issued ID you are providing
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="idNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter ID number" {...field} />
              </FormControl>
              <FormDescription>
                Enter the identification number from your document
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="idFile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload ID Document</FormLabel>
              <FormControl>
                <div className="flex flex-col items-center justify-center w-full">
                  <div 
                    onClick={handleFileUpload}
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    {uploadedFile ? (
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Uploaded: {uploadedFile}</p>
                        <p className="text-xs text-gray-500 mt-1">Click to change</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PDF, PNG, JPG (MAX. 5MB)</p>
                      </div>
                    )}
                    <Input
                      type="hidden"
                      {...field}
                    />
                  </div>
                </div>
              </FormControl>
              <FormDescription>
                Upload a clear scan or photo of your ID document
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
          ) : "Submit for Verification"}
        </Button>
      </form>
    </Form>
  );
}
