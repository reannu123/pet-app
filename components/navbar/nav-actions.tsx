import { UserButton, auth } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bolt, Settings, Settings2, User } from "lucide-react";
import UserNav from "@/components/navbar/user-nav";
import { Button } from "@/components/ui/button";
import { SheetTrigger } from "../ui/sheet";

const NavActions = () => {
  const Auth = auth();
  return (
    <div className="flex space-x-4">
      <div className="ml-auto flex items-center space-x-4">
        {Auth.userId ? <UserButton afterSignOutUrl="/" /> : <UserNav />}
      </div>
      {Auth.userId && (
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-10 w-10 rounded-full"
          >
            <Avatar className="items-center justify-center">
              <Settings2 size={23} />
            </Avatar>
          </Button>
        </SheetTrigger>
      )}
    </div>
  );
};

export default NavActions;
