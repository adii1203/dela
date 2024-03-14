import { Highlighter } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Id } from "convex/_generated/dataModel";

const HighlightTask = ({
  isHighlited,
  handelHighlight,
  id,
}: {
  isHighlited?: boolean;
  handelHighlight: (args: {
    id: Id<"tasks">;
    highlight: boolean;
    color: string;
  }) => void;
  id: Id<"tasks">;
}) => {
  const color = [
    {
      name: "yellow",
      hex: "#6b6926",
    },
    {
      name: "sea green",
      hex: "#92D6BD",
    },
    {
      name: "purple",
      hex: "#B6A4CC",
    },
    {
      name: "baby blue",
      hex: "#8DD7F2",
    },
    {
      name: "pink",
      hex: "#F59FBC",
    },
    {
      name: "grapefruite",
      hex: "#F7AF97",
    },
    {
      name: "chartreuse",
      hex: "#4c6c2e",
    },
  ];
  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex flex-col items-center justify-between">
          <Button
            variant={"outline"}
            className={isHighlited ? "border-primary" : ""}>
            <Highlighter />
          </Button>
          <p className="capitalize text-muted-foreground">highlight</p>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div>
          <p className="text-muted-foreground text-xs mb-2">Choose color</p>
          <div className="flex gap-2">
            {color.map((c) => (
              <div
                onClick={() => {
                  handelHighlight({ id, highlight: true, color: c.hex });
                }}
                key={c.name}
                className="w-8 h-8 rounded-full cursor-pointer"
                style={{ backgroundColor: c.hex }}></div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default HighlightTask;
