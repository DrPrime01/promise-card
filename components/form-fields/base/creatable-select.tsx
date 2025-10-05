"use client";

import { useState } from "react";
import { X, Plus, ChevronDown } from "lucide-react";
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

  // ✅ DERIVE state directly from props instead of using useState
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
      const currentValues = selectedMulti.map((s) => s.value);
      const newValueObjects = currentValues.includes(option.value)
        ? selectedMulti.filter((s) => s.value !== option.value)
        : [...selectedMulti, option];

      onChange(newValueObjects.map((s) => s.value));
    } else {
      // Call onChange with the single new value
      onChange(option.value);
      setOpen(false);
    }
  };

  const handleCreate = () => {
    if (!input || !onChange) return;
    const newOption = { label: input, value: input.toLowerCase() };
    setOptions([...options, newOption]);

    if (multiple) {
      onChange([...selectedMulti.map((s) => s.value), newOption.value]);
    } else {
      onChange(newOption.value);
    }

    setInput("");
    setOpen(false);
  };

  const handleRemove = (optionValue: string) => {
    if (!onChange || !multiple) return;
    const currentValues = selectedMulti.map((s) => s.value);
    onChange(currentValues.filter((v) => v !== optionValue));
  };
  return (
    <Field className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between font-normal"
          >
            {multiple ? (
              selectedMulti.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {selectedMulti.map((s) => (
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
                  ))}
                </div>
              ) : (
                placeholder
              )
            ) : selectedSingle ? (
              selectedSingle.label
            ) : (
              placeholder
            )}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[320px] p-0">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search or type..."
              value={input}
              onValueChange={setInput}
              className="outline-none font-normal"
            />
            <CommandList>
              {input.length > 0 &&
                !options.some(
                  (option) => option.label.toLowerCase() === input.toLowerCase()
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
                {options
                  .filter(
                    (option) =>
                      !selectedMulti.some((s) => s.value === option.value)
                  )
                  .map((option) => (
                    <CommandItem
                      key={option.value}
                      onSelect={() => handleSelect(option)}
                    >
                      {multiple && (
                        <span
                          className={cn(
                            "mr-2 inline-block h-3 w-3 rounded-sm border",
                            selectedMulti.some((s) => s.value === option.value)
                              ? "bg-primary"
                              : "bg-transparent"
                          )}
                        />
                      )}
                      {option.label}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </Field>
  );
}
