import { FC, HTMLAttributes } from "react";
import Link from "next/link";
import Spinner from "./spinner";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  href?: string;
  label?: string;
  disabled?: boolean;
  isLoading?: boolean;
  spinnerColor?: string;
}

export const Button: FC<ButtonProps> = ({ href = "", ...props }) => {
  if (href?.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        <Btn {...props} />
      </a>
    );
  } else if (href) {
    return (
      <Link href={href} passHref>
        <Btn {...props} />
      </Link>
    );
  }
  return <Btn {...props} />;
};

function Btn({ children, label, isLoading = false, spinnerColor, ...props }: ButtonProps) {
  return (
    <button {...props}>
      {isLoading ? <Spinner color={spinnerColor} /> : null}
      {label} {children}
    </button>
  );
}
