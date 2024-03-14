import { Dot, Minus } from "lucide-react";

export const taskTypes: {
  [key: string]: JSX.Element;
} = {
  todo: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      aria-hidden="true"
      role="img"
      width="18"
      height="18"
      viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M12 3.5a8.5 8.5 0 1 0 0 17a8.5 8.5 0 0 0 0-17M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12"></path>
    </svg>
  ),

  dash: <Minus width={16} />,
  dot: <Dot width={16} />,
};
