"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { addressSchema } from "@/lib/verification-schemas";
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
import { Upload } from "lucide-react";

interface AddressVerificationFormProps {
  setCompleted: (completed: boolean) => void;
  initialData: z.infer<typeof addressSchema>;
  updateFormData: (data: z.infer<typeof addressSchema>) => void;
}

export default function AddressVerificationForm({
  setCompleted,
  initialData,
  updateFormData,
}: AddressVerificationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(initialData.proofFile || null);

  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: initialData,
  });

  async function onSubmit(values: z.infer<typeof addressSchema>) {
    setIsSubmitting(true);
    // Here you would typically send the address information to your backend for verification
    // For demo purposes, we'll simulate a successful verification
    try {
      console.log("Address verification values:", values);
      updateFormData(values);
      
      // Simulate verification process
      setTimeout(() => {
        setCompleted(true);
        alert("Address verified successfully!");
      }, 1500);
      
    } catch (error) {
      console.error("Error during address verification:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Simulate file upload
  const handleFileUpload = () => {
    // In a real app, you'd handle the file upload
    const mockFileName = "proof_of_address.pdf";
    setUploadedFile(mockFileName);
    form.setValue("proofFile", mockFileName);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="addressLine1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 1</FormLabel>
              <FormControl>
                <Input placeholder="Street address" {...field} />
              </FormControl>
              <FormDescription>
                Enter your street address
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="addressLine2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 2 (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Apartment, suite, unit, etc." {...field} />
              </FormControl>
              <FormDescription>
                Additional address information if needed
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="City" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State/Province</FormLabel>
                <FormControl>
                  <Input placeholder="State or Province" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input placeholder="Postal or ZIP code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="Country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="proofFile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Proof of Address</FormLabel>
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
                        <p className="text-xs text-gray-500">Utility bill, bank statement, etc. (MAX. 5MB)</p>
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
                Upload a recent utility bill, bank statement, or other official document showing your name and address (less than 3 months old)
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
