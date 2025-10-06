"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from "@/components/ui/field";
import z from "zod";
import { toast } from "sonner";
import { handleError } from "@/lib/error";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import ValidatedInput from "@/components/form-fields/validated/validated-input";
import AppleIcon from "@/components/vectors/apple-icon";
import GoogleIcon from "@/components/vectors/google-icon";
import MetaIcon from "@/components/vectors/meta-icon";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";

const formSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Minimum password length is 8" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      }
    ),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/login`, {
        method: "POST",
        body: JSON.stringify(values),
      });
      const data = await res.json();
      setIsLoading(false);
      toast.success(data.message);
      form.reset();
      router.replace("/user");
    } catch (error) {
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
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your Promise Card account
                  </p>
                </div>
                <Field>
                  <ValidatedInput
                    name="email"
                    label="Email"
                    placeholder="user@email.xyz"
                    control={form.control}
                  />
                </Field>
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
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="disabled:opacity-50 "
                  >
                    <span>Login</span>
                    {isLoading && <Spinner />}
                  </Button>
                </Field>
                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                  Or continue with
                </FieldSeparator>
                <Field className="grid grid-cols-3 gap-4">
                  <Button variant="outline" type="button">
                    <AppleIcon />
                    <span className="sr-only">Login with Apple</span>
                  </Button>
                  <Button variant="outline" type="button">
                    <GoogleIcon />
                    <span className="sr-only">Login with Google</span>
                  </Button>
                  <Button variant="outline" type="button">
                    <MetaIcon />
                    <span className="sr-only">Login with Meta</span>
                  </Button>
                </Field>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup">Sign up</Link>
                </FieldDescription>
              </FieldGroup>
            </form>
          </Form>
          <div className="bg-muted relative hidden md:block">
            <Image
              src="https://images.unsplash.com/photo-1593526613712-7b4b9a707330?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvbWlzZXxlbnwwfHwwfHx8MA%3D%3D"
              fill
              alt="promise-login"
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
