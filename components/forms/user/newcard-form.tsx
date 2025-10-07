"use client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import ValidatedInput from "@/components/form-fields/validated/validated-input";
import { toast } from "sonner";
import { handleError } from "@/lib/error";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import ValidatedCreatableSelect from "@/components/form-fields/validated/validated-creatable-select";
import { DEFAULT_OCCASSION_OPTIONS } from "@/constants";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  occasion: z.string().min(2, {
    message: "Occasion must be at least 2 characters.",
  }),
});

export function NewCardForm({
  className,
  close,
  ...props
}: React.ComponentProps<"div"> & { close: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      occasion: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/list`, {
        method: "POST",
        body: JSON.stringify(values),
      });
      const data = await res.json();
      setIsLoading(false);
      toast.success(data.message, {
        action: {
          label: "Add Items to Card",
          onClick: () => router.push(`/user/promise-cards/${data?.list?._id}`),
        },
      });
      form.reset();
      router.refresh();
      close();
    } catch (error) {
      handleError(error);
      setIsLoading(false);
    }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <ValidatedInput
                name="title"
                label="Title"
                placeholder="Enter title"
                control={form.control}
              />
            </Field>
            <Field>
              <ValidatedCreatableSelect
                name="occasion"
                label="Occasion"
                placeholder="Enter occasion"
                control={form.control}
                options={DEFAULT_OCCASSION_OPTIONS}
              />
            </Field>
            <Field className="grid grid-cols-2 gap-4">
              <Field>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="disabled:opacity-50 cursor-pointer"
                >
                  <span>Create Card</span>
                  {isLoading && <Spinner />}
                </Button>
              </Field>
              <Field>
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
              </Field>
            </Field>
          </FieldGroup>
        </form>
      </Form>
    </div>
  );
}
