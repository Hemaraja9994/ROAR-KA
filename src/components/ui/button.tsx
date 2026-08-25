import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-[transform,background-color,color,box-shadow,opacity] duration-150 ease-out disabled:pointer-events-none disabled:opacity-50 active:not-disabled:scale-[0.96]",
  {
    variants: {
      variant: {
        default: "bg-teal text-paper shadow-[var(--shadow-border)] hover:bg-teal-2",
        secondary: "bg-surface text-ink shadow-[var(--shadow-border)] hover:bg-paper-2",
        outline: "bg-transparent text-ink shadow-[var(--shadow-border)] hover:bg-paper-2",
        ghost: "bg-transparent text-ink-soft hover:bg-paper-2 hover:text-ink",
        danger: "bg-refer text-paper hover:opacity-90",
      },
      size: {
        sm: "h-10 rounded-sm px-3 text-sm",
        md: "h-11 rounded-md px-4 text-sm",
        lg: "h-12 rounded-md px-5 text-base",
        xl: "h-14 rounded-lg px-6 text-base",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
