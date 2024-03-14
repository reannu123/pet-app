"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SideForm } from "./sideform";
import { Accordion } from "../ui/accordion";
import { useRouter } from "next/navigation";

export function Sidebar() {
  const router = useRouter();
  return (
    <>
      <SheetContent className="rounded-l-lg">
        <SheetHeader>
          <SheetTitle>Developer Settings</SheetTitle>
          <SheetDescription>
            Test changes using these settings. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-4">
          <SheetClose asChild>
            <Button
              onClick={() => router.push(`/pets`)}
              className="w-full justify-center text-md"
              variant={"outline"}
            >
              Add Pet
            </Button>
          </SheetClose>
        </div>
        <div className="grid gap-4 py-4">
          <SideForm />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </>
  );
}
