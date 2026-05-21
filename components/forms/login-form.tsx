"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/mutations/use-login";
import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, CircleAlert } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [employeeData, setEmployeeData] = useState({
    employeeId: "",
    password: "",
  }); // creating the state here

  const loginMutation = useLogin();

  const handleChange = (key: string, value: string) => {
    setEmployeeData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }; // we call it reusable field updater pattern.

  const handleLogin = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault(); // stopping it from reloading
    loginMutation.mutate(employeeData, {
      onSuccess: (data) => {
        setEmployeeData({
          employeeId: "",
          password: "",
        });
        toast.success("Login Successfully", {
          icon: <CheckCircle2 className="text-green-600" />,
        });
      },
      onError: (error) => {
        console.error("Error login Failed");
        toast.error("Login Failed", {
          icon: <CircleAlert className="text-red-600" />,
        });
      },
    });
  };

  return (
    <div className={cn("flex flex-col gap-6 py-10", className)} {...props}>
      <Card className="w-110 px-4 py-12">
        <CardHeader>
          <CardTitle className="text-xl">Login to your account</CardTitle>
          <CardDescription>
            Enter your Employee ID below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Employee ID</FieldLabel>
                <Input
                  id="employeeId"
                  type="text"
                  placeholder="Enter your Employee ID"
                  required
                  className="py-5 rounded-full"
                  value={employeeData.employeeId}
                  onChange={(e) => handleChange("employeeId", e.target.value)}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="Enter your password here"
                  className="py-5 rounded-full"
                  value={employeeData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                />
              </Field>
              <Field>
                <Button
                  className="bg-indigo-900 py-6 hover:bg-indigo-950 rounded-full cursor-pointer"
                  type="submit"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? "Logging In" : "Login"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
