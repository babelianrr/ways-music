"use client";
import MusicPlayer from "@/app/components/MusicPlayer";
import Navbar from "@/app/components/Navbar";
import Queue from "@/app/components/Queue";
import Sidebar from "@/app/components/Sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";
import { Music } from "../types/musics";

type PlayerContextType = {
    queueModal: boolean;
    setQueueModal: React.Dispatch<React.SetStateAction<boolean>>;
    currentMusic: Music | null;
    setCurrentMusic: React.Dispatch<React.SetStateAction<Music | null>>;
    queue: Music[];
    currentIndex: number;
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
    setQueue: (music: Music[]) => void;
    playNext: () => void;
    playPrevious: () => void;
};

export const PlayerContext = createContext<PlayerContextType | undefined>(
    undefined,
);

export default function FrontendLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const queryClient = new QueryClient();
    const [queueModal, setQueueModal] = useState(false);
    const [currentMusic, setCurrentMusic] = useState<Music | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [queue, setQueue] = useState<Music[]>([]);

    function playNext() {
        if (currentIndex < queue.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        }
    }

    function playPrevious() {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    }

    useEffect(() => {
        if (
            queue.length > 0 &&
            currentIndex >= 0 &&
            currentIndex < queue.length
        ) {
            setCurrentMusic(queue[currentIndex]);
        }
    }, [currentIndex, queue]);

    return (
        <QueryClientProvider client={queryClient}>
            <PlayerContext.Provider
                value={{
                    queueModal,
                    setQueueModal,
                    currentMusic,
                    setCurrentMusic,
                    currentIndex,
                    setCurrentIndex,
                    queue,
                    setQueue,
                    playNext,
                    playPrevious,
                }}
            >
                <div className="min-h-screen">
                    <Navbar />
                    <main>
                        <Sidebar />
                        {currentMusic && <MusicPlayer />}
                        <Queue />
                        {children}
                    </main>
                </div>
            </PlayerContext.Provider>
        </QueryClientProvider>
    );
}
