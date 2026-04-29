import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";

export async function register(req, res) {
  const { name, email, password } = req.body;

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return res.status(400).json({ error: "Email já cadastrado" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashed },
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

  // Support numeric or string-based IDs: try number if it looks numeric
  const where = Number.isInteger(Number(id)) ? { id: Number(id) } : { id };

  const user = await prisma.user.findUnique({
    where,
    select: { id: true, name: true, email: true, role: true },
  });

  if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

  res.json(user);
}
