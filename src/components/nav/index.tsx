import {
  CalendarDays,
  ChevronsLeft,
  ChevronsRight,
  List,
  MenuIcon,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { Button } from "../ui/button";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Nav = () => {
  const [isCollapse, setIsCollapse] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const sideBarRef = useRef<ElementRef<"aside"> | null>(null);
  const { setTheme } = useTheme();

  const handelCollapse = () => {
    if (isCollapse) {
      sideBarRef.current!.style.width = isMobile ? "100%" : "16rem";
      setIsCollapse(!isCollapse);
      return;
    }
    sideBarRef.current!.style.width = "0";
    setTimeout(() => {
      setIsCollapse(!isCollapse);
    }, 300);
  };

  useEffect(() => {
    if (isMobile) {
      sideBarRef.current!.style.width = "0";
      setIsCollapse(true);
    } else {
      sideBarRef.current!.style.width = "16rem";
      setIsCollapse(false);
    }
  }, [isMobile]);

  return (
    <>
      <div
        className={cn(
          "absolute top-3 left-2 z-50 transition-all duration-300",
          !isCollapse && "hidden"
        )}>
        <Button
          onClick={handelCollapse}
          variant={"ghost"}
          size={"icon"}
          className="h-8 w-8 hover:bg-accent">
          <MenuIcon className="text-accent-foreground" />
        </Button>
      </div>

      <aside
        ref={sideBarRef}
        className={cn(
          "w-64 h-screen transition-all duration-300 ease-out overflow-hidden border-r border-r-border fixed",
          isMobile && "py-0 pl-0 w-full fixed inset-0  z-[9999]"
        )}>
        <div className="bg-background h-full rounded-md shadow-xl py-2 font-Lato">
          <div className="items-center justify-between font-bold flex px-3">
            <Button
              onClick={handelCollapse}
              variant={"ghost"}
              size={"icon"}
              className="h-8 w-8 hover:bg-accent">
              {isMobile && !isCollapse ? (
                <X className="text-accent-foreground" />
              ) : (
                <ChevronsLeft className="text-accent-foreground" />
              )}
            </Button>
          </div>
          <div className="mt-6">
            <p className="font-semibold text-lg pl-3 text-foreground">Tasks</p>
            <ul className="mt-3 flex flex-col gap-1">
              <li className="flex items-center gap-4 font-semibold text-sm py-1 px-3 hover:bg-accent rounded cursor-pointer text-foreground">
                <ChevronsRight size={24} />
                <p>Upcoming</p>
              </li>
              <Link to="/task">
                <li className="flex items-center gap-4 font-semibold text-sm py-1 px-3 hover:bg-accent rounded cursor-pointer text-foreground">
                  <List size={24} />
                  <p>Today</p>
                </li>
              </Link>
              <li className="flex items-center gap-4 font-semibold text-sm py-1 px-3 hover:bg-accent rounded cursor-pointer text-foreground">
                <CalendarDays size={24} />
                <p>Calendar</p>
              </li>
            </ul>
          </div>
          <div className="pl-3 mt-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Nav;
