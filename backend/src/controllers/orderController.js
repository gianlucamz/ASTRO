import { prisma } from "../lib/prisma.js";

export async function createOrder(req, res) {
  const { addressId } = req.body;

  const cart = await prisma.cart.findUnique({
    where: { userId: req.userId },
    include: { items: { include: { product: true } } },
  });

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ error: "Carrinho vazio" });
  }

  const total = cart.items.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  const order = await prisma.order.create({
    data: {
      userId: req.userId,
      addressId,
      total,
      items: {
        create: cart.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price,
        })),
      },
    },
    include: {
      items: { include: { product: true } },
      address: true,
    },
  });

  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

  res.status(201).json(order);
}

export async function listOrders(req, res) {
  const isAdmin = req.userRole === "admin";

  const orders = await prisma.order.findMany({
    where: isAdmin ? {} : { userId: req.userId },
    include: {
      items: { include: { product: true } },
      address: true,
      user: { select: { id: true, name: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  res.json(orders);
}

export async function getOrder(req, res) {
  const { id } = req.params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: { include: { product: true } },
      address: true,
      user: { select: { id: true, name: true, email: true } },
    },
  });

  if (!order) return res.status(404).json({ error: "Pedido não encontrado" });

  if (req.userRole !== "admin" && order.userId !== req.userId) {
    return res.status(403).json({ error: "Acesso negado" });
  }

  res.json(order);
}

export async function updateOrderStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  const validStatus = ["pending", "paid", "shipped", "delivered", "cancelled"];
  if (!validStatus.includes(status)) {
    return res.status(400).json({ error: "Status inválido" });
  }

  const order = await prisma.order.update({
    where: { id },
    data: { status },
  });

  res.json(order);
}
