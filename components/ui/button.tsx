import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
  size?: "default" | "sm";
  asChild?: boolean;
};

export function Button({
  className = "",
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium transition-colors disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    default: "bg-foreground text-background hover:bg-foreground/90",
    outline: "border border-foreground/15 bg-transparent text-foreground hover:bg-foreground/5",
  } as const;

  const sizes = {
    default: "h-10 px-5 text-sm",
    sm: "h-9 px-5 text-sm",
  } as const;

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}
