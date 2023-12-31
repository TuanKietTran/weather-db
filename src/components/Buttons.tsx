import { type ButtonHTMLAttributes, type DetailedHTMLProps } from "react";
import { type PropSize } from "~/models/Size";

type ButtonProps = {
  size?: PropSize;
  className?: string;
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLElement>, HTMLButtonElement>;

export default function Button({
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const sizeClasses = size === "sm" ? "p-1" : "p-2 font-semibold";

  return (
    <button
      className={`rounded-full bg-blue-500 text-white no-underline transition duration-200 hover:bg-blue-300 disabled:cursor-not-allowed disabled:opacity-50 ${sizeClasses} ${className}`}
      {...props}
    />
  );
}
