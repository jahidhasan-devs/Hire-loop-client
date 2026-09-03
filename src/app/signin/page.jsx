"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, InputGroup, Label, TextField } from "@heroui/react";

import {
  Envelope,
  Lock,
  Eye,
  EyeSlash,
  CircleCheck,
  TriangleExclamation,
} from "@gravity-ui/icons";

import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();

 const searchParams=useSearchParams();
 const redirectTo=searchParams.get('redirect')|| "/";
 console.log("Redirect to",redirectTo)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      const res = await authClient.signIn.email({
        email,
        password,
        
      });

      if (res?.error) {
        setErrorMsg(res.error.message || "Invalid email or password.");
        return;
      }

      setSuccessMsg("Login successful! Redirecting...");
       router.push(redirectTo);
   
    } 
    catch (err) {
      setErrorMsg(err?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md rounded-2xl border border-divider bg-content1 p-6 shadow-lg">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Welcome Back</h1>

          <p className="mt-1 text-small text-default-500">
            Enter your credentials to access your account
          </p>
        </div>

        {/* Success Message */}
        {successMsg && (
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-success-200 bg-success-50 p-3 text-small text-success">
            <CircleCheck className="h-5 w-5 shrink-0" />

            <span>{successMsg}</span>
          </div>
        )}

        {/* Error Message */}
        {errorMsg && (
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-danger-200 bg-danger-50 p-3 text-small text-danger">
            <TriangleExclamation className="h-5 w-5 shrink-0" />

            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <TextField
            name="email"
            type="email"
            isRequired
            value={email}
            onChange={setEmail}
          >
            <Label>Email</Label>

            <InputGroup>
              <InputGroup.Prefix>
                <Envelope className="h-5 w-5 text-default-400" />
              </InputGroup.Prefix>

              <InputGroup.Input type="email" placeholder="Enter your email" />
            </InputGroup>
          </TextField>

          {/* Password */}
          <TextField
            name="password"
            type={isVisible ? "text" : "password"}
            isRequired
            value={password}
            onChange={setPassword}
          >
            <Label>Password</Label>

            <InputGroup>
              <InputGroup.Prefix>
                <Lock className="h-5 w-5 text-default-400" />
              </InputGroup.Prefix>

              <InputGroup.Input
                type={isVisible ? "text" : "password"}
                placeholder="Enter your password"
              />

              <InputGroup.Suffix>
                <button
                  type="button"
                  onClick={toggleVisibility}
                  aria-label={isVisible ? "Hide password" : "Show password"}
                  className="flex items-center justify-center outline-none"
                >
                  {isVisible ? (
                    <EyeSlash className="h-5 w-5 text-default-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-default-400" />
                  )}
                </button>
              </InputGroup.Suffix>
            </InputGroup>
          </TextField>

          {/* Submit */}
          <Button
            type="submit"
            variant="primary"
            isPending={loading}
            className="mt-2 w-full font-medium"
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        {/* Sign Up */}
        <div className="mt-6 text-center text-small">
          <span className="text-default-500">New to Hire Loop? </span>

          <Link
            href={`/signup?redirect=${redirectTo}`}
            className="font-semibold text-primary hover:underline"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
