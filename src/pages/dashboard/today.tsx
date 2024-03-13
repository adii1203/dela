import { Circle, Dot, Square } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import Creat from "@/components/main/Creat";

const Today = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <main
      className={cn(
        "ml-[16rem] bg-background flex-grow pt-3 px-4",
        isMobile && "ml-8"
      )}>
      <div className="font-Lato">
        <div className="flex items-center gap-6 capitalize font-bold text-foreground">
          <h1 className="text-5xl">today</h1>
          <span className="outline outline-1 outline-border w-10 h-10 grid place-content-center rounded font-bold text-2xl">
            5
          </span>
        </div>
        <Creat />
        <section className="mt-6 mx-auto py-3 max-w-[40rem] px-3 rounded-md border-border border min-h-80 bg-card">
          <ul className="text-card-foreground font-Handlee font-semibold">
            <p>No tasks for today</p>

            {/* {data?.map((item) => {
              return ( */}
            <Task key={"as"} task={"do some work"} isCompleted={true} />
          </ul>
        </section>
      </div>
    </main>
  );
};

const Task = ({
  task,
  isCompleted,
}: {
  task: string;
  isCompleted: boolean;
}) => {
  return (
    <li className=" hover:bg-secondary mt-2 rounded-md group/task transition-colors duration-300 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div role="button" className="cursor-pointer py-2 px-2 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              size="18"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              className={cn(isCompleted && "text-primary")}>
              {isCompleted ? (
                <path
                  fill="currentColor"
                  d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m3.22 6.97l-4.47 4.47l-1.97-1.97a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l5-5a.75.75 0 1 0-1.06-1.06"></path>
              ) : (
                <path
                  fill="currentColor"
                  d="M12 3.5a8.5 8.5 0 1 0 0 17a8.5 8.5 0 0 0 0-17M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12"></path>
              )}
            </svg>
          </div>
          <div>
            <p
              className={
                isCompleted ? "text-card-foreground/50 line-through" : ""
              }>
              {task}
            </p>
          </div>
        </div>
        <div
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
