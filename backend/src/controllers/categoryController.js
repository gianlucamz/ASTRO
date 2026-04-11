import { prisma } from '../lib/prisma.js'

export async function listCategories(req, res) {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } }
  })
  res.json(categories)
}

export async function createCategory(req, res) {
  const { name, slug } = req.body

  const exists = await prisma.category.findUnique({ where: { slug } })
  if (exists) return res.status(400).json({ error: 'Slug já existe' })

  const category = await prisma.category.create({ data: { name, slug } })
  res.status(201).json(category)
}

export async function updateCategory(req, res) {
  const { id } = req.params
  const { name, slug } = req.body

  const category = await prisma.category.update({
    where: { id },
    data: { name, slug }
  })
  res.json(category)
}

export async function deleteCategory(req, res) {
  const { id } = req.params
  await prisma.category.delete({ where: { id } })
  res.status(204).send()
}