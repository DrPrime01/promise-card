"use client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";
import { handleError } from "@/lib/error";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import ValidatedCreatableSelect from "@/components/form-fields/validated/validated-creatable-select";
import { DEFAULT_GIFT_OPTIONS } from "@/constants";

const formSchema = z.object({
  items: z.array(
    z.string().min(2, {
      message: "Occasion must be at least 2 characters.",
    })
  ),
});

export function AddItemsForm({
  itemID,
  className,
  close,
  ...props
}: React.ComponentProps<"div"> & { close: () => void; itemID: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      items: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const items = values?.items?.map((item) => ({ name: item }));
      const res = await fetch(`/api/lists/${itemID}/items`, {
        method: "POST",
        body: JSON.stringify(items),
      });
      const data = await res.json();
      setIsLoading(false);
      toast.success(data.message);
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
              <ValidatedCreatableSelect
                name="items"
                label="Items"
                placeholder="Select or type the items you want"
                control={form.control}
                multiple
                options={DEFAULT_GIFT_OPTIONS}
              />
            </Field>
            <Field className="grid grid-cols-2 gap-4">
              <Field>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="disabled:opacity-50 cursor-pointer"
                >
                  <span>Add Items</span>
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
