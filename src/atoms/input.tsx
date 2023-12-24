import { classNames } from "utils/styles";

export default function AppInput({
  placeholder,
  type,
  value,
  onChange,
  onKeyDown,
  className = "",
  ...props
}: any) {
  return (
    <input
      type={type || "text"}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className={classNames(
        "text-black py-2.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm",
        className
      )}
      placeholder={placeholder || ""}
      {...props}
    />
  );
}
