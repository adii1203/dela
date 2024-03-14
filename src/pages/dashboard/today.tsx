import { Dot, Minus } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import Creat from "@/components/main/Creat";
import { useQuery, useMutation, ReactMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { toast } from "sonner";
import { FunctionReference } from "convex/server";
import TaskOptions from "@/components/task-option";
import { useState } from "react";

interface Task {
  title: string;
  isCompleted: boolean;
  _id: Id<"tasks">;
  bold?: boolean;
  underline?: boolean;
  italic?: boolean;
  highlight?: boolean;
  highlightColor?: string;
  type: string;
}

const Today = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const tasks = useQuery(api.tasks.getAllTask);
  const check = useMutation(api.tasks.markCompleted);
  const [selected, setSelected] = useState<Task | null>(null);

  return (
    <main
      className={cn(
        " bg-background flex-grow pt-3 px-4 ml-10 relative",
        isMobile && "ml-8"
      )}>
      <div className="font-Lato">
        <div className="flex items-center gap-6 capitalize font-bold text-foreground">
          <h1 className="text-5xl">today</h1>
          <span className="outline outline-1 outline-border w-10 h-10 grid place-content-center rounded font-bold text-2xl">
            {tasks?.filter((task) => task.isCompleted === false).length}
          </span>
        </div>
        <Creat />
        <section className="mt-6 mx-auto py-3 max-w-[40rem] px-3 rounded-md border-border border min-h-80 bg-card">
          <ul className="text-card-foreground font-Lato font-semibold">
            {tasks?.length === 0 ? (
              <p>No work for today</p>
            ) : (
              tasks?.map((task) => {
                return (
                  <Task
                    check={check}
                    key={task._id}
                    task={task}
                    setSelected={setSelected}
                  />
                );
              })
            )}
          </ul>
        </section>
      </div>
      {selected?._id && (
        <TaskOptions selected={selected} setSelected={setSelected} />
      )}
    </main>
  );
};

type TaskProps = {
  title: string;
  isCompleted: boolean;
  _id: Id<"tasks">;
  bold?: boolean;
  underline?: boolean;
  italic?: boolean;
  highlight?: boolean;
  highlightColor?: string;
  type: string;
};

const Task = ({
  task,
  check,
  setSelected,
}: {
  task: TaskProps;
  setSelected: React.Dispatch<React.SetStateAction<Task | null>>;
  check: ReactMutation<
    FunctionReference<
      "mutation",
      "public",
      {
        id: Id<"tasks">;
        markAs: boolean;
      },
      null
    >
  >;
}) => {
  const taskTypes: {
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
        viewBox="0 0 24 24"
        className={cn(task.isCompleted && "text-primary")}>
        {task.isCompleted ? (
          <path
            fill="currentColor"
            d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m3.22 6.97l-4.47 4.47l-1.97-1.97a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l5-5a.75.75 0 1 0-1.06-1.06"></path>
        ) : (
          <path
            fill="currentColor"
            d="M12 3.5a8.5 8.5 0 1 0 0 17a8.5 8.5 0 0 0 0-17M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12"></path>
        )}
      </svg>
    ),

    dash: <Minus width={16} />,
    dot: <Dot width={16} />,
  };

  const handelClick = (id: Id<"tasks">, markAs: boolean) => {
    const promise = check({ id, markAs });
    toast.promise(promise, {
      loading: "Loading",
      success: "Success",
      error: "Error",
    });
  };

  return (
    <li className=" hover:bg-secondary mt-2 rounded-md group/task transition-colors duration-300 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 flex-1">
          {task.type === "todo" ? (
            <div
              onClick={() => handelClick(task._id, !task.isCompleted)}
              role="button"
              className="cursor-pointer py-2 px-2 rounded">
              {taskTypes["todo"]}
            </div>
          ) : (
            <div className="px-2 rounded">{taskTypes[task.type]}</div>
          )}
          <div className="w-full">
            <p
              style={{ backgroundColor: task.highlightColor }}
              className={cn(
                " font-[400] px-1 rounded relative w-fit",
                task.bold && "font-bold",
                task.underline && "underline",
                task.italic && "italic",
                task.isCompleted &&
                  "text-card-foreground/50 after:content-[''] after:w-full after:h-[1px] after:left-0 after:bottom-[40%] after:bg-muted-foreground after:absolute"
              )}>
              {task.title}
            </p>
          </div>
        </div>
        <div
          onClick={() => setSelected(task)}
          role="button"
          className="cursor-pointer hover:bg-secondary-foreground/30 py-2 px-2 rounded">
          <Dot
            width={18}
            height={18}
            size={40}
            className="group-hover/task:stroke-[5px] transition-all duration-300"
          />
        </div>
      </div>
    </li>
  );
};

export default Today;
