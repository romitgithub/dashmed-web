import { FC } from "react";
import { classNames } from "@/utils/styles";


export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  labelStyles?: string;
  id: string;
}

export const Checkbox: FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled,
  className = "",
  labelStyles = "",
  id,
}) => {
  const handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };
  return (
    <div className={classNames(className, "relative flex items-start w-full")}>
      <div className="flex items-center h-5">
        <input
          id={id}
          aria-describedby="comments-description"
          name={id}
          type="checkbox"
          disabled={disabled}
          checked={checked}
          onChange={handleChange}
          className="focus:ring-0 focus:ring-accent-ring h-4 w-4 text-accent-text border-gray-300 rounded"
        />
      </div>
      <div className="ml-3 text-sm">
        <label
          htmlFor={id}
          className={classNames(labelStyles, "font-medium text-gray-700")}
        >
          {label}
        </label>
        {description ? (
          <span id="description" className="text-gray-500">
            {description}
          </span>
        ) : null}
      </div>
    </div>
  );
};
