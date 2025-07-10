// verification-schemas.ts
import * as z from "zod"

// Phone number validation
export const phoneSchema = z.object({
  phone: z
    .string()
    .min(7, "Phone number must be at least 7 digits")
    .regex(/^\+?[0-9\s\-()]+$/, "Please enter a valid phone number")
    .max(20, "Phone number is too long"),
})

// Email validation
export const emailSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(5, "Email is too short")
    .max(100, "Email is too long"),
})

// Government ID validation
export const govIdSchema = z.object({
  idType: z.enum(["passport", "national_id", "drivers_license"], {
    required_error: "Please select an ID type",
  }),
  idNumber: z
    .string()
    .min(5, "ID number must be at least 5 characters")
    .max(30, "ID number is too long"),
  idFile: z.string().min(1, "Please upload a scan of your ID"),
})

// Business registration validation
export const businessSchema = z.object({
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters")
    .max(100, "Business name is too long"),
  businessType: z.enum(
    ["sole_proprietorship", "llc", "corporation", "partnership", "other"],
    {
      required_error: "Please select a business type",
    }
  ),
  registrationNumber: z
    .string()
    .min(4, "Registration number must be at least 4 characters"),
  registrationFile: z.string().min(1, "Please upload your business registration"),
})

// Address validation
export const addressSchema = z.object({
  addressLine1: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(100, "Address is too long"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State/Province is required"),
  postalCode: z.string().min(3, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
  proofFile: z.string().min(1, "Please upload a proof of address"),
})

// Portfolio validation
export const portfolioSchema = z.object({
  portfolioDescription: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(500, "Description is too long"),
  portfolioItems: z.array(
    z.object({
      title: z.string().min(2, "Title is required"),
      description: z.string().min(10, "Description is required"),
      image: z.string().min(1, "Image is required"),
    })
  ).min(1, "Add at least one portfolio item"),
})

// Student verification validation
export const studentSchema = z.object({
  institutionName: z
    .string()
    .min(3, "Institution name must be at least 3 characters")
    .max(100, "Institution name is too long"),
  studentId: z
    .string()
    .min(3, "Student ID must be at least 3 characters")
    .max(30, "Student ID is too long"),
  program: z.string().min(2, "Program of study is required"),
  graduationYear: z
    .string()
    .regex(/^\d{4}$/, "Please enter a valid year (YYYY)")
    .refine((val) => parseInt(val) >= new Date().getFullYear(), {
      message: "Graduation year must be current or future year",
    }),
  studentIdCard: z.string().min(1, "Please upload your student ID card"),
  enrollmentProof: z.string().min(1, "Please upload proof of enrollment"),
})

// Corporation hiring verification validation
export const corporationSchema = z.object({
  companyName: z
    .string()
    .min(3, "Company name must be at least 3 characters")
    .max(100, "Company name is too long"),
  registrationNumber: z
    .string()
    .min(5, "Registration number must be at least 5 characters"),
  industry: z.string().min(2, "Industry is required"),
  companySize: z.enum(
    ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"],
    {
      required_error: "Please select company size",
    }
  ),
  hiringCapacity: z.enum(
    ["1-5", "6-20", "21-50", "50+"],
    {
      required_error: "Please select hiring capacity",
    }
  ),
  website: z
    .string()
    .url("Please enter a valid URL")
    .min(5, "Website URL is required"),
  companyLogo: z.string().min(1, "Please upload company logo"),
  businessLicense: z.string().min(1, "Please upload business license"),
})

// Payment validation
export const paymentSchema = z.object({
  accountName: z
    .string()
    .min(3, "Account name must be at least 3 characters")
    .max(100, "Account name is too long"),
  bankName: z.string().min(2, "Bank name is required"),
  accountNumber: z
    .string()
    .min(5, "Account number must be at least 5 characters")
    .max(30, "Account number is too long"),
  swiftCode: z.string().optional(),
  routingNumber: z.string().optional(),
})
