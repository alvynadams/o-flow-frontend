import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/libs/hooks";
import { useState } from "react";
import { Fingerprint, Loader2, Shield } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import BiometricsModal from "./BiometricsModal";
import TwoFA from "./TwoFA";
import { toast } from "sonner";

type LoginType = "password" | "biometrics" | "2fa";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();
  const [token, setToken] = useState("");

  const handleOther = async (method: LoginType = "biometrics") => {
    setEmail("admin@oflow.com");
    setPassword("********");
    setTimeout(async () => {
      await _login(method);
    }, 1000);
  };

  const _login = async (method: LoginType) => {
    setToken("");
    setError("");
    try {
      if (method === "2fa") {
        await login({ method: "2fa", code: token });
      } else if (method === "biometrics") {
        await login({ method: "biometrics", bioToken: "123456" });
      } else {
        await login({ method: "password", email, password });
      }
      toast.success("Login successful!");
    } catch (err) {
      console.error(err);
      toast.error(
        "Invalid credentials. Try admin@oflow.com or employee@oflow.com"
      );
      setError(
        "Invalid credentials. Try admin@oflow.com or employee@oflow.com"
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    await _login("password");
  };
  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            "Login"
          )}
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <TwoFA
            pin={token}
            setPin={setToken}
            onSubmit={() => handleOther("2fa")}
          >
            <Button variant="outline" className="w-full" type="button">
              <Shield className="w-4 h-4 mr-2" />
              2FA
            </Button>
          </TwoFA>
          <BiometricsModal handleBiometrics={handleOther}>
            <Button variant="outline" className="w-full">
              <Fingerprint className="w-4 h-4 mr-2" />
              Biometric
            </Button>
          </BiometricsModal>
        </div>
      </div>

      {error && (
        <div className="text-xs text-muted-foreground space-y-1">
          <p>Demo accounts:</p>
          <p>Admin: admin@oflow.com</p>
          <p>Employee: employee@oflow.com</p>
          <p>Password: any</p>
        </div>
      )}
    </form>
  );
}
