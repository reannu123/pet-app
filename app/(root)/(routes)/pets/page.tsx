import { Button } from "@/components/ui/button";
import { PetCarousel } from "./components/pet-carousel";
import { redirect, useRouter } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import PetsDashboard from "./components/pets-dashboard";
import Container from "@/components/ui/container";

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
    <div className="py-8">
      <Container>
        <PetsDashboard pets={pets} />
      </Container>
    </div>
  );
}
