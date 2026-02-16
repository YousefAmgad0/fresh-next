"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

import {
  LoginSchema,
  LoginSchemaType,
} from "@/lib/validationSchema/auth.schema";
import { signInUser, signUpUser } from "@/services/auth.services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { signIn } from "next-auth/react";
import Link from "next/link";
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
    console.log(values);
    // const response = await signInUser(values);
    // console.log(response, "Sign in");
    // if (response.message == "success") {
    // } else toast.error(response.message);
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (response?.ok) {
      toast.success("Successful Login");
      router.push("/");
    } else {
      toast.error(response?.error);
    }
  }

  return (
    <main className="py-10 min-h-screen">
      <div className="container mx-auto text-center space-y-4">
        <h2 className="text-4xl font-bold">Welcome to Login Page</h2>
        <p className="text-2xl text-gray-400">Login Now in Shop Mart</p>
      </div>

      <form
        onSubmit={form.handleSubmit(handleLogin)}
        className="max-w-lg border rounded-lg mx-auto shadow-xl p-6 my-4 space-y-5"
      >
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

        {/* 🔹 Forgot Password */}
<div className="flex justify-end">
  <Link
    href="/forgot-password"
    className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
  >
    Forgot Password?
  </Link>
</div>


        <Button type="submit" className="w-full cursor-pointer">
          {form.formState.isSubmitting ? <Spinner /> : "Login"}
        </Button>
      </form>
    </main>
  );
}
