import { prisma } from "../lib/prisma.js";

export async function getReviews(req, res) {
  const { productId } = req.params;
  const skip = parseInt(req.query.skip) || 0;
  const limit = parseInt(req.query.limit) || 3;
  const userId = req.userId || null;

  let userReview = null;
  if (userId) {
    userReview = await prisma.review.findUnique({
      where: { userId_productId: { userId, productId } },
      include: { user: { select: { id: true, name: true } } },
    });
  }

  const where = {
    productId,
    ...(userId && { userId: { not: userId } }),
  };

  const [reviews, aggregate] = await Promise.all([
    prisma.review.findMany({
      where,
      include: { user: { select: { id: true, name: true } } },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.review.aggregate({
      where: { productId },
      _avg: { rating: true },
      _count: true,
    }),
  ]);

  const average = aggregate._avg.rating
    ? Math.round(aggregate._avg.rating * 10) / 10
    : 0;

  res.json({
    reviews,
    total: aggregate._count,
    average,
    userReview,
  });
}

export async function createReview(req, res) {
  const { productId, rating, comment } = req.body;

  if (!productId || !rating || !comment)
    return res
      .status(400)
      .json({ error: "productId, rating e comment são obrigatórios" });

  if (rating < 1 || rating > 5)
    return res.status(400).json({ error: "Rating deve ser entre 1 e 5" });

  try {
    const review = await prisma.review.create({
      data: {
        rating: parseFloat(rating),
        comment,
        userId: req.userId,
        productId,
      },
      include: { user: { select: { id: true, name: true } } },
    });
    res.status(201).json(review);
  } catch (err) {
    if (err.code === "P2002")
      return res.status(400).json({ error: "Você já avaliou este produto" });
    throw err;
  }
}

export async function updateReview(req, res) {
  const { id } = req.params;
  const { rating, comment } = req.body;

  const review = await prisma.review.findUnique({ where: { id } });
  if (!review)
    return res.status(404).json({ error: "Avaliação não encontrada" });
  if (review.userId !== req.userId)
    return res
      .status(403)
      .json({ error: "Você não pode editar esta avaliação" });

  if (rating && (rating < 1 || rating > 5))
    return res.status(400).json({ error: "Rating deve ser entre 1 e 5" });

  const updated = await prisma.review.update({
    where: { id },
    data: {
      ...(rating && { rating: parseFloat(rating) }),
      ...(comment && { comment }),
    },
    include: { user: { select: { id: true, name: true } } },
  });
  res.json(updated);
}

export async function deleteReview(req, res) {
  const { id } = req.params;

  const review = await prisma.review.findUnique({ where: { id } });
  if (!review)
    return res.status(404).json({ error: "Avaliação não encontrada" });
  if (review.userId !== req.userId)
    return res
      .status(403)
      .json({ error: "Você não pode excluir esta avaliação" });

  await prisma.review.delete({ where: { id } });
  res.status(204).send();
}
