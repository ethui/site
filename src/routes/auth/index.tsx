import { Form } from "@ethui/ui/components/form";
import { Alert, AlertDescription } from "@ethui/ui/components/shadcn/alert";
import { Button } from "@ethui/ui/components/shadcn/button";
import {
  CardContent,
  CardDescription,
  CardTitle,
} from "@ethui/ui/components/shadcn/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle, Copy } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthProvider, useAuth } from "./-context";

export const Route = createFileRoute("/auth/")({
  component: () => (
    <AuthProvider>
      <AuthPage />
    </AuthProvider>
  ),
});

function AuthPage() {
  const { step } = useAuth();

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="mx-auto w-full max-w-md">
        <div className="flex justify-center gap-2">
          <img
            src="https://avatars.githubusercontent.com/u/164216877?s=400&v=4"
            alt="ethui logo"
            className="h-8 w-auto"
          />
          <CardTitle className="text-2xl">ethui login</CardTitle>
        </div>

        <div className="mt-6">
          <CardContent className="pt-6">
            {step === "email" && <EmailForm />}
            {step === "verification" && <VerificationForm />}
            {step === "authenticated" && <Authenticated />}
          </CardContent>
        </div>
      </div>
    </div>
  );
}

function EmailForm() {
  const { sendCode } = useAuth();

  const schema = z.object({
    email: z.string().email(),
  });

  type Schema = z.infer<typeof schema>;

  const form = useForm<Schema>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: Schema) => {
    sendCode(values.email.trim());
  };

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Form.Text label="E-mail address" name="email" className="w-full" />

      <div className="flex gap-2">
        <Form.Submit label="Send code" className="cursor-pointer" />
      </div>
    </Form>
  );
}

function VerificationForm() {
  const { email, verifyCode, goBackToEmail, loading } = useAuth();
  const schema = z.object({
    code: z.number().gte(100_000).lte(999_999),
  });

  type Schema = z.infer<typeof schema>;

  const form = useForm<Schema>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: Schema) => {
    verifyCode(email!, values.code);
  };

  return (
    <div className="space-y-2">
      <CardDescription>
        A verification code has been sent to: <strong>{email}</strong>
      </CardDescription>

      <Form form={form} onSubmit={onSubmit} className="w-full">
        <Form.NumberField
          label="Verification Code"
          name="code"
          className="w-full text-lg"
          disabled={loading}
        />

        <div className="flex flex-row items-end gap-2">
          <Form.Submit label={loading ? "Verifying..." : "Verify Code"} />

          <Button
            type="button"
            variant="outline"
            onClick={goBackToEmail}
            disabled={loading}
          >
            Go back
          </Button>
        </div>
      </Form>
    </div>
  );
}

function Authenticated() {
  const { error, email, token } = useAuth();
  const defaultBtnCopy = "Copy Token to Clipboard";
  const [btnText, setBtnCopy] = useState(defaultBtnCopy);

  const copy = () => {
    token && navigator.clipboard.writeText(token);
    setBtnCopy("Copied!");
  };

  return (
    <div className="space-y-4">
      <Alert className="border-green-200 bg-green-50">
        <AlertDescription className="flex flex-col space-y-2">
          <div className="flex flex-row items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="font-medium text-green-800">
              Authentication Successful
            </span>
          </div>
          <span className="text-green-700">
            You have been successfully authenticated as:{" "}
            <strong>{email}</strong>
          </span>
        </AlertDescription>
      </Alert>

      <div className="space-y-2">
        <div className="text-sm">Your token:</div>
        <button
          type="button"
          className="relative cursor-pointer text-left"
          onClick={copy}
        >
          <div className="break-all font-mono">{token}</div>
        </button>
      </div>
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Button type="button" className="w-full cursor-pointer" onClick={copy}>
          <Copy className="mr-2 h-4 w-4" />
          {btnText}
        </Button>
      </div>
    </div>
  );
}
