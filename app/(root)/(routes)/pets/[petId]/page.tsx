import prismadb from "@/lib/prismadb";
import PetForm from "./components/pet-form";
import Container from "@/components/ui/container";

export default async function PetPage({ params }: { params: { petId: any } }) {
  let pet = null;

  if (params.petId !== "new") {
    pet = await prismadb.pet.findUnique({
      where: {
        id: Number(params.petId),
      },
      include: {
        images: true,
      },
    });
  }

  return (
    <>
      <div className="py-8">
        <Container>
          <PetForm initialData={pet} />
        </Container>
      </div>
    </>
  );
}
