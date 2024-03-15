import prismadb from "@/lib/prismadb";
import PetForm from "./components/pet-form";

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
      <div className="flex items-center justify-center p-8 pt-10">
        <PetForm initialData={pet} />
      </div>
    </>
  );
}
