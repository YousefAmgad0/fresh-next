
"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";

import { registerSchema } from "@/lib/validationSchema/auth.schema";
import type { RegisterSchemaType } from "@/lib/validationSchema/auth.schema";
import { signUpUser } from "@/services/auth.services";

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
    try {
      const response = await signUpUser(values);

      if (response.message === "success") {
        toast.success("Successful Register");
        router.push("/login");
      } else {
        toast.error(response.message || "Registration failed");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <main className="min-h-screen py-10">
      <div className="container mx-auto space-y-4 text-center">
        <h2 className="text-4xl font-bold">Join Us</h2>
        <p className="text-2xl text-gray-400">
          Register Now in Shop Mart
        </p>
      </div>

      <form
        onSubmit={form.handleSubmit(handleRegister)}
        className="mx-auto my-4 max-w-lg space-y-5 rounded-lg border p-6 shadow-xl"
      >
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

        <Controller
          name="rePassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="rePassword">Confirm Password</FieldLabel>
              <Input id="rePassword" type="password" {...field} />
              {fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />

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

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full cursor-pointer"
        >
          {form.formState.isSubmitting ? <Spinner /> : "Register"}
        </Button>
      </form>
    </main>
  );
}
