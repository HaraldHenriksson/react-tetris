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
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
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

export const fetchGameHistory = async (page = 1) => {
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
    take: 10,
    skip: (page - 1) * 20,
    orderBy: {
      createdAt: "desc",
    },
  });

  return games;
};

export const fetchRecentGames = async () => {
  const recentGames = await prisma.game.findMany({
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });

  return recentGames;
};

export const fetchTopBestGames = async () => {
  const topBestGames = await prisma.game.findMany({
    take: 10,
    orderBy: {
      score: "desc",
    },
    include: {
      user: true,
    },
  });

  return topBestGames;
};
