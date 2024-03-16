import { Link2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Id } from "convex/_generated/dataModel";

const AddLink = ({
  Addlink,
  link,
  setLink,
  id,
}: {
  id: Id<"tasks">;
  link: string;
  setLink: (link: string) => void;
  Addlink: (id: Id<"tasks">, url: string) => void;
}) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex flex-col items-center justify-between">
            <Button variant={"outline"}>
              <Link2 />
            </Button>
            <p className="capitalize text-muted-foreground">link</p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Link</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div>
              <p>Link</p>
              <Input value={link} onChange={(e) => setLink(e.target.value)} />
            </div>
            <div className="flex flex-row-reverse items-start justify-between">
              <Button
                onClick={() => {
                  Addlink(id, link);
                }}
                variant={"default"}
                size={"lg"}>
                Save
              </Button>
              <DialogClose asChild>
                <Button variant={"secondary"} size={"lg"}>
                  Close
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddLink;
