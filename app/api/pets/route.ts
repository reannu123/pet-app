import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, description, images, birthday } = body;

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

    const pet = await prismadb.pet.create({
      data: {
        name,
        description,
        birthday,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    await prismadb.userPet.create({
      data: {
        user: {
          connect: {
            id: userByUserId.id,
          },
        },
        pet: {
          connect: {
            id: pet.id,
          },
        },
        role: "OWNER",
        roleId: 1,
      },
    });
    console.log(" [PET_POST]", pet);
    return NextResponse.json(pet);
  } catch (error) {
    console.log(" [PETS_POST]", error);
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

// export async function GET(
//   req: Request,
//   { params }: { params: { storeId: string } }
// ) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const categoryId = searchParams.get("categoryId") || undefined;
//     const colorId = searchParams.get("colorId") || undefined;
//     const sizeId = searchParams.get("sizeId") || undefined;
//     const isFeatured = searchParams.get("isFeatured") || undefined;

//     if (!params.storeId) {
//       return new NextResponse("Store id is required", { status: 400 });
//     }

//     const products = await prismadb.pet.findMany({
//       where: {
//         storeId: params.storeId,
//         categoryId,
//         colorId,
//         sizeId,
//         isFeatured: isFeatured ? true : undefined,
//         isArchived: false,
//       },
//       include: {
//         images: true,
//         category: true,
//         color: true,
//         size: true,
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     return NextResponse.json(products);
//   } catch (error) {
//     console.log(" [PRODUCTS_GET]", error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// }
