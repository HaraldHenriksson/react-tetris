"use server";

import { getServerUser } from "@/app/lib/user/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const saveGame = async (
  userId: string,
  userEmail: string,
  score: number,
  level: number,
  linesCleared: number
) => {
  let user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        id: userId,
        email: userEmail,
      },
    });
  }

  if (!user) {
    throw new Error("User creation failed");
  }

  return await prisma.game.create({
    data: {
      score,
      level,
      linesCleared,
      userId: user.id,
    },
  });
};

export const fetchGameHistory = async () => {
  const user = await getServerUser();

  if (!user) {
    throw new Error("User not found");
  }

  const games = await prisma.game.findMany({
    where: {
      user: {
        id: user.id,
      },
    },
  });

  return games;
};
