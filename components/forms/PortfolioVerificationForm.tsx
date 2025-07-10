"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { portfolioSchema } from "@/lib/verification-schemas";
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
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Upload, PlusCircle, X } from "lucide-react";

interface PortfolioVerificationFormProps {
  setCompleted: (completed: boolean) => void;
  initialData: z.infer<typeof portfolioSchema>;
  updateFormData: (data: z.infer<typeof portfolioSchema>) => void;
}

export default function PortfolioVerificationForm({
  setCompleted,
  initialData,
  updateFormData,
}: PortfolioVerificationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [portfolioItems, setPortfolioItems] = useState(
    initialData.portfolioItems.length > 0 
      ? initialData.portfolioItems 
      : [{ title: "", description: "", image: "" }]
  );

  const form = useForm<z.infer<typeof portfolioSchema>>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      ...initialData,
      portfolioItems: portfolioItems
    },
  });

  async function onSubmit(values: z.infer<typeof portfolioSchema>) {
    setIsSubmitting(true);
    // Here you would typically send the portfolio information to your backend for verification
    // For demo purposes, we'll simulate a successful verification
    try {
      console.log("Portfolio verification values:", values);
      updateFormData(values);
      
      // Simulate verification process
      setTimeout(() => {
        setCompleted(true);
        alert("Portfolio verified successfully!");
      }, 1500);
      
    } catch (error) {
      console.error("Error during portfolio verification:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Simulate image upload for a portfolio item
  const handleImageUpload = (index: number) => {
    // In a real app, you'd handle the file upload
    const mockFileName = `portfolio_image_${index + 1}.jpg`;
    
    // Update the form value
    const updatedItems = [...portfolioItems];
    updatedItems[index] = { ...updatedItems[index], image: mockFileName };
    setPortfolioItems(updatedItems);
    
    // Update the form
    form.setValue("portfolioItems", updatedItems);
  };

  // Add a new portfolio item
  const addPortfolioItem = () => {
    const newItems = [...portfolioItems, { title: "", description: "", image: "" }];
    setPortfolioItems(newItems);
    form.setValue("portfolioItems", newItems);
  };

  // Remove a portfolio item
  const removePortfolioItem = (index: number) => {
    if (portfolioItems.length > 1) {
      const newItems = portfolioItems.filter((_, i) => i !== index);
      setPortfolioItems(newItems);
      form.setValue("portfolioItems", newItems);
    }
  };

  // Update a portfolio item field
  const updateItemField = (index: number, field: string, value: string) => {
    const updatedItems = [...portfolioItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setPortfolioItems(updatedItems);
    form.setValue("portfolioItems", updatedItems);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="portfolioDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Portfolio Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your products or services"
                  className="min-h-32"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide a brief overview of what you offer
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Portfolio Items</h3>
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={addPortfolioItem}
              className="flex items-center"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>

          {portfolioItems.map((item, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-4 relative">
              {portfolioItems.length > 1 && (
                <button 
                  type="button"
                  onClick={() => removePortfolioItem(index)}
                  className="absolute right-2 top-2 text-gray-400 hover:text-red-500"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <Input
                    value={item.title}
                    onChange={(e) => updateItemField(index, 'title', e.target.value)}
                    placeholder="Product or service name"
                  />
                  {form.formState.errors.portfolioItems?.[index]?.title && (
                    <p className="text-sm text-red-500 mt-1">
                      {form.formState.errors.portfolioItems[index]?.title?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <Textarea
                    value={item.description}
                    onChange={(e) => updateItemField(index, 'description', e.target.value)}
                    placeholder="Describe this item"
                    rows={3}
                  />
                  {form.formState.errors.portfolioItems?.[index]?.description && (
                    <p className="text-sm text-red-500 mt-1">
                      {form.formState.errors.portfolioItems[index]?.description?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                  <div 
                    onClick={() => handleImageUpload(index)}
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    {item.image ? (
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Uploaded: {item.image}</p>
                        <p className="text-xs text-gray-500 mt-1">Click to change</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> an image
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG (MAX. 5MB)</p>
                      </div>
                    )}
                  </div>
                  {form.formState.errors.portfolioItems?.[index]?.image && (
                    <p className="text-sm text-red-500 mt-1">
                      {form.formState.errors.portfolioItems[index]?.image?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button 
          type="submit" 
          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          ) : "Submit Portfolio for Verification"}
        </Button>
      </form>
    </Form>
  );
}
