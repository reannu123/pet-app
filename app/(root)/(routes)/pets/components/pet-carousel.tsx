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

interface PetsDashboardProps {
  pets: Pet[];
}
type Pet = PetType & {
  images: ImageType[];
};

export function PetCarousel({ pets }: PetsDashboardProps) {
  return (
    <Carousel className="w-full max-w-6xl">
      <CarouselContent>
        {pets.map((pet) => (
          <CarouselItem
            key={pet.id}
            className="md:basis-1/2 lg:basis-1/3"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">
                    <Image
                      src={pet.images[0].imageUrl}
                      width={400}
                      height={400}
                      alt={pet.name}
                      className="aspect-square object-cover rounded-md"
                    />
                    <h1 className="text-2xl">{pet.name}</h1>
                    <p className="text-sm">{pet.description}</p>
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
