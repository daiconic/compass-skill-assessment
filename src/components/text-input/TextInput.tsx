import type { ComponentProps, ReactNode } from "react";
import styles from "./TextInput.module.css";

export type TextInputProps = ComponentProps<"input"> & {
  endAdornment?: ReactNode;
};

export function TextInput({
  className,
  endAdornment,
  ...props
}: TextInputProps) {
  const inputClassName = [styles.input, className].filter(Boolean).join(" ");

  return (
    <div className={styles.field}>
      <input className={inputClassName} {...props} />
      {endAdornment ? (
        <div className={styles.endAdornment}>{endAdornment}</div>
      ) : null}
    </div>
  );
}
