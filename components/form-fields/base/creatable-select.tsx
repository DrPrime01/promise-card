"use client";

import { useState } from "react";
import { X, Plus, ChevronDown, Check } from "lucide-react"; // Import Check icon
import { cn } from "@/lib/utils";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Field } from "@/components/ui/field";

type Option = { label: string; value: string };

interface CreatableSelectProps {
  options?: Option[];
  multiple?: boolean;
  placeholder?: string;
  value?: string | string[] | null;
  onChange?: (value: string | string[] | null) => void;
}

const defaultOptions: Option[] = [
  { label: "Apple", value: "apple" },
  { label: "Orange", value: "orange" },
  { label: "Mango", value: "mango" },
];

export function CreatableSelect({
  options: initialOptions = defaultOptions,
  multiple = false,
  placeholder = "Select or create...",
  value,
  onChange,
}: CreatableSelectProps) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Option[]>(initialOptions);
  const [input, setInput] = useState("");

  const selectedSingle =
    !multiple && typeof value === "string"
      ? options.find((o) => o.value === value)
      : null;
  const selectedMulti =
    multiple && Array.isArray(value)
      ? options.filter((o) => value.includes(o.value))
      : [];

  const handleSelect = (option: Option) => {
    if (!onChange) return;

    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const isSelected = currentValues.includes(option.value);

      const newValue = isSelected
        ? currentValues.filter((v) => v !== option.value)
        : [...currentValues, option.value];
      onChange(newValue);
    } else {
      onChange(option.value);
      setOpen(false);
    }
  };

  const handleCreate = () => {
    if (!input || !onChange) return;
    const newOption = { label: input, value: input.toLowerCase().trim() };
    setOptions((prev) => [...prev, newOption]);

    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      onChange([...currentValues, newOption.value]);
    } else {
      onChange(newOption.value);
    }
    setInput("");
    setOpen(false);
  };

  // FIX 2: Logic for remove button was subtly flawed. This is the robust way.
  const handleRemove = (optionValue: string) => {
    if (!onChange || !multiple || !Array.isArray(value)) return;
    onChange(value.filter((v) => v !== optionValue));
  };

  return (
    <Field className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          {/* FIX 3: Added h-auto and min-h-10 to allow the button to grow in height */}
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between font-normal h-auto min-h-10"
          >
            <div className="flex flex-wrap gap-1 items-center">
              {multiple ? (
                selectedMulti.length > 0 ? (
                  selectedMulti.map((s) => (
                    <Badge
                      key={s.value}
                      className="flex items-center gap-1"
                      variant="secondary"
                    >
                      {s.label}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemove(s.value);
                        }}
                      />
                    </Badge>
                  ))
                ) : (
                  <span className="text-muted-foreground">{placeholder}</span>
                )
              ) : selectedSingle ? (
                selectedSingle.label
              ) : (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
            </div>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
          {/* FIX 1: Removed shouldFilter={false} to enable default search functionality */}
          <Command>
            <CommandInput
              placeholder="Search or type..."
              value={input}
              onValueChange={setInput}
            />
            <CommandList>
              {input.length > 0 &&
                !options.some(
                  (opt) =>
                    opt.label.toLowerCase() === input.toLowerCase().trim()
                ) && (
                  <CommandItem
                    onSelect={handleCreate}
                    className="cursor-pointer"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create &quot;{input}&quot;
                  </CommandItem>
                )}
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = multiple
                    ? Array.isArray(value) && value.includes(option.value)
                    : value === option.value;
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => handleSelect(option)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </Field>
  );
}
