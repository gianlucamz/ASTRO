import { prisma } from "../lib/prisma.js";

export async function listProducts(req, res) {
  const { category, search } = req.query;

  const products = await prisma.product.findMany({
    where: {
      ...(category && { category: { slug: category } }),
      ...(search && { name: { contains: search } }),
    },
    include: { category: true },
  });
  res.json(products);
}

export async function getProduct(req, res) {
  const { slug } = req.params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!product)
    return res.status(404).json({ error: "Produto não encontrado" });
  res.json(product);
}

export async function createProduct(req, res) {
  const { name, description, price, stock, imageUrl, slug, categoryId } =
    req.body;

  const exists = await prisma.product.findUnique({ where: { slug } });
  if (exists) return res.status(400).json({ error: "Slug já existe" });

  const product = await prisma.product.create({
    data: { name, description, price, stock, imageUrl, slug, categoryId },
    include: { category: true },
  });
  res.status(201).json(product);
}

export async function updateProduct(req, res) {
  const { id } = req.params;
  const data = req.body;

  const product = await prisma.product.update({
    where: { id },
    data,
    include: { category: true },
  });
  res.json(product);
}

export async function deleteProduct(req, res) {
  const { id } = req.params;
  await prisma.product.delete({ where: { id } });
  res.status(204).send();
}
