import Link from "next/link";
import Container from "../ui/container";
import { UserButton, auth } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Settings, User } from "lucide-react";
import UserNav from "./user-nav";
import { Button } from "../ui/button";
import NavActions from "./nav-actions";

export const revalidate = 0;
const Navbar = async () => {
  return (
    <div className="bg-white border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <Link
            href="/"
            className="ml-0 flex lg:ml-0 gap-x-2"
          >
            <p className="font-bold text-xl">PET MANAGER</p>
          </Link>
          <NavActions />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
