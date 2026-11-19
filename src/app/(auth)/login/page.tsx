
"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";

import { LoginSchema } from "@/lib/validationSchema/auth.schema";
import type { LoginSchemaType } from "@/lib/validationSchema/auth.schema";

export default function Login() {
  const router = useRouter();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleLogin(values: LoginSchemaType) {
    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (response?.ok) {
        toast.success("Successful Login");
        router.push("/");
      } else {
        toast.error("Invalid email or password");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <main className="min-h-screen py-10">
      <div className="container mx-auto space-y-4 text-center">
        <h2 className="text-4xl font-bold">Welcome to Login Page</h2>
        <p className="text-2xl text-gray-400">
          Login Now in Shop Mart
        </p>
      </div>

      <form
        onSubmit={form.handleSubmit(handleLogin)}
        className="mx-auto my-4 max-w-lg space-y-5 rounded-lg border p-6 shadow-xl"
      >
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

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full cursor-pointer"
        >
          {form.formState.isSubmitting ? <Spinner /> : "Login"}
        </Button>
      </form>
    </main>
  );
}
