"use client";

import { useState } from "react";
import { forgotPassword } from "@/services/auth.services";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await forgotPassword(email);
      setMessage("Check your email for reset code");
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-6 space-y-6">
        <h2 className="text-3xl font-bold text-center">Forgot Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4 ">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                Sending...
              </>
            ) : (
              "Send Reset Email"
            )}
          </Button>
        </form>

        {message && (
          <p className="text-center text-sm text-gray-600">{message}</p>
        )}
      </div>
    </div>
  );
}
