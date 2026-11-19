
"use server";

import type { ChangePasswordRequest } from "@/interfaces/userPassword";
import { getUserToken } from "@/lib/auth";

const API_URL = "https://ecommerce.routemisr.com/api/v1";

export async function changeMyPasswordAction(
  changePassword: ChangePasswordRequest,
) {
  const token = await getUserToken();

  if (!token) {
    return {
      success: false,
      message: "Not authorized",
    };
  }

  const response = await fetch(`${API_URL}/users/changeMyPassword`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify(changePassword),
  });

  const data = await response.json();

  return {
    success: response.ok,
    message:
      data.message ||
      (response.ok
        ? "Password changed successfully"
        : "Failed to change password"),
  };
}
