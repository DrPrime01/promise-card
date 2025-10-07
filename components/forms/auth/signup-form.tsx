"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import AppleIcon from "@/components/vectors/apple-icon";
import GoogleIcon from "@/components/vectors/google-icon";
import MetaIcon from "@/components/vectors/meta-icon";
import ValidatedInput from "@/components/form-fields/validated/validated-input";
import Link from "next/link";
import { toast } from "sonner";
import { handleError } from "@/lib/error";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
// import { PASSWORD_REGEX_STRING } from "@/constants";

const formSchema = z
  .object({
    username: z
      .string()
      .min(3, {
        message: "Username must be at least 3 characters.",
      })
      .max(20, {
        message: "Username must be at most 20 characters.",
      }),
    email: z.email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Minimum password length is 8" }),
    // .regex(PASSWORD_REGEX_STRING, {
    //   message:
    //     "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    // })
    confirmPassword: z
      .string()
      .min(8, { message: "Minimum password length is 8" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/signup`, {
        method: "POST",
        body: JSON.stringify(values),
      });
      const data = await res.json();
      setIsLoading(false);
      toast.success(data.message);
      form.reset();
      router.replace("/user");
    } catch (error) {
      console.log(error);
      handleError(error);
      setIsLoading(false);
    }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">Create your account</h1>
                  <p className="text-muted-foreground text-sm text-balance">
                    Enter your email below to create your account
                  </p>
                </div>
                <Field className="gap-4">
                  <ValidatedInput
                    name="email"
                    label="Email"
                    placeholder="user@email.xyz"
                    control={form.control}
                  />
                  <ValidatedInput
                    name="username"
                    label="Username"
                    placeholder="Samu0x"
                    control={form.control}
                  />
                  <Field className="grid grid-cols-2 gap-4">
                    <Field>
                      <ValidatedInput
                        control={form.control}
                        type="password"
                        name="password"
                        label="Password"
                        placeholder="••••••••••"
                      />
                    </Field>
                    <Field>
                      <ValidatedInput
                        control={form.control}
                        type="password"
                        name="confirmPassword"
                        label="Confirm Password"
                        placeholder="••••••••••"
                      />
                    </Field>
                  </Field>
                </Field>
                <Field>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="disabled:opacity-50"
                  >
                    <span>Create Account</span>
                    {isLoading && <Spinner />}
                  </Button>
                </Field>
                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                  Or continue with
                </FieldSeparator>
                <Field className="grid grid-cols-3 gap-4">
                  <Button variant="outline" type="button">
                    <AppleIcon />
                    <span className="sr-only">Sign up with Apple</span>
                  </Button>
                  <Button variant="outline" type="button">
                    <GoogleIcon />
                    <span className="sr-only">Sign up with Google</span>
                  </Button>
                  <Button variant="outline" type="button">
                    <MetaIcon />
                    <span className="sr-only">Sign up with Meta</span>
                  </Button>
                </Field>
                <FieldDescription className="text-center">
                  Already have an account? <Link href="/signin">Sign in</Link>
                </FieldDescription>
              </FieldGroup>
            </form>
          </Form>
          <div className="bg-muted relative hidden md:block">
            <Image
              src={
                "https://images.unsplash.com/photo-1593526613712-7b4b9a707330?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvbWlzZXxlbnwwfHwwfHx8MA%3D%3D"
              }
              fill
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
