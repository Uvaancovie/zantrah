"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { paymentSchema } from "@/lib/verification-schemas";
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

interface PaymentVerificationFormProps {
  setCompleted: (completed: boolean) => void;
  initialData: z.infer<typeof paymentSchema>;
  updateFormData: (data: z.infer<typeof paymentSchema>) => void;
}

export default function PaymentVerificationForm({
  setCompleted,
  initialData,
  updateFormData,
}: PaymentVerificationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: initialData,
  });

  async function onSubmit(values: z.infer<typeof paymentSchema>) {
    setIsSubmitting(true);
    // Here you would typically send the payment information to your backend for verification
    // For demo purposes, we'll simulate a successful verification
    try {
      console.log("Payment verification values:", values);
      updateFormData(values);
      
      // Simulate verification process
      setTimeout(() => {
        setCompleted(true);
        alert("Payment method verified successfully!");
      }, 1500);
      
    } catch (error) {
      console.error("Error during payment verification:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="accountName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Holder Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter the name on your account" {...field} />
              </FormControl>
              <FormDescription>
                Enter the name exactly as it appears on your bank account
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bankName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your bank name" {...field} />
              </FormControl>
              <FormDescription>
                The name of your banking institution
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accountNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Number</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter your account number" 
                  type="text"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Your bank account number (will be securely stored)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="swiftCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SWIFT/BIC Code (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="For international transfers" {...field} />
                </FormControl>
                <FormDescription>
                  Required for international transfers
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="routingNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Routing Number (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="For US bank accounts" {...field} />
                </FormControl>
                <FormDescription>
                  Required for US bank accounts
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="text-sm text-gray-600 p-4 bg-blue-50 rounded-lg">
          <p className="font-medium text-blue-800 mb-2">Security Notice</p>
          <p>Your banking information is encrypted and securely stored. We will never share your financial details with third parties without your explicit consent.</p>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          ) : "Verify Payment Method"}
        </Button>
      </form>
    </Form>
  );
}
