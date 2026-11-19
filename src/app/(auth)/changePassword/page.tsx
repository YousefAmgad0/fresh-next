
"use client";

import { changeMyPasswordAction } from "@/app/_actions/user.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import type { ChangePasswordRequest } from "@/interfaces/userPassword";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ChangePassword() {
  const router = useRouter();

  const currentPassword = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const rePassword = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessage("");
    setIsError(false);

    const userPassword: ChangePasswordRequest = {
      currentPassword: currentPassword.current?.value || "",
      password: password.current?.value || "",
      rePassword: rePassword.current?.value || "",
    };

    if (
      !userPassword.currentPassword ||
      !userPassword.password ||
      !userPassword.rePassword
    ) {
      setIsError(true);
      setMessage("Please fill all fields");
      return;
    }

    if (userPassword.password !== userPassword.rePassword) {
      setIsError(true);
      setMessage("New password and confirmation do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await changeMyPasswordAction(userPassword);

      if (response.success) {
        toast.success("Password changed successfully. Please login again.");

        await signOut({ redirect: false });
        router.replace("/login");
        router.refresh();

        return;
      }

      setIsError(true);
      setMessage(response.message || "Failed to change password");
      toast.error(response.message || "Failed to change password");
    } catch (error: unknown) {
      setIsError(true);

      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      setMessage(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen px-4 py-10">
      <h2 className="my-4 text-center text-2xl font-bold">
        Change Password
      </h2>

      <div className="mx-auto mt-10 max-w-md">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-lg p-4 shadow"
        >
          <div className="space-y-2">
            <label htmlFor="currentPassword" className="text-sm font-medium">
              Current Password
            </label>
            <Input
              ref={currentPassword}
              id="currentPassword"
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              New Password
            </label>
            <Input
              ref={password}
              id="password"
              type="password"
              name="password"
              placeholder="New Password"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="rePassword" className="text-sm font-medium">
              Confirm New Password
            </label>
            <Input
              ref={rePassword}
              id="rePassword"
              type="password"
              name="rePassword"
              placeholder="Confirm New Password"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Password"
            )}
          </Button>

          {message && (
            <p
              role="status"
              aria-live="polite"
              className={`text-center text-sm ${
                isError ? "text-red-500" : "text-green-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
