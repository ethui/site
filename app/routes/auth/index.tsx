import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useAuthStore } from "#/utils/auth/store";
import { Button } from "@ethui/ui/components/shadcn/button";
import { Input } from "@ethui/ui/components/shadcn/input";
import { Label } from "@ethui/ui/components/shadcn/label";
import { Form } from "@ethui/ui/components/form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@ethui/ui/components/shadcn/card";
import { Alert, AlertDescription } from "@ethui/ui/components/shadcn/alert";
import { CheckCircle, Copy, LogOut } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const Route = createFileRoute("/auth/")({
  component: AuthPage,
});

function AuthPage() {
  const {
    step,
    email,
    code,
    token,
    loading,
    error,
    setEmail,
    setCode,
    sendCode,
    verifyCode,
    goBackToEmail,
    logout,
  } = useAuthStore();

  const [emailInput, setEmailInput] = useState(email);
  const [codeInput, setCodeInput] = useState(code);

  const handleSendCode = async (email: string) => {
    if (email) return;
    await sendCode(email);
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!codeInput.trim()) return;
    await verifyCode(email, codeInput.trim());
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmailInput(value);
    setEmail(value);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCodeInput(value);
    setCode(value);
  };

  return (
    <div className="flex  items-center justify-center h-screen">
      <div className="mx-auto w-full max-w-md">
        <div className="text-center">
          <CardTitle className="text-2xl">Authentication</CardTitle>
          <CardDescription>
            {step === "email" &&
              "Enter your email to receive a verification code"}
            {step === "verification" &&
              "Enter the 6-digit code sent to your email"}
            {step === "authenticated" && "Successfully authenticated"}
          </CardDescription>
        </div>

        <div className="mt-6">
          <CardContent className="pt-6">
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {step === "email" && <EmailForm />}
            {step === "verification" && <VerificationForm />}

            {step === "verification" && (
              <div className="space-y-6">
                <CardDescription>
                  A verification code has been sent to: <strong>{email}</strong>
                </CardDescription>

                <form onSubmit={handleVerifyCode} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="code">Verification Code</Label>
                    <Input
                      id="code"
                      name="code"
                      type="text"
                      required
                      maxLength={6}
                      pattern="[0-9]{6}"
                      value={codeInput}
                      onChange={handleCodeChange}
                      className="text-center text-lg tracking-widest"
                      placeholder="123456"
                      disabled={loading}
                    />
                    <CardDescription className="text-xs">
                      Enter the 6-digit code sent to your email
                    </CardDescription>
                  </div>

                  <div className="space-y-3">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={
                        loading || !codeInput.trim() || codeInput.length !== 6
                      }
                    >
                      {loading ? "Verifying..." : "Verify Code"}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={goBackToEmail}
                      disabled={loading}
                    >
                      Change Email Address
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {step === "authenticated" && token && (
              <div className="space-y-6">
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="flex flex-col space-y-2">
                    <span className="font-medium text-green-800">
                      Authentication Successful
                    </span>
                    <span className="text-green-700">
                      You have been successfully authenticated for:{" "}
                      <strong>{email}</strong>
                    </span>
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <Label htmlFor="token">JWT Token</Label>
                  <div className="relative">
                    <Input
                      id="token"
                      as="textarea"
                      rows={8}
                      value={token}
                      readOnly
                      className="font-mono h-32 resize-none break-all"
                    />
                  </div>
                  <CardDescription className="text-xs">
                    This token can be used for API authentication
                  </CardDescription>
                </div>

                <div className="space-y-3">
                  <Button
                    type="button"
                    className="w-full"
                    onClick={() => navigator.clipboard.writeText(token)}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Token to Clipboard
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={logout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </div>
      </div>
    </div>
  );
}

function EmailForm() {
  const { setEmail, sendCode } = useAuthStore();

  const schema = z.object({
    email: z.string().email(),
  });

  type Schema = z.infer<typeof schema>;

  const form = useForm<Schema>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values) => {
    console.log("sending");
    sendCode(values.email.trim());
    setEmail(values.email.trim());
  };

  return (
    <Form form={form} onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Form.Text label="Enter your email address" name="email" />
      </div>

      <Form.Submit label="Send code" className="cursor-pointer" />
    </Form>
  );
}

function VerificationForm() {
  const { email, verifyCode, goBackToEmail } = useAuthStore();
  const onSubmit = async (values) => {
    console.log("sending");
    verifyCode(email, values.code.trim());
  };

  return (
    <div className="space-y-6">
      <CardDescription>
        A verification code has been sent to: <strong>{email}</strong>
      </CardDescription>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="code">Verification Code</Label>
          <Input
            id="code"
            name="code"
            type="text"
            required
            maxLength={6}
            pattern="[0-9]{6}"
            value={codeInput}
            onChange={handleCodeChange}
            className="text-center text-lg tracking-widest"
            placeholder="123456"
            disabled={loading}
          />
          <CardDescription className="text-xs">
            Enter the 6-digit code sent to your email
          </CardDescription>
        </div>

        <div className="space-y-3">
          <Button
            type="submit"
            className="w-full"
            disabled={loading || !codeInput.trim() || codeInput.length !== 6}
          >
            {loading ? "Verifying..." : "Verify Code"}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={goBackToEmail}
            disabled={loading}
          >
            Change Email Address
          </Button>
        </div>
      </form>
    </div>
  );
}
