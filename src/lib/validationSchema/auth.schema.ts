import * as z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty("Name is required")
      .min(3, "Name must be at least 3 characters"),

    email: z
      .string()
      .nonempty("Email is required")
      .email("Invalid email address"),

    password: z
      .string()
      .nonempty("Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
        "Password must contain uppercase, lowercase and number",
      ),

    rePassword: z.string().nonempty("Confirm password is required"),

    phone: z
      .string()
      .nonempty("Phone is required")
      .regex(/^01[0-2,5]{1}[0-9]{8}$/, "Invalid Egyptian phone number"),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "Passwords do not match",
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;

/*                                                                                                                     */
export const LoginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),

  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
      "Password must contain uppercase, lowercase and number",
    ),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
