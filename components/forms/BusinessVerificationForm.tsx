"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { businessSchema } from "@/lib/verification-schemas";
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
import { Checkbox } from "@/components/ui/checkbox";

interface BusinessVerificationFormProps {
    setCompleted: (completed: boolean) => void;
    initialData: z.infer<typeof businessSchema>;
    updateFormData: (data: z.infer<typeof businessSchema>) => void;
}

export default function BusinessVerificationForm({
    setCompleted,
    initialData,
    updateFormData,
}: BusinessVerificationFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<string | null>(initialData.registrationFile || null);
    const [isSmallBusiness, setIsSmallBusiness] = useState(initialData.isSmallBusiness || false);

    const form = useForm<z.infer<typeof businessSchema>>({
        resolver: zodResolver(businessSchema),
        defaultValues: initialData,
    });

    async function onSubmit(values: z.infer<typeof businessSchema>) {
        setIsSubmitting(true);
        // Here you would typically send the business information to your backend for verification
        // For demo purposes, we'll simulate a successful verification
        try {
            console.log("Business verification values:", values);
            updateFormData(values);
            
            // Simulate verification process
            setTimeout(() => {
                setCompleted(true);
                alert("Business information verified successfully!");
            }, 1500);
            
        } catch (error) {
            console.error("Error during business verification:", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    // Simulate file upload
    const handleFileUpload = () => {
        // In a real app, you'd handle the file upload
        const mockFileName = "business_registration.pdf";
        setUploadedFile(mockFileName);
        form.setValue("registrationFile", mockFileName);
    };

    // Handle small business checkbox change
    const handleSmallBusinessChange = (checked: boolean) => {
        setIsSmallBusiness(checked);
        form.setValue("isSmallBusiness", checked);
        
        if (checked) {
            // Clear registration fields if small business is selected
            form.setValue("registrationNumber", "N/A - Small Business");
            form.setValue("registrationFile", "exempt");
        } else {
            // Reset fields if unchecked
            form.setValue("registrationNumber", initialData.registrationNumber || "");
            form.setValue("registrationFile", initialData.registrationFile || "");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Business Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your business name" {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter the name of your business or vendor operation
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="businessType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Business Type</FormLabel>
                            <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select business type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="sole_proprietorship">Sole Proprietorship</SelectItem>
                                    <SelectItem value="llc">Limited Liability Company (LLC)</SelectItem>
                                    <SelectItem value="corporation">Corporation</SelectItem>
                                    <SelectItem value="partnership">Partnership</SelectItem>
                                    <SelectItem value="small_vendor">Small Vendor/Trader</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Select the type of business entity
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="isSmallBusiness"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                                <Checkbox
                                    checked={isSmallBusiness}
                                    onCheckedChange={handleSmallBusinessChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    I am a small business or vendor without formal registration documents
                                </FormLabel>
                                <FormDescription>
                                    Check this if you operate as a small trader, vendor, or informal business
                                </FormDescription>
                            </div>
                        </FormItem>
                    )}
                />

                {!isSmallBusiness && (
                    <>
                        <FormField
                            control={form.control}
                            name="registrationNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Registration Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter business registration number" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter your business registration or license number
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="registrationFile"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Upload Registration Document</FormLabel>
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
                                        Upload a copy of your business registration document or license
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                )}

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

export const businessSchema = z.object({
    businessName: z.string().min(2, "Business name is required"),
    businessType: z.enum(["sole_proprietorship", "llc", "corporation", "partnership", "small_vendor", "other"]),
    registrationNumber: z.string().min(2, "Registration number is required"),
    registrationFile: z.string().min(1, "Registration document is required"),
    isSmallBusiness: z.boolean().optional().default(false),
});
