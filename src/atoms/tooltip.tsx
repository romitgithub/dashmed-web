import { classNames } from "@/utils/styles";

/**
 *
 * reverse: boolean
 * used to reverse the tooltip position so that the container doesn't overflow
 */

export default function Tooltip({
  children,
  tooltipText = "",
  reverse = false,
}: any) {
  return (
    <div className="cursor-pointer group flex relative">
      {children}
      <span
        className={classNames(
          "z-40 -translate-x-1/2 pointer-events-none group-hover:pointer-events-auto text-sm p-4 w-72 max-h-48 overflow-scroll group-hover:opacity-100 transition-opacity bg-gray-800 text-gray-100 rounded-md absolute left-4 opacity-0 m-4 mx-auto",
          reverse ? "-top-52" : "top-2"
        )}
      >
        {tooltipText}
      </span>
    </div>
  );
}
