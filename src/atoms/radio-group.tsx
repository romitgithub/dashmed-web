import { RadioGroup } from "@headlessui/react";
import { classNames } from "utils/styles";

export default function AppRadioGroup({ options, selected, onChange }: any) {
  return (
    <RadioGroup value={selected} onChange={onChange}>
      <RadioGroup.Label className="sr-only">Privacy option</RadioGroup.Label>
      <div className="-space-y-px rounded-md bg-white">
        {options.map((option: any, optionIdx: number) => (
          <RadioGroup.Option
            key={option.name}
            value={option}
            disabled={option.disabled}
            className={({ checked }) =>
              classNames(
                optionIdx === 0 ? "rounded-tl-md rounded-tr-md" : "",
                optionIdx === options.length - 1
                  ? "rounded-bl-md rounded-br-md"
                  : "",
                checked
                  ? "z-10 border-indigo-200 bg-indigo-50"
                  : "border-gray-200",
                option.disabled
                  ? "cursor-not-allowed opacity-40"
                  : "cursor-pointer",
                "relative flex cursor-pointer border p-4 focus:outline-none"
              )
            }
          >
            {({ active, checked }) => (
              <>
                <span
                  className={classNames(
                    checked
                      ? "bg-secondary border-transparent"
                      : "bg-white border-gray-300",
                    active ? "ring-2 ring-offset-2 ring-secondary" : "",
                    "mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center"
                  )}
                  aria-hidden="true"
                >
                  <span className="rounded-full bg-white w-1.5 h-1.5" />
                </span>
                <span className="ml-3 flex flex-col">
                  <RadioGroup.Label
                    as="span"
                    className={classNames(
                      checked ? "text-secondary-dark" : "text-gray-900",
                      "block text-sm font-medium"
                    )}
                  >
                    {option.name}
                  </RadioGroup.Label>
                  <RadioGroup.Description
                    as="span"
                    className={classNames(
                      checked ? "text-secondary" : "text-gray-500",
                      "block text-sm"
                    )}
                  >
                    {option.description}
                  </RadioGroup.Description>
                </span>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
