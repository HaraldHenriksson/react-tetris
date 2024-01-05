"use server";

import { getServerUser } from "@/app/lib/user/server";
import { PrismaClient } from "@prisma/client";
import { get } from "http";

const prisma = new PrismaClient();

export const saveGame = async (
  userId: string,
  userEmail: string,
  score: number,
  level: number,
  linesCleared: number
) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    const user = await getServerUser();
    await prisma.user.create({
      data: {
        id: userId,
        email: userEmail,
      },
    });
  }

  return await prisma.game.create({
    data: {
      score,
      level,
      linesCleared,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};
