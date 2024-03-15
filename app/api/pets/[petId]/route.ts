import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { petId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, description, images } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("At least one image is required", {
        status: 400,
      });
    }

    const userByUserId = await prismadb.user.findFirst({
      where: {
        userId,
      },
    });

    if (!userByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

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

    await prismadb.pet.update({
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
      data: {
        name,
        description,
        images: {
          deleteMany: {},
        },
      },
    });

    const updatedPet = await prismadb.pet.update({
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
      data: {
        name,
        description,
        images: {
          createMany: {
            data: images.map((image: { url: string }) => image),
          },
        },
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json(updatedPet);
  } catch (error) {
    console.log("[PET_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

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
