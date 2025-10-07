"use client"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
export default function Home() {
  const [games, setGames] = useState([]);
  const [newGame, setNewGame] = useState({ name: "", genre: "" });
  useEffect(() => {
    fetch("/api/games")
      .then(res => res.json())
      .then(data => setGames(data));
  }, []);

  async function addGame() {
    const res = await fetch("/api/games", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGame),
    });
    const data = await res.json();
    setGames(prev => [...prev, data]);
    setNewGame({ name: "", genre: "" });
  }

  async function deleteGame(id) {
    await fetch(`/api/games/${id}`, { method: "DELETE" });
    setGames(prev => prev.filter(g => g.id !== id));
  }




  return (
    <>
      <section>
        <main className="flex gap-4 justify-center flex-wrap">
          {games.map(f => (
            <Card className="w-full max-w-md" key={f.id}>
              <CardHeader>
                <CardTitle>{f.name}</CardTitle>
                <CardDescription>{f.genre}</CardDescription>
                <CardAction><img src={f.image} alt="" /></CardAction>
              </CardHeader>
              <CardContent>
                <p>{f.description}</p>
              </CardContent>
              {/* <CardFooter>
                <p>{CardFooter}</p>
              </CardFooter> */}
            </Card>
          ))}

        </main>
      </section>


      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">🎮 GameVault</h2>

        <div className="flex gap-2 mb-4">
          <input
            className="border px-2 py-1 rounded"
            placeholder="Game name"
            value={newGame.name}
            onChange={e => setNewGame({ ...newGame, name: e.target.value })}
          />
          <input
            className="border px-2 py-1 rounded"
            placeholder="Genre"
            value={newGame.genre}
            onChange={e => setNewGame({ ...newGame, genre: e.target.value })}
          />
          <button onClick={addGame} className="bg-blue-600 text-white px-3 py-1 rounded">
            Add
          </button>
        </div>

        {/* <ul className="space-y-2">
          {games.map(g => (
            <li key={g.id} className="bg-gray-800 text-white px-3 py-2 rounded flex justify-between">
              <span>{g.name} — {g.genre}</span>
              <button onClick={() => deleteGame(g.id)} className="text-red-400 hover:text-red-500">Delete</button>
            </li>
          ))}
        </ul> */}
      </div>
    </>
  )
}