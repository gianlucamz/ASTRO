import { prisma } from "../lib/prisma.js";

export async function getWishlist(req, res) {
  const wishlist = await prisma.wishlist.findUnique({
    where: { userId: req.userId },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  if (!wishlist) return res.json({ items: [] });

  res.json(wishlist);
}

export async function addToWishlist(req, res) {
  const { productId } = req.body;

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product)
    return res.status(404).json({ error: "Produto não encontrado" });

  let wishlist = await prisma.wishlist.findUnique({
    where: { userId: req.userId },
  });
  if (!wishlist) {
    wishlist = await prisma.wishlist.create({ data: { userId: req.userId } });
  }

  const existingItem = await prisma.wishlistItem.findFirst({
    where: { wishlistId: wishlist.id, productId },
  });

  if (existingItem) {
    return res
      .status(409)
      .json({ error: "Produto já está na lista de desejos" });
  }

  await prisma.wishlistItem.create({
    data: { wishlistId: wishlist.id, productId },
  });

  const updated = await prisma.wishlist.findUnique({
    where: { id: wishlist.id },
    include: { items: { include: { product: true } } },
  });

  res.json(updated);
}

export async function removeFromWishlist(req, res) {
  const { id } = req.params;
  await prisma.wishlistItem.delete({ where: { id } });
  res.status(204).send();
}

export async function clearWishlist(req, res) {
  const wishlist = await prisma.wishlist.findUnique({
    where: { userId: req.userId },
  });
  if (wishlist) {
    await prisma.wishlistItem.deleteMany({
      where: { wishlistId: wishlist.id },
    });
  }
  res.status(204).send();
}
