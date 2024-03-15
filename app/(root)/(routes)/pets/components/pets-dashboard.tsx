"use client";
import { Button } from "@/components/ui/button";
import { PetCarousel } from "./pet-carousel";
import { Image as ImageType, Pet as PetType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/heading";
import { Plus } from "lucide-react";
interface PetsDashboardProps {
  pets: Pet[];
}
type Pet = PetType & {
  images: ImageType[];
};
export default function PetsDashboard({ pets }: PetsDashboardProps) {
  const router = useRouter();
  return (
    <div className="w-5/6 space-y-10">
      <div className="flex items-center justify-between">
        <Heading
          title="Pet Dashboard"
          description="Manage your pets"
        />
        <Button
          className="w-12 h-12 rounded-xl"
          onClick={() => {
            router.push("/pets/new");
          }}
        >
          <Plus />
        </Button>
      </div>

      <div className="flex items-center justify-center">
        {pets.length != 0 ? (
          <>
            <PetCarousel pets={pets.map((pet) => pet)} />
          </>
        ) : (
          <div>No pets found</div>
        )}
      </div>
    </div>
  );
}
