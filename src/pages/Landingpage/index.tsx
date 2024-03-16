import { UserButton, SignInButton } from "@clerk/clerk-react";
import { Github, Loader } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { useConvexAuth } from "convex/react";
import SwitchTheme from "@/components/switch-theme";
import BgPattern from "./bg-pattern";
import img from "../../assets/bgimage.png";

const Navigation = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute h-full w-screen -z-10">
        <BgPattern gap={10} strokeWidth={0.1} color="#fff" />
      </div>
      <header className="w-full pt-4">
        <div className="flex items-center justify-between px-4 md:px-6 xl:px-8">
          <h1 className="font-Lato font-bold text-3xl italic text-foreground">
            DELA
          </h1>

          <div className="gap-2 flex items-center ">
            {isLoading ? (
              <Loader className="animate-spin" />
            ) : isAuthenticated ? (
              <div className="flex items-center divide-x-2 transition-colors  border-border duration-300 px-2 rounded py-1">
                <Button
                  className="mr-3 rounded h-8 grid place-content-center"
                  variant={"default"}>
                  <Link className="w-full h-full" to={"/today"}>
                    Dashboard
                  </Link>
                </Button>
                <div className="pl-3">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </div>
            ) : (
              <Button className="h-8 rounded">
                <SignInButton mode="modal" />
              </Button>
            )}
            <SwitchTheme />
          </div>
        </div>
      </header>
      <main>
        <div className="flex flex-col items-center justify-center mt-14">
          <div className="flex flex-col gap-6 items-center justify-center">
            <h1 className="text-4xl sm:text-6xl font-Lato font-bold text-foreground flex flex-col justify-start items-start">
              <span>More then just</span>
              <span className="relative after:absolute after:bottom-1 after:-right-6 after:w-5 after:h-5 after:bg-primary after:rounded-full">
                a to-do list
              </span>
              <span />
            </h1>
            <p className=" text-center text-base text-muted-foreground font-Lato max-w-[25rem]">
              Maximize your efficiency with dela. organizing your tasks, events.
            </p>
          </div>
          <div className="flex items-center gap-3 mt-10">
            {isLoading ? (
              <Loader className="animate-spin" />
            ) : isAuthenticated ? (
              <div className="flex items-center transition-colors  border-border duration-300 rounded py-1">
                <Button
                  className="rounded h-8 grid place-content-center"
                  variant={"default"}>
                  <Link className="w-full h-full" to={"/today"}>
                    Dashboard
                  </Link>
                </Button>
              </div>
            ) : (
              <Button className="h-8 rounded">
                <SignInButton mode="modal">Get started</SignInButton>
              </Button>
            )}
            <Button variant={"ghost"} size={"icon"} className="h-8">
              <Link target="_blank" to={"https://github.com/adii1203/dela"}>
                <Github />
              </Link>
            </Button>
          </div>
          <div className="w-[36rem] lg:w-[50rem] overflow-hidden mt-8">
            <img className="w-full" src={img} alt="" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Navigation;
