import { prisma } from "../lib/prisma.js";

const FILEIRAS = [
  "destaques",
  "promocoes",
  "hardware",
  "perifericos",
  "computadores",
  "smartphones",
  "games",
  "diversos",
];

function resolveCategories(data) {
  if (data.destaques) {
    const zeroed = Object.fromEntries(
      FILEIRAS.filter((f) => f !== "destaques").map((f) => [f, false]),
    );
    return { ...data, ...zeroed, destaques: true };
  }
  return data;
}

export async function listProducts(req, res) {
  const { fileira, search } = req.query;

  const products = await prisma.product.findMany({
    where: {
      ...(fileira && FILEIRAS.includes(fileira) && { [fileira]: true }),
      ...(search && { name: { contains: search } }),
    },
  });

  res.json(products);
}

export async function getProduct(req, res) {
  const { slug } = req.params;

  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product)
    return res.status(404).json({ error: "Produto não encontrado" });

  res.json(product);
}

export async function createProduct(req, res) {
  const {
    name,
    description,
    price,
    stock,
    imageUrl,
    slug,
    destaques,
    promocoes,
    hardware,
    perifericos,
    computadores,
    smartphones,
    games,
    diversos,
  } = req.body;

  if (!name || price === undefined || !slug)
    return res
      .status(400)
      .json({ error: "name, price e slug são obrigatórios" });

  const exists = await prisma.product.findUnique({ where: { slug } });
  if (exists) return res.status(400).json({ error: "Slug já existe" });

  const data = resolveCategories({
    name,
    description,
    price: Number(price),
    stock: stock ? Number(stock) : 0,
    imageUrl: imageUrl || null,
    slug,
    destaques: Boolean(destaques),
    promocoes: Boolean(promocoes),
    hardware: Boolean(hardware),
    perifericos: Boolean(perifericos),
    computadores: Boolean(computadores),
    smartphones: Boolean(smartphones),
    games: Boolean(games),
    diversos: Boolean(diversos),
  });

  const product = await prisma.product.create({ data });
  res.status(201).json(product);
}

export async function updateProduct(req, res) {
  const { id } = req.params;

  const exists = await prisma.product.findUnique({ where: { id } });
  if (!exists) return res.status(404).json({ error: "Produto não encontrado" });

  if (req.body.slug && req.body.slug !== exists.slug) {
    const slugTaken = await prisma.product.findUnique({
      where: { slug: req.body.slug },
    });
    if (slugTaken) return res.status(400).json({ error: "Slug já existe" });
  }

  const raw = Object.fromEntries(
    ["name", "description", "price", "stock", "imageUrl", "slug", ...FILEIRAS]
      .filter((f) => req.body[f] !== undefined)
      .map((f) => [f, req.body[f]]),
  );

  const data = resolveCategories({ ...exists, ...raw });

  const product = await prisma.product.update({ where: { id }, data });
  res.json(product);
}

export async function deleteProduct(req, res) {
  const { id } = req.params;

  const exists = await prisma.product.findUnique({ where: { id } });
  if (!exists) return res.status(404).json({ error: "Produto não encontrado" });

  await prisma.product.delete({ where: { id } });
  res.status(204).send();
}

export async function getProductById(req, res) {
  const { id } = req.params;

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product)
    return res.status(404).json({ error: "Produto não encontrado" });

  res.json(product);
}
