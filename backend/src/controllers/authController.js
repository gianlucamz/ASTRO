import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";

export async function register(req, res) {
  const { name, email, password, cpf, cnpj, telefone, nascimento } = req.body;

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return res.status(400).json({ error: "Email já cadastrado" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      cpf: cpf || null,
      cnpj: cnpj || null,
      telefone: telefone || null,
      nascimento: nascimento || null,
    },
  });

  res.status(201).json({ id: user.id, name: user.name, email: user.email });
}

export async function login(req, res) {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: "Credenciais inválidas" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Credenciais inválidas" });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
}

export async function getUsers(req, res) {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true },
  });

  res.json(users);
}

export async function getUserById(req, res) {
  const { id } = req.params;

  const where = Number.isInteger(Number(id)) ? { id: Number(id) } : { id };

  const user = await prisma.user.findUnique({
    where,
    select: { id: true, name: true, email: true, role: true },
  });

  if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

  res.json(user);
}

export async function updateUser(req, res) {
  const { id } = req.params;
  const { name, email, telefone, nascimento, cpf, cnpj, password } = req.body;

  const data = {};
  if (name) data.name = name;
  if (email) data.email = email;
  if (telefone !== undefined) data.telefone = telefone;
  if (nascimento !== undefined) data.nascimento = nascimento;
  if (cpf !== undefined) data.cpf = cpf || null;
  if (cnpj !== undefined) data.cnpj = cnpj || null;
  if (password) data.password = await bcrypt.hash(password, 10);

  const user = await prisma.user.update({
    where: { id },
    data,
    select: { id: true, name: true, email: true, role: true },
  });

  res.json(user);
}

export async function deleteUser(req, res) {
  const { id } = req.params;
  await prisma.user.delete({ where: { id } });
  res.status(204).send();
}
