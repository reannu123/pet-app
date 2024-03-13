import Link from "next/link";
import Container from "./ui/container";
import { UserButton, auth } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "lucide-react";
import UserNav from "./navbar/user-nav";

export const revalidate = 0;
const Navbar = async () => {
  const Auth = auth();
  return (
    <div className="bg-white border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link
            href="/"
            className="ml-0 flex lg:ml-0 gap-x-2"
          >
            <p className="font-bold text-xl">FUR BABY MANAGER</p>
          </Link>
          <div className="ml-auto flex items-center space-x-4">
            {Auth.userId ? <UserButton afterSignOutUrl="/" /> : <UserNav />}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
