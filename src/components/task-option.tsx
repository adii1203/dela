import { Bold, Italic, Underline } from "lucide-react";
import { Button } from "./ui/button";
import { Id } from "convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

import HighlightTask from "./highligth-task";

type Task = {
  title: string;
  isCompleted: boolean;
  _id: Id<"tasks">;
  bold?: boolean;
  underline?: boolean;
  italic?: boolean;
  highlight?: boolean;
  highlightColor?: string;
};

const TaskOptions = ({
  selected,
  setSelected,
}: {
  selected: Task;
  setSelected: React.Dispatch<React.SetStateAction<Task | null>>;
}) => {
  const handelBold = useMutation(api.tasks.bold);
  const handelUnderline = useMutation(api.tasks.underline);
  const handelItalic = useMutation(api.tasks.italic);
  const deleteTask = useMutation(api.tasks.deleteTask);
  const handelHighlight = useMutation(api.tasks.highlight);

  const handelDelete = (id: Id<"tasks">) => {
    const promise = deleteTask({ id });
    toast.promise(promise, {
      loading: "Deleting",
      success: "Success",
      error: "Error",
    });
    setSelected(null);
  };

  return (
    <div className="border-border border py-3 px-4 rounded max-w-[40rem] mx-auto fixed left-1/2 bottom-4 -translate-x-1/2">
      <div className="flex items-center justify-between pb-2">
        <Button
          onClick={() => handelDelete(selected._id)}
          variant={"destructive"}
          className="text-destructive-foreground">
          Delete
        </Button>
        <Button
          onClick={() => setSelected(null)}
          variant={"default"}
          className="border-border">
          Close
        </Button>
      </div>
      <div className="flex gap-3">
        <div className="flex flex-col items-center justify-between">
          <Button
            onClick={() => {
              handelBold({ id: selected._id, bold: !selected.bold });
              setSelected(null);
            }}
            variant={"outline"}
            className={selected.bold ? "border-primary" : ""}>
            <Bold />
          </Button>
          <p className="capitalize text-muted-foreground">bold</p>
        </div>
        <div className="flex flex-col items-center justify-between">
          <Button
            onClick={() => {
              handelUnderline({
                id: selected._id,
                underline: !selected.underline,
              });
              setSelected(null);
            }}
            variant={"outline"}
            className={selected.underline ? "border-primary" : ""}>
            <Underline />
          </Button>
          <p className="capitalize text-muted-foreground">Underline</p>
        </div>
        <div className="flex flex-col items-center justify-between">
          <Button
            onClick={() => {
              handelItalic({ id: selected._id, italic: !selected.italic });
              setSelected(null);
            }}
            variant={"outline"}
            className={selected.italic ? "border-primary" : ""}>
            <Italic />
          </Button>
          <p className="capitalize text-muted-foreground">Italic</p>
        </div>

        <HighlightTask
          handelHighlight={handelHighlight}
          isHighlited={selected.highlight}
          id={selected._id}
        />
      </div>
    </div>
  );
};

export default TaskOptions;
