"use client";
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Image as ImageType, Pet as PetType } from "@prisma/client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Edit } from "lucide-react";

interface PetsDashboardProps {
  pets: Pet[];
}
type Pet = PetType & {
  images: ImageType[];
};

export function PetCarousel({ pets }: PetsDashboardProps) {
  const router = useRouter();
  return (
    <Carousel className="w-full max-w-6xl">
      <CarouselContent>
        {pets.map((pet) => (
          <CarouselItem
            key={pet.id}
            className="md:basis-1/2 lg:basis-1/3 hover:scale-105 transition-all cursor-pointer"
          >
            <div className="p-1">
              <div className="flex aspect-square items-center justify-center p-6">
                <span className="text-4xl font-semibold">
                  <Image
                    src={pet.images[0].imageUrl}
                    width={400}
                    height={400}
                    alt={pet.name}
                    className="aspect-square object-cover rounded-md"
                  />
                  <div className="flex justify-between pt-4">
                    <div>
                      <h1 className="text-2xl">{pet.name}</h1>
                      <p className="text-sm">{pet.description}</p>
                    </div>
                    <Button
                      variant={"ghost"}
                      onClick={() => router.push(`/pets/${pet.id}`)}
                    >
                      <Edit />
                    </Button>
                  </div>
                </span>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
