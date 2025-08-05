"use client";
import MusicPlayer from "@/app/components/MusicPlayer";
import Navbar from "@/app/components/Navbar";
import Queue from "@/app/components/Queue";
import Sidebar from "@/app/components/Sidebar";
import { createContext, useState } from "react";

type PlayerContextType = {
    queueModal: boolean;
    setQueueModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PlayerContext = createContext<PlayerContextType | undefined>(
    undefined,
);

export default function FrontendLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [queueModal, setQueueModal] = useState(false);

    return (
        <PlayerContext.Provider
            value={{
                queueModal,
                setQueueModal,
            }}
        >
            <div className="min-h-screen">
                <Navbar />
                <main>
                    <Sidebar />
                    <MusicPlayer />
                    <Queue />
                    {children}
                </main>
            </div>
        </PlayerContext.Provider>
    );
}
