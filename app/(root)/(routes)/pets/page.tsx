import { Button } from "@/components/ui/button";
import { PetCarousel } from "./components/pet-carousel";
import { redirect, useRouter } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import PetsDashboard from "./components/pets-dashboard";

export default async function Pets() {
  const { userId } = auth();
  if (!userId) {
    redirect("/login");
  }
  const user = await prismadb.user.findUnique({
    where: {
      userId: userId,
    },
    include: {
      pets: {
        include: {
          pet: {
            include: {
              images: true,
            },
          },
        },
      },
    },
  });

  const pets =
    user?.pets?.map((pet) => {
      return {
        ...pet.pet,
      };
    }) || [];

  return (
    <div className="flex flex-col items-center gap-10 py-8">
      <PetsDashboard pets={pets} />
    </div>
  );
}
