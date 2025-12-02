import { z } from 'zod';

// Enums based on the document
export const PlayerHandEnum = z.enum(['right', 'left']);
export const PlayerLevelEnum = z.enum([
  'beginner_2_2.25',       // 2.0 - 2.25
  'beginner_2.25_2.5',     // 2.25 - 2.5
  'intermediate_2.5_3.0',   // 2.5 - 3.0
  'intermediate_adv_3.0_3.5',
  'advanced_3.5_4.0',
  'master_plus_4.0'
]);

// Main Schema for Creating/Editing Student
export const StudentSchema = z.object({
  // Basic Personal Data
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.email("Invalid email"),
  phone: z.string().min(9, "Invalid phone number"),
  birthDate: z.string().refine((date) => new Date(date).toString() !== 'Invalid Date', {
    message: "Invalid birth date",
  }),
  
  // Address
  address: z.object({
    street: z.string().optional(),
    zipCode: z.string().min(5, "Invalid zip code").optional(),
    city: z.string().optional(),
    province: z.string().optional(),
  }),

  // Bank Details (Optional initially, but critical for payments)
  bankAccount: z.string().min(10, "Incomplete bank account").optional().or(z.literal('')),

  // Sports Profile
  playHand: PlayerHandEnum.default('right'),
  level: PlayerLevelEnum.default('beginner_2_2.25'),

  // Affiliation
  isAffiliate: z.boolean().default(false),
  // We only require date if affiliate. Zod.refine handles this conditional logic.
  affiliationDate: z.string().optional(),
}).refine((data) => {
  if (data.isAffiliate && !data.affiliationDate) {
    return false;
  }
  return true;
}, {
  message: "Affiliation date is required if the student is an affiliate",
  path: ["affiliationDate"],
});

export type StudentFormValues = z.infer<typeof StudentSchema>;
