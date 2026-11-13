import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-none border px-2 py-0.5 font-mono text-xs font-semibold uppercase tracking-wider transition-colors select-none",
  {
    variants: {
      variant: {
        operational:
          "border-border bg-surface-subtle text-success [&>span]:bg-success",
        warning:
          "border-border bg-surface-subtle text-warning [&>span]:bg-warning",
        error:
          "border-border bg-surface-subtle text-error [&>span]:bg-error",
        info:
          "border-border bg-surface-subtle text-info [&>span]:bg-info",
        neutral:
          "border-border bg-surface-subtle text-foreground [&>span]:bg-muted",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  withDot?: boolean;
}

function Badge({ className, variant, withDot = true, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {withDot && <span className="h-1.5 w-1.5 rounded-none shrink-0" aria-hidden="true" />}
      <span>{children}</span>
    </div>
  );
}

export { Badge, badgeVariants };
