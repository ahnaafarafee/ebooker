import prisma from "@/prisma/client";

export async function createUser(user: any) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { clerkId: user.clerkId },
    });

    if (existingUser) {
      return null;
    }
    const newUser = await prisma.user.create({ data: user });
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}
export async function updateUser(clerkId: string, userData: any) {
  try {
    const updatedUser = await prisma.user.update({
      where: { clerkId },
      data: userData,
    });
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    console.log(error);
  }
}
export async function deleteUser(clerkId: string) {
  try {
    await prisma.user.delete({
      where: { clerkId },
    });
  } catch (error) {
    console.log(error);
  }
}
