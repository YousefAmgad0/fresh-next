"use client";

import { changeMyPasswordAction } from "@/app/_actions/user.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { ChangePasswordRequest } from "@/interfaces/userPassword";
import { success } from "zod";
import { toast } from "sonner";

export default function ChangePassword() {
  const currentPassword = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const rePassword = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function changePasswordAction(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    const userPassword: ChangePasswordRequest = {
      currentPassword: currentPassword.current?.value || "",
      password: password.current?.value || "",
      rePassword: rePassword.current?.value || "",
    };

    if (!userPassword.currentPassword || !userPassword.password || !userPassword.rePassword) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await changeMyPasswordAction(userPassword);
      setMessage(res.message);

      
      if (res.message == success) {
        toast.success('Password has been Changed',{'position':'top-center'})
        
      }
    } catch (error: any) {
      console.log(error, "Error TO change Password");
      setMessage(error?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h2 className="text-2xl font-bold my-4 text-center">Change Password</h2>
      <div className="max-w-md mx-auto mt-10 h-screen">
        <form onSubmit={changePasswordAction} className="space-y-4 shadow p-4">
          <Input
            ref={currentPassword}
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            className="w-full border p-2 rounded"
            required
          />

          <Input
            ref={password}
            type="password"
            name="password"
            placeholder="New Password"
            className="w-full border p-2 rounded"
            required
          />

          <Input
            ref={rePassword}
            type="password"
            name="rePassword"
            placeholder="Confirm Password"
            className="w-full border p-2 rounded"
            required
          />

          <Button
            type="submit"
            className="w-full bg-black text-white py-2 rounded flex justify-center items-center gap-2"
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Update Password"}
          </Button>

          {message && (
            <p className="mt-2 text-center text-sm text-red-500">{message}</p>
          )}
        </form>
      </div>
    </>
  );
}
