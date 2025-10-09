"use client"

import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@heroui/react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@heroui/skeleton";
import { useEffect, useState } from "react";
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card";
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
    const [isLoaded, setIsLoaded] = useState(false);

    const toggleLoad = () => {
        setIsLoaded(!isLoaded);
    };


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
                {games.map(f => (

                    // <Card key={f.id} className="w-full max-w-sm bg-[#0b0f19] border border-[#1a2234] rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                    //     <CardHeader className="px-5 py-4">
                    //         <CardTitle className="text-base font-medium text-gray-100 tracking-wide">
                    //             {f.name}
                    //         </CardTitle>
                    //         <CardDescription className="text-sm text-gray-400 mt-1 line-clamp-2">
                    //             {f.description}
                    //         </CardDescription>
                    //     </CardHeader>

                    //     <CardContent className="px-5 pb-3">
                    //         <img
                    //             src={f.image}
                    //             alt={f.name}
                    //             className="w-full cursor-pointer h-36 object-cover rounded-lg border border-[#1c2335] transition-transform duration-300 hover:scale-[1.02]"
                    //         />
                    //     </CardContent>

                    //     <CardFooter className="flex justify-between items-center px-5 py-3 border-t border-[#1a2234]">
                    //         <span className="text-xs text-gray-500">{f.genre}</span>
                    //         <div className="flex gap-2">
                    //             <Button onClick={() => deleteGame(f.id)} className="bg-[#7f0c03] cursor-pointer hover:bg-[#8b1e13] text-gray-100 text-sm font-medium px-4 py-1.5 rounded-md transition-colors duration-200">
                    //                 Delete
                    //             </Button>
                    //             <Button className="bg-[#1e2a48] cursor-pointer hover:bg-[#26345b] text-gray-100 text-sm font-medium px-4 py-1.5 rounded-md transition-colors duration-200">
                    //                 Download
                    //             </Button>
                    //         </div>
                    //     </CardFooter>
                    // </Card>


                    <section key={f.id} className="w-[350px] h-[370px] rounded-md bg-[#0c0f15] border border-[#1a2234] overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
                        {/* Image */}
                        <div className="w-full h-[180px] bg-[#10141c]">
                            <img
                                src={f.image}
                                alt={f.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Info */}
                        <div className="p-5 border-t border-[#151b28]">
                            <h2 className="text-lg font-semibold text-gray-100 mb-2">{f.name}</h2>
                            <p className="text-sm text-gray-400 leading-snug line-clamp-2">
                                {f.description}
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-between items-center px-5 py-4 border-t border-[#151b28]">
                            <span className="text-[13px] text-blue-400  tracking-wider">
                                {f.genre}
                            </span>
                            <div className="flex gap-2">
                                <button 
                                onClick={deleteGame}
                                className="px-4 py-1.5 cursor-pointer text-[15px] rounded bg-[#7d0505] text-gray-300 hover:text-white transition-colors">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </section>






                    // <Card className="w-[200px] space-y-5 p-4" radius="lg">
                    //     <Skeleton className="rounded-lg">
                    //         <div className="h-24 rounded-lg bg-default-300" />
                    //     </Skeleton>
                    //     <div className="space-y-3">
                    //         <Skeleton className="w-3/5 rounded-lg">
                    //             <div className="h-3 w-3/5 rounded-lg bg-default-200" />
                    //         </Skeleton>
                    //         <Skeleton className="w-4/5 rounded-lg">
                    //             <div className="h-3 w-4/5 rounded-lg bg-default-200" />
                    //         </Skeleton>
                    //         <Skeleton className="w-2/5 rounded-lg">
                    //             <div className="h-3 w-2/5 rounded-lg bg-default-300" />
                    //         </Skeleton>
                    //     </div>
                    // </Card>

                ))}
            </main>
        </div>
    )
}