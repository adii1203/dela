import {
  CalendarDays,
  ChevronsLeft,
  ChevronsRight,
  List,
  MenuIcon,
  X,
} from "lucide-react";
import { Button } from "../ui/button";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import SwitchTheme from "../switch-theme";

type NavItems = {
  name: string;
  icon: React.ReactNode;
  path: string;
};

const Nav = () => {
  const [isCollapse, setIsCollapse] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const sideBarRef = useRef<ElementRef<"aside"> | null>(null);
  const { user } = useUser();

  const [active, setActive] = useState<string>("/today");
  const navList: NavItems[] = [
    {
      name: "Upcoming",
      icon: <ChevronsRight size={24} />,
      path: "/upcoming",
    },
    {
      name: "Today",
      icon: <List size={24} />,
      path: "/today",
    },
    {
      name: "Calendar",
      icon: <CalendarDays size={24} />,
      path: "/calendar",
    },
  ];

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
          "w-64 h-screen transition-all duration-300 ease-out overflow-hidden border-r border-r-border z-[999] relative",
          isMobile && "py-0 pl-0 w-full fixed inset-0  z-[99]"
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
            <div className="flex items-center w-fit mx-auto rounded gap-3 px-3 py-2 hover:bg-accent">
              <p>{user?.fullName}</p>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
          <div className="mt-6">
            <p className="font-semibold text-lg pl-3 text-foreground">Tasks</p>
            <ul className="mt-3 flex flex-col gap-1">
              {navList.map((item) => {
                return (
                  <li
                    key={item.path}
                    onClick={() => {
                      setActive(item.path);
                      if (isMobile) {
                        handelCollapse();
                      }
                    }}>
                    <Link
                      className={cn(
                        "flex w-full items-center gap-4 font-semibold text-sm py-1 px-3 hover:bg-muted transition-colors duration-300 cursor-pointer text-accent-foreground",
                        active === item.path && "bg-accent"
                      )}
                      to={item.path}>
                      {item.icon}
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <SwitchTheme className="pl-3 pt-2" />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Nav;
