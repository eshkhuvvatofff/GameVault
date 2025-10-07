import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/app/data/games.json')

export async function GET() {
    const data = await fs.readFile(filePath, 'utf8')
    const games = JSON.parse(data)
    return NextResponse.json(games)
}


export async function POST(req) {
    try {
      const newGame = await req.json();
      const data = await fs.readFile(filePath, "utf-8");
      const games = JSON.parse(data);
  
      const id = games.length ? games[games.length - 1].id + 1 : 1;
      const game = { id, ...newGame };
  
      games.push(game);
      await fs.writeFile(filePath, JSON.stringify(games, null, 2));
  
      return NextResponse.json(game);
    } catch (err) {
      console.error("POST error:", err);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
  