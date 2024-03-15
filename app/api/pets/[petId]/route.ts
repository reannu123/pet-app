import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function DELETE(
  req: Request,
  { params }: { params: { petId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const userByUserId = await prismadb.user.findFirst({
      where: {
        userId,
      },
    });

    if (!userByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    // find pet by id where the user is the owner
    const pet = await prismadb.pet.findFirst({
      where: {
        id: Number(params.petId),
        owner: {
          some: {
            userId: userByUserId.id,
            role: "OWNER",
            roleId: 1,
          },
        },
      },
    });

    if (!pet) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await prismadb.pet.delete({
      where: {
        id: pet.id,
      },
    });

    console.log(" [PET_DELETE]", pet);
    return NextResponse.json(pet);
  } catch (error) {
    console.log(" [PETS_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
