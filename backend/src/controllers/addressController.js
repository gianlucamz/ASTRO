import { prisma } from "../lib/prisma.js";

export async function listAddresses(req, res) {
  const addresses = await prisma.address.findMany({
    where: { userId: req.userId },
  });
  res.json(addresses);
}

export async function createAddress(req, res) {
  const { street, number, complement, city, state, zipCode } = req.body;

  const address = await prisma.address.create({
    data: {
      street,
      number,
      complement,
      city,
      state,
      zipCode,
      userId: req.userId,
    },
  });
  res.status(201).json(address);
}

export async function deleteAddress(req, res) {
  const { id } = req.params;
  await prisma.address.delete({ where: { id } });
  res.status(204).send();
}
