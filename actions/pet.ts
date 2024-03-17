import prismadb from "@/lib/prismadb";
interface addPetProps {
  userId: string;
  name: string;
  imageUrl: string;
}

export function addUser({ userId, name, imageUrl }: addPetProps) {
  const user = prismadb.user.create({
    data: {
      userId,
      name,
      imageUrl,
    },
  });

  return user;
}

export function deleteUser({ userId }: { userId: string }) {
  const user = prismadb.user.findFirst({
    where: {
      userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return prismadb.user.delete({
    where: {
      userId,
    },
  });
}
