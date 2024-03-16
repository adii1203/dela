import { Bold, Italic, Underline } from "lucide-react";
import { Button } from "./ui/button";
import { Id } from "convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

import HighlightTask from "./highligth-task";
import AddLink from "./model/add-link";
import { useState } from "react";

type Task = {
  title: string;
  isCompleted: boolean;
  _id: Id<"tasks">;
  bold?: boolean;
  underline?: boolean;
  italic?: boolean;
  highlight?: boolean;
  highlightColor?: string;
  url?: string;
};

const TaskOptions = ({
  selected,
  setSelected,
}: {
  selected: Task;
  setSelected: React.Dispatch<React.SetStateAction<Task | null>>;
}) => {
  const task = useQuery(api.tasks.getTaskById, { id: selected._id });
  const handelBold = useMutation(api.tasks.bold);
  const handelUnderline = useMutation(api.tasks.underline);
  const handelItalic = useMutation(api.tasks.italic);
  const deleteTask = useMutation(api.tasks.deleteTask);
  const handelHighlight = useMutation(api.tasks.highlight);
  const handelLink = useMutation(api.tasks.url);
  const [link, setLink] = useState(selected?.url || "");

  const handelDelete = (id: Id<"tasks">) => {
    const promise = deleteTask({ id });
    toast.promise(promise, {
      loading: "Deleting",
      success: "Success",
      error: "Error",
    });
    setSelected(null);
  };

  const Addlink = async (id: Id<"tasks">, url: string) => {
    const promise = handelLink({ id, url });
    toast.promise(promise, {
      loading: "Adding link",
      success: "Success",
      error: "Error",
    });
    setSelected(null);
  };

  return (
    <div className="border-border border py-3 px-4 rounded max-w-[40rem] mx-auto fixed left-1/2 bottom-4 -translate-x-1/2">
      <div className="flex items-center justify-between pb-2">
        <Button
          onClick={() => handelDelete(task._id)}
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
              handelBold({ id: task?._id, bold: !task?.bold });
              setSelected(null);
            }}
            variant={"outline"}
            className={task?.bold ? "border-primary" : ""}>
            <Bold />
          </Button>
          <p className="capitalize text-muted-foreground">bold</p>
        </div>
        <div className="flex flex-col items-center justify-between">
          <Button
            onClick={() => {
              handelUnderline({
                id: task?._id,
                underline: !task?.underline,
              });
              setSelected(null);
            }}
            variant={"outline"}
            className={task?.underline ? "border-primary" : ""}>
            <Underline />
          </Button>
          <p className="capitalize text-muted-foreground">Underline</p>
        </div>
        <div className="flex flex-col items-center justify-between">
          <Button
            onClick={() => {
              handelItalic({ id: task?._id, italic: !task?.italic });
              setSelected(null);
            }}
            variant={"outline"}
            className={task?.italic ? "border-primary" : ""}>
            <Italic />
          </Button>
          <p className="capitalize text-muted-foreground">Italic</p>
        </div>
        <HighlightTask
          handelHighlight={handelHighlight}
          isHighlited={task?.highlight}
          id={task?._id}
        />
        <AddLink
          Addlink={Addlink}
          id={task?._id}
          link={link}
          setLink={setLink}
        />
      </div>
    </div>
  );
};

export default TaskOptions;
