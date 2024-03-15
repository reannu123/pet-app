import PetForm from "./components/pet-form";

export default function PetPage() {
  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <PetForm />
        </div>
      </div>
    </>
  );
}
