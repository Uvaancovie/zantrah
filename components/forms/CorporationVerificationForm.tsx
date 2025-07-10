"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { corporationSchema } from "@/lib/verification-schemas";
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

interface CorporationVerificationFormProps {
  setCompleted: (completed: boolean) => void;
  initialData: z.infer<typeof corporationSchema>;
  updateFormData: (data: z.infer<typeof corporationSchema>) => void;
}

export default function CorporationVerificationForm({
  setCompleted,
  initialData,
  updateFormData,
}: CorporationVerificationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof corporationSchema>>({
    resolver: zodResolver(corporationSchema),
    defaultValues: initialData,
  });

  async function onSubmit(values: z.infer<typeof corporationSchema>) {
    setIsSubmitting(true);
    try {
      console.log("Corporation verification values:", values);
      updateFormData(values);
      setCompleted(true);
      // Show success message
      alert("Corporation verification information submitted successfully!");
    } catch (error) {
      console.error("Error during corporation verification:", error);
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
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Your company's legal name" {...field} />
              </FormControl>
              <FormDescription>
                Enter the legal name of your corporation
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="registrationNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Registration Number</FormLabel>
              <FormControl>
                <Input placeholder="Company registration number" {...field} />
              </FormControl>
              <FormDescription>
                Enter your company's official registration number
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Technology, Healthcare" {...field} />
              </FormControl>
              <FormDescription>
                Enter the primary industry your company operates in
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="companySize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Size</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-500">201-500 employees</SelectItem>
                    <SelectItem value="501-1000">501-1000 employees</SelectItem>
                    <SelectItem value="1000+">1000+ employees</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Number of employees in your organization
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hiringCapacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hiring Capacity</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select hiring capacity" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1-5">1-5 positions</SelectItem>
                    <SelectItem value="6-20">6-20 positions</SelectItem>
                    <SelectItem value="21-50">21-50 positions</SelectItem>
                    <SelectItem value="50+">50+ positions</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Number of positions you plan to hire for
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Website</FormLabel>
              <FormControl>
                <Input placeholder="https://www.example.com" {...field} />
              </FormControl>
              <FormDescription>
                Enter your company's website URL
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyLogo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Logo</FormLabel>
              <div className="flex items-center gap-4">
                <FormControl>
                  <Input
                    type="text"
                    readOnly
                    placeholder="Upload your company logo"
                    {...field}
                    className="bg-gray-50"
                  />
                </FormControl>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => handleFileUpload('companyLogo')}
                >
                  Upload
                </Button>
              </div>
              <FormDescription>
                Upload your company logo (PNG or JPG format)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="businessLicense"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business License</FormLabel>
              <div className="flex items-center gap-4">
                <FormControl>
                  <Input
                    type="text"
                    readOnly
                    placeholder="Upload your business license"
                    {...field}
                    className="bg-gray-50"
                  />
                </FormControl>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => handleFileUpload('businessLicense')}
                >
                  Upload
                </Button>
              </div>
              <FormDescription>
                Upload a copy of your business license or incorporation certificate
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
          ) : "Submit Corporation Verification"}
        </Button>
      </form>
    </Form>
  );
}
