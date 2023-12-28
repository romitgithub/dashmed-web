import { FC, HTMLAttributes, HTMLProps } from "react";
import Link from "next/link";
import Spinner from "./spinner";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  href?: string;
  label?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

export const Button: FC<ButtonProps> = ({ href = "", ...props }) => {
  if (href?.startsWith("http"))
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        <Btn {...props} />
      </a>
    );
  else if (href)
    return (
      <Link className={props.disabled ? "disabled" : ""} href={href} passHref>
        {/* <a className={props.disabled ? "disabled" : ""}> */}
        <Btn {...props} />
        {/* </a> */}
      </Link>
    );
  return <Btn {...props} />;
};

function Btn({ children, label, isLoading = false, ...props }: ButtonProps) {
  return (
    <button {...props}>
      {isLoading ? <Spinner /> : null}
      {label} {children}
    </button>
  );
}
