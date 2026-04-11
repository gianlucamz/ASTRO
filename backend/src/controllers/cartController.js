import { prisma } from "../lib/prisma.js";

export async function getCart(req, res) {
  const cart = await prisma.cart.findUnique({
    where: { userId: req.userId },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  if (!cart) return res.json({ items: [], total: 0 });

  const total = cart.items.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  res.json({ ...cart, total });
}

export async function addToCart(req, res) {
  const { productId, quantity } = req.body;

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product)
    return res.status(404).json({ error: "Produto não encontrado" });
  if (product.stock < quantity)
    return res.status(400).json({ error: "Estoque insuficiente" });

  let cart = await prisma.cart.findUnique({ where: { userId: req.userId } });
  if (!cart) {
    cart = await prisma.cart.create({ data: { userId: req.userId } });
  }

  const existingItem = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, productId },
  });

  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity },
    });
  } else {
    await prisma.cartItem.create({
      data: { cartId: cart.id, productId, quantity },
    });
  }

  const updatedCart = await prisma.cart.findUnique({
    where: { id: cart.id },
    include: { items: { include: { product: true } } },
  });

  res.json(updatedCart);
}

export async function updateCartItem(req, res) {
  const { id } = req.params;
  const { quantity } = req.body;

  if (quantity <= 0) {
    await prisma.cartItem.delete({ where: { id } });
    return res.status(204).send();
  }

  const item = await prisma.cartItem.update({
    where: { id },
    data: { quantity },
  });
  res.json(item);
}

export async function removeFromCart(req, res) {
  const { id } = req.params;
  await prisma.cartItem.delete({ where: { id } });
  res.status(204).send();
}

export async function clearCart(req, res) {
  const cart = await prisma.cart.findUnique({ where: { userId: req.userId } });
  if (cart) {
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  }
  res.status(204).send();
}
