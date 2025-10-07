import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const filePath = path.join(process.cwd(), "app/data/games.json");


export async function DELETE(req, { params }) {
  const { id } = params;
  const data = await fs.readFile(filePath, "utf-8");
  let games = JSON.parse(data);

  games = games.filter(g => g.id !== Number(id));
  await fs.writeFile(filePath, JSON.stringify(games, null, 2));

  return NextResponse.json({ message: "Game deleted", id });
}
