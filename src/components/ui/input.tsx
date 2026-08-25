import type {
  InputHTMLAttributes,
  LabelHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

const field =
  "h-11 w-full rounded-md bg-paper px-3 text-base text-ink shadow-[var(--shadow-border)] placeholder:text-dust focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(field, className)} {...props} />;
}

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn(field, "pr-8", className)} {...props} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(field, "h-auto min-h-28 py-3 leading-normal", className)}
      {...props}
    />
  );
}

export function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("mb-1.5 block text-sm font-medium text-ink-soft", className)}
      {...props}
    />
  );
}
