import type { ComponentProps } from "react";
import styles from "./Button.module.css";

export type ButtonProps = ComponentProps<"button">;

export function Button({
  children,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  const buttonClassName = [styles.button, className].filter(Boolean).join(" ");

  return (
    <button type={type} className={buttonClassName} {...props}>
      {children}
    </button>
  );
}
