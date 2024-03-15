"use client";
import { Button } from "@/components/ui/button";
import { PetCarousel } from "./components/pet-carousel";
import { useRouter } from "next/navigation";

export default function Pets() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center gap-10 py-8">
      <Button
        variant={"outline"}
        onClick={() => router.push(`pets/new`)}
      >
        Add Pet
      </Button>
      <div>Pet Dashboard</div>
      <div>
        <PetCarousel />
      </div>
    </div>
  );
}
