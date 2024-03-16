const BgPattern = ({
  color,
  strokeWidth,
  gap,
  transform,
}: {
  color?: string;
  strokeWidth?: number;
  gap?: number;
  transform?: {
    x: number;
    y: number;
    k: number;
  };
}) => {
  const { x, y, k } = transform || { x: 0, y: 0, k: 1 };
  const scaleGap = (gap || 15) * k;
  const patternId = `bg-pattern-${color || "gray"}`;
  return (
    <svg className="w-full h-full">
      <pattern
        id={patternId}
        x={x % scaleGap}
        y={y % scaleGap}
        width={scaleGap}
        height={scaleGap}
        patternUnits="userSpaceOnUse">
        <path
          className="stroke-muted-foreground/50"
          //   stroke={color || "#dddddd"}
          strokeWidth={strokeWidth || 1}
          d={`M${scaleGap / 2} 0 V${scaleGap} M0 ${scaleGap / 2} H${scaleGap}`}
        />
      </pattern>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill={`url(#${patternId})`}
      />{" "}
    </svg>
  );
};

export default BgPattern;
