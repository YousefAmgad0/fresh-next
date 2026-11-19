
import type {
  LoginSchemaType,
  RegisterSchemaType,
} from "@/lib/validationSchema/auth.schema";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_BASE_URL is not defined");
}

export async function signUpUser(formData: RegisterSchemaType) {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}

export async function signInUser(formData: LoginSchemaType) {
  const response = await fetch(`${API_URL}/auth/signin`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}

export async function forgotPassword(email: string) {
  const response = await fetch(`${API_URL}/auth/forgotPasswords`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}
