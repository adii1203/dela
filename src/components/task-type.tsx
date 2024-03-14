import { Circle, Dot, Minus } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Tasktype = ({
  taskType,
  setTaskType,
}: {
  setTaskType: (type: string) => void;
  taskType: string;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" size={"sm"}>
          {taskType === "todo" ? (
            <Circle size={16} />
          ) : taskType === "dot" ? (
            <Dot size={16} />
          ) : (
            <Minus size={16} />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Task Type</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup onValueChange={(value) => setTaskType(value)}>
          <DropdownMenuRadioItem
            className="pl-2 flex gap-3 capitalize items-center"
            value="todo">
            <Circle size={16} />
            <p>todo</p>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className="pl-2 flex gap-3 capitalize items-center"
            value="dot">
            <Dot size={16} />
            <p>bullet</p>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className="pl-2 flex gap-3 capitalize items-center"
            value="dash">
            <Minus size={16} />
            <p>dash</p>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Tasktype;
