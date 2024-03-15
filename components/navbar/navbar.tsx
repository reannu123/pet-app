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
    <div className="bg-white border-b ">
      <div className="relative flex h-16 items-center mx-auto w-10/12 max-w-7xl">
        <Link
          href="/"
          className="ml-0 flex lg:ml-0 gap-x-2"
        >
          <p className="font-bold text-xl">PET MANAGER</p>
        </Link>
        <NavActions />
      </div>
    </div>
  );
};

export default Navbar;
