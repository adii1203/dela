import { CornerDownLeft } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "./../../../convex/_generated/api";
import { toast } from "sonner";
import Tasktype from "../task-type";

const Creat = () => {
  const [data, setdata] = useState("");
  const [taskType, setTaskType] = useState("todo");
  const creatTask = useMutation(api.tasks.creatTask);

  const handelTask = () => {
    if (data === "") {
      return;
    }
    const promise = creatTask({
      title: data,
      isCompleted: false,
      type: taskType,
    });
    toast.promise(promise, {
      loading: "Creating...",
      success: "Task created",
      error: "Failed to create task",
    });
    setdata("");
  };

  const handelKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handelTask();
    }
  };

  return (
    <div className="mx-auto max-w-[40rem] mt-8 flex items-center pr-2 border border-border rounded-[0.5rem]">
      <div className="hover:bg-accent p-2 rounded cursor-pointer">
        <Tasktype taskType={taskType} setTaskType={setTaskType} />
      </div>
      <Input
        onKeyDown={handelKeyDown}
        value={data}
        onChange={(e) => setdata(e.target.value)}
        type="text"
        placeholder="Create new task"
        className="border-none font-Lato tracking-widest font-semibold"
      />
      <CornerDownLeft
        onClick={handelTask}
        strokeWidth={1.25}
        className="w-10 rounded cursor-pointer hover:bg-primary/80 bg-primary text-primary-foreground p-1 transition-colors duration-300"
      />
    </div>
  );
};

export default Creat;
