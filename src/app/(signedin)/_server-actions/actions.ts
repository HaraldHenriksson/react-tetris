"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const saveGame = async (
  userId: number,
  score: number,
  level: number,
  linesCleared: number
) => {
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
