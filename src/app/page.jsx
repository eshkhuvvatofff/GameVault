"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
export default function Home() {
  const [games, setGames] = useState([]);
  const [newGame, setNewGame] = useState({ name: "", genre: "" });
  useEffect(() => {
    fetch("/api/games")
      .then(res => res.json())
      .then(data => setGames(data));
  }, []);

  async function addGame() {

    if (!newGame.name.trim()) {
      return toast.error("sry")
    }


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
      <section className="mt-28">
        <main className="flex gap-4 justify-center flex-wrap">
          {games.map(f => (

            <Card key={f.id} className="w-full max-w-sm bg-[#0b0f19] border border-[#1a2234] rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
              {/* Header */}
              <CardHeader className="px-5 py-4">
                <CardTitle className="text-base font-medium text-gray-100 tracking-wide">
                  {f.name}
                </CardTitle>
                <CardDescription className="text-sm text-gray-400 mt-1 line-clamp-2">
                  {f.description}
                </CardDescription>
              </CardHeader>

              {/* Image */}
              <CardContent className="px-5 pb-3">
                <img
                  src={f.image}
                  alt={f.name}
                  className="w-full cursor-pointer h-36 object-cover rounded-lg border border-[#1c2335] transition-transform duration-300 hover:scale-[1.02]"
                />
              </CardContent>

              {/* Footer */}
              <CardFooter className="flex justify-between items-center px-5 py-3 border-t border-[#1a2234]">
                <span className="text-xs text-gray-500">{f.genre}</span>
                <Button className="bg-[#1e2a48] cursor-pointer hover:bg-[#26345b] text-gray-100 text-sm font-medium px-4 py-1.5 rounded-md transition-colors duration-200">
                  Download
                </Button>
              </CardFooter>
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