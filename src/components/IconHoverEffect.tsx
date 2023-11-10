import { type ReactNode } from "react";

type IconHoverEffectProps = {
  children: ReactNode;
  className?: string;
};

export function IconHoverEffect({
  children,
  className = "",
}: IconHoverEffectProps) {
  const colorChange =
    "outline-gray-400 hover:bg-gray-200 group-hover-bg-gray-200 group-focus-visible:bg-gray-200 focus-visible:bg-gray-200";
  return (
    <div
      className={`rounded-full p-2 transition-colors duration-200 ${colorChange} ${className}`}
    >
      {children}
    </div>
  );
}
