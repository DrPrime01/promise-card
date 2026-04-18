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

import GoogleIcon from "@/components/vectors/google-icon";
import ValidatedInput from "@/components/form-fields/validated/validated-input";
import Link from "next/link";
import { toast } from "sonner";
import { handleError } from "@/lib/error";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { useUserStore } from "@/store/user-store";
import { signUp } from "@/actions/auth.actions";
import SendMessage from "@/components/vectors/send-message";
import EditIcon from "@/components/vectors/edit-icon";
// import { PASSWORD_REGEX_STRING } from "@/constants";

const formSchema = z
  .object({
    // username: z
    //   .string()
    //   .min(3, {
    //     message: "Username must be at least 3 characters.",
    //   })
    //   .max(20, {
    //     message: "Username must be at most 20 characters.",
    //   }),
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
      // username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const setUser = useUserStore((state) => state.setUser);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const res = await signUp(values);
      if (res?.success) {
        setUser(res?.user);
        toast.success(res?.message);
        form.reset();
        router.replace("/user");
      } else {
        toast.error(res?.message);
      }
      setIsLoading(false);
    } catch (error) {
      handleError(error);
      setIsLoading(false);
    }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 rounded-[12px] border-0">
        <CardContent className="grid p-0 md:grid-cols-2 relative">
          <div className="relative">
            <div className="bg-secondary/80 backdrop-blur-sm hidden relative md:flex size-full z-10 flex-col gap-y-[60px] items-center justify-center">
              <div className="rounded-full w-[9rem] h-[8.25rem] bg-white grid place-items-center">
                <SendMessage />
              </div>
              <div className="flex flex-col text-center gap-y-4">
                <span className="text-accent-red text-4xl leading-10 font-playfair-display italic">
                  A Legacy Awaits
                </span>
                <p className="font-noto-serif text-base leading-[26px] text-brown italic">
                  &quot;Some things are meant to be kept forever. <br /> Start
                  your digital heirloom today.&quot;
                </p>
              </div>
            </div>
            <div className="absolute -right-12 -top-12 bg-[#a62626]/20 rounded-full size-[12rem] z-0"></div>
            <div className="absolute -bottom-12 -left-12 bg-[#cca830]/20 rounded-full size-[12rem] z-0"></div>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-6 md:p-16 z-10 bg-white"
            >
              <FieldGroup>
                <div className="flex flex-col gap-y-4">
                  <span className="text-2xl leading-8 text-accent-red font-playfair-display italic">
                    Promisecard
                  </span>
                  <h1 className="text-dark text-5xl leading-[3rem] font-playfair-display">
                    Join the
                    <br /> Tradition.
                  </h1>
                </div>
                <Field className="gap-6">
                  <ValidatedInput
                    name="email"
                    label="Email Address"
                    placeholder="user@email.xyz"
                    control={form.control}
                  />
                  {/* <ValidatedInput
                    name="username"
                    label="Username"
                    placeholder="Samu0x"
                    control={form.control}
                  /> */}
                  <Field className="grid grid-cols-2 gap-4">
                    <Field>
                      <ValidatedInput
                        control={form.control}
                        type="password"
                        name="password"
                        label="Secret Key"
                        placeholder="••••••••••"
                      />
                    </Field>
                    <Field>
                      <ValidatedInput
                        control={form.control}
                        type="password"
                        name="confirmPassword"
                        label="Confirm Key"
                        placeholder="••••••••••"
                      />
                    </Field>
                  </Field>
                </Field>
                <Field>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="disabled:opacity-50 cursor-pointer hover:bg-accent-red bg-accent-red px-7 py-4 rounded-[6px] border border-dashed border-white/20 outline-4 outline-accent-red text-xl leading-7 font-playfair-display flex items-center gap-x-2 justify-center w-full text-white"
                  >
                    <span>Seal My Promise</span>
                    <EditIcon />
                    {isLoading && <Spinner />}
                  </button>
                </Field>
                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                  Or continue with
                </FieldSeparator>
                <Field className="grid grid-cols-2 gap-4">
                  <Button variant="outline" type="button">
                    <GoogleIcon />
                    <span className="sr-only">Sign up with Google</span>
                  </Button>
                  <Button variant="outline" type="button">
                    Guest sign up
                  </Button>
                </Field>
                <FieldDescription className="text-center text-sm leading-5 text-brown font-inter [&>a]:no-underline [&>a]:hover:!text-accent-red">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-playfair-display text-accent-red font-bold"
                  >
                    Log in
                  </Link>
                </FieldDescription>
              </FieldGroup>
            </form>
          </Form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center [&>a]:hover:!text-dark">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
