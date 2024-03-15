"use client";
import { Button } from "@/components/ui/button";
import { PetCarousel } from "./pet-carousel";
import { Image as ImageType, Pet as PetType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/heading";
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

      <Button
        variant={"outline"}
        onClick={() => {
          router.push("/pets/new");
        }}
      >
        Add Pet
      </Button>
    </div>
  );
}
