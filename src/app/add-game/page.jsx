"use client"

import { Button } from "@/components/ui/button";
import { Card, Skeleton } from "@heroui/react";
import { useEffect, useState } from "react";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { toast } from "react-toastify";

export default function AddGame() {
    const [loading, setLoading] = useState(true);
    const [games, setGames] = useState([]);
    const [newGame, setNewGame] = useState({ name: "", genre: "" });
    useEffect(() => {
        fetch("/api/games")
            .then(r => r.json())
            .then(d => setGames(d))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/api/games")
            const data = await res.json()
            setGames(data)
        }
        fetchData()


        const dataInterval = setInterval(fetchData, 2000)
        return () => clearInterval(dataInterval)
    }, [])

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
        try {
            await fetch(`/api/games/${id}`, { method: "DELETE" });
            setGames(prev => prev.filter(g => g.id !== id));
        } catch (error) {
            console.error("Error deleting game:", error);
        }
    }
    return (
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
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="border border-blue-600/40 text-blue-400 hover:bg-blue-600/10 transition-colors duration-200"
                    >
                        + Add Game
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[550px] h-[520px] bg-[#0a0f1a] border border-blue-900/40 text-gray-100 rounded-2xl shadow-[0_0_25px_-5px_rgba(0,0,0,0.6)]">
                    <DialogHeader className="pb-4 border-b border-blue-900/40">
                        <DialogTitle className="text-xl font-semibold text-blue-400">
                            Add New Game
                        </DialogTitle>
                        <DialogDescription className="text-sm text-gray-400">
                            Fill in the details below to add a new game to the library.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={(e) => {
                        e.preventDefault();
                        addGame()
                    }} className="flex flex-col justify-between h-full pt-4">
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name" className="text-gray-300">Name</Label>
                                <input
                                    id="name"
                                    name="name"
                                    className="bg-[#111827] border border-blue-800/40 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-gray-100 placeholder-gray-500 rounded-lg"
                                    placeholder="E.g. Hollow Knight"
                                    value={newGame.name}
                                    onChange={e => setNewGame({ ...newGame, name: e.target.value })}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="genre" className="text-gray-300">Genre</Label>
                                <input
                                    id="genre"
                                    name="genre"
                                    className="bg-[#111827] border border-blue-800/40 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-gray-100 placeholder-gray-500 rounded-lg"
                                    placeholder="E.g. Action RPG"
                                    value={newGame.genre}
                                    onChange={e => setNewGame({ ...newGame, genre: e.target.value })}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="image" className="text-gray-300">Image URL</Label>
                                <input
                                    id="image"
                                    name="image"
                                    className="bg-[#111827] border border-blue-800/40 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-gray-100 placeholder-gray-500 rounded-lg"
                                    placeholder="https://cdn.steamstatic.com/..."
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description" className="text-gray-300">Description</Label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows="3"
                                    className="bg-[#111827] border border-blue-800/40 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-gray-100 placeholder-gray-500 rounded-lg p-2 resize-none"
                                    placeholder="Short description..."
                                />
                            </div>
                        </div>

                        <DialogFooter className="pt-4 border-t border-blue-900/40">
                            <DialogClose asChild>
                                <Button
                                    variant="outline"
                                    className="border cursor-pointer border-blue-800/40 text-gray-300 hover:bg-blue-800/10"
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                            <button
                                type="submit"
                                className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-medium px-5"
                            >
                                Save Game
                            </button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>


            <main className="flex gap-8 justify-center flex-wrap">
                {/* AGAR LOADING HOLATI */}
                {loading ? (
                    // Skeleton placeholderlari (masalan 3 ta card ko‘rsatadi)
                    Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton
                            key={i}
                            classNames={{
                                base: "w-[350px] h-[370px] rounded-md bg-gray-200/40 dark:bg-[#1a2234]/40",
                            }}
                        >
                            <section
                                className="w-[350px] h-[370px] rounded-md bg-white dark:bg-[#0c0f15] border border-gray-200 dark:border-[#1a2234]
             overflow-hidden shadow-lg dark:shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
                            >
                                {/* Image skeleton */}
                                <Skeleton className="w-full h-[180px] skeleton-shimmer">
                                    <div className="w-full h-full bg-default-300" />
                                </Skeleton>

                                {/* Info skeleton */}
                                <div className="p-5 border-t border-gray-200 dark:border-[#151b28] space-y-3">
                                    <Skeleton className="h-5 w-2/3 rounded-lg skeleton-shimmer">
                                        <div className="h-5 w-full rounded-lg bg-default-200" />
                                    </Skeleton>
                                    <Skeleton className="h-3 w-full rounded-lg skeleton-shimmer">
                                        <div className="h-3 w-full rounded-lg bg-default-200" />
                                    </Skeleton>
                                    <Skeleton className="h-3 w-5/6 rounded-lg skeleton-shimmer">
                                        <div className="h-3 w-full rounded-lg bg-default-200" />
                                    </Skeleton>
                                </div>

                                {/* Footer skeleton */}
                                <div className="flex justify-between items-center px-5 py-4 border-t border-gray-200 dark:border-[#151b28]">
                                    <Skeleton className="h-4 w-20 rounded-full skeleton-shimmer">
                                        <div className="h-4 w-full rounded-full bg-default-200" />
                                    </Skeleton>
                                    <div className="flex gap-2">
                                        <Skeleton className="h-8 w-24 rounded-md skeleton-shimmer">
                                            <div className="h-8 w-full rounded-md bg-default-300" />
                                        </Skeleton>
                                    </div>
                                </div>
                            </section>
                        </Skeleton>

                    ))
                ) : games.length === 0 ? (
                    // DATA NOT FOUND QISMI
                    <div className="flex flex-col items-center justify-center w-full py-16">
                        <div className="text-center">
                            <div className="mb-4">
                                <svg
                                    className="mx-auto h-16 w-16 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1}
                                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-300 mb-2">
                                Data not found
                            </h3>
                            <p className="text-sm text-gray-500">
                                No games have been added yet. Add your first game to get started!
                            </p>
                        </div>
                    </div>
                ) : (
                    // ASL GAMES MAP QISMI
                    games.map((f) => (
                        <section
                            key={f.id}
                            className="w-[350px] h-[370px] rounded-md bg-white dark:bg-[#0c0f15] border  dark:border-[#1a2234]
              overflow-hidden shadow-lg dark:shadow-[0_2px_12px_rgba(0,0,0,0.35)]
              transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_6px_20px_rgba(0,0,0,0.45)]"
                        >
                            {/* Image */}
                            <div className="w-full h-[180px] bg-gray-50 dark:bg-[#10141c] overflow-hidden">
                                <img
                                    src={f.image}
                                    alt={f.name}
                                    className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                                />
                            </div>

                            {/* Info */}
                            <div className="p-5 border-t border-gray-200 dark:border-[#151b28] transition-colors duration-300">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 transition-colors duration-300">
                                    {f.name}
                                </h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-snug line-clamp-2 transition-colors duration-300">
                                    {f.description}
                                </p>
                            </div>

                            {/* Footer */}
                            <div className="flex justify-between items-center px-5 py-4 border-t border-gray-200 dark:border-[#151b28]">
                                <span className="text-[13px] text-blue-600 dark:text-blue-400 tracking-wider transition-all duration-300 hover:text-blue-500 dark:hover:text-blue-300">
                                    {f.genre}
                                </span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            deleteGame(f.id);
                                            toast("Deleted", { type: "error" });
                                        }}
                                        className="px-4 py-1.5 cursor-pointer text-[15px] rounded bg-red-600 dark:bg-[#7d0505] text-white
                    hover:bg-red-700 dark:hover:bg-red-700 transition-all duration-300 hover:scale-[1.05] active:scale-95"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </section>
                    ))
                )}
            </main>
        </div>
    )
}