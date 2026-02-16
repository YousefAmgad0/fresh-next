import { LoginSchemaType, RegisterSchemaType } from "@/lib/validationSchema/auth.schema";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function signUpUser(formData :RegisterSchemaType) {
  const resposne = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await resposne.json();
  return data;
}
export async function signInUser(formData :LoginSchemaType) {
  const resposne = await fetch(`${API_URL}/auth/signin`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await resposne.json();
  return data;
}
/************************************* */

/******************************* */
export async function forgotPassword(email: string) {
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}
