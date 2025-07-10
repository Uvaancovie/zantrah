"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { phoneSchema } from "@/lib/verification-schemas";
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

interface PhoneVerificationFormProps {
  setCompleted: (completed: boolean) => void;
  initialData: z.infer<typeof phoneSchema>;
  updateFormData: (data: z.infer<typeof phoneSchema>) => void;
}

export default function PhoneVerificationForm({
  setCompleted,
  initialData,
  updateFormData,
}: PhoneVerificationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const form = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: initialData,
  });

  async function onSubmit(values: z.infer<typeof phoneSchema>) {
    setIsSubmitting(true);
    // Here you would typically send the phone number to your backend for verification
    // For demo purposes, we'll simulate a successful verification
    try {
      console.log("Phone verification values:", values);
      updateFormData(values);
      
      if (!verificationSent) {
        // Simulate sending verification code
        setVerificationSent(true);
        form.reset(values);
      } else {
        // Simulate verifying the code
        if (verificationCode === "123456") {
          setCompleted(true);
          // Show success message
          alert("Phone number verified successfully!");
        } else {
          alert("Invalid verification code. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error during phone verification:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="+1234567890" {...field} />
              </FormControl>
              <FormDescription>
                Enter a valid phone number including country code
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {verificationSent && (
          <div className="space-y-4">
            <div className="text-sm text-gray-600">
              We've sent a verification code to your phone number. Please enter it below:
            </div>
            <Input
              placeholder="123456"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full"
            />
          </div>
        )}          <Button 
            type="submit" 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            disabled={isSubmitting}
          >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          ) : verificationSent ? "Verify Code" : "Send Verification Code"}
        </Button>
      </form>
    </Form>
  );
}
