interface TooltipProps {
  children: React.ReactNode;
  content: string;
  position?: string;
}

export default function Tooltip({
  children,
  content,
  position = "top-12",
}: TooltipProps) {
  return (
    <div className="group relative flex justify-center">
      {children}

      <span
        className={`${position} absolute w-fit scale-0 whitespace-nowrap rounded border border-neutral-600 bg-neutral-900 bg-opacity-70 p-2 text-xs text-neutral-200 shadow-md backdrop-blur-md transition-all group-hover:scale-100`}
      >
        {content}
      </span>
    </div>
  );
}
