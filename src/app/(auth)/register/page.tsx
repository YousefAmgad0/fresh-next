"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

import {
  registerSchema,
  RegisterSchemaType,
} from "@/lib/validationSchema/auth.schema";
import { signUpUser } from "@/services/auth.services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

export default function Register() {
  const router = useRouter();
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  async function handleRegister(values: RegisterSchemaType) {
    console.log(values);
    const response = await signUpUser(values);
    // console.log(response, "Sign Up");
    if (response.message == "success") {
      toast.success("Successful Register");
      router.push("/login");
    } else toast.error(response.message);
  }

  return (
    <main className="py-10 min-h-screen">
      <div className="container mx-auto text-center space-y-4">
        <h2 className="text-8xl font-bold">Join Us</h2>
        <p className="text-2xl text-gray-400">Register Now in Shop Mart</p>
      </div>

      <form
        onSubmit={form.handleSubmit(handleRegister)}
        className="max-w-lg border rounded-lg mx-auto shadow-xl p-6 my-4 space-y-5"
      >
        {/* Name */}
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input id="name" type="text" {...field} />
              {fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />

        {/* Email */}
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" {...field} />
              {fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />

        {/* Password */}
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" {...field} />
              {fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />

        {/* RePassword */}
        <Controller
          name="rePassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="rePassword">Re-Password</FieldLabel>
              <Input id="rePassword" type="password" {...field} />
              {fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />

        {/* Phone */}
        <Controller
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="phone">Phone</FieldLabel>
              <Input id="phone" type="tel" {...field} />
              {fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />

        <Button type="submit" className="w-full cursor-pointer">
          {form.formState.isSubmitting ? <Spinner /> : "Register"}
        </Button>
      </form>
    </main>
  );
}
