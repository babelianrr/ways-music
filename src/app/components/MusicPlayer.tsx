"use client";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
    IoMdPause,
    IoMdPlay,
    IoMdSkipBackward,
    IoMdSkipForward,
    IoMdVolumeHigh,
    IoMdVolumeOff,
} from "react-icons/io";
import {
    MdOutlineQueueMusic,
    MdOutlineRepeat,
    MdOutlineRepeatOne,
} from "react-icons/md";
import { PlayerContext } from "../../../layouts/FrontendLayout";

export default function MusicPlayer() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(50);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [previousVolume, setPreviousVolume] = useState(0);
    const [repeatMusic, setRepeatMusic] = useState(false);

    const context = useContext(PlayerContext);

    if (!context) {
        throw new Error("Player context must be within a provider.");
    }

    const {
        queueModal,
        setQueueModal,
        currentMusic,
        queue,
        currentIndex,
        playNext,
        playPrevious,
    } = context;

    const togglePlayButton = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60).toString();
        const seconds = Math.floor(time % 60)
            .toString()
            .padStart(2, "0");

        return `${minutes}:${seconds}`;
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.target.value);

        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        const vol = parseInt(e.target.value);
        setVolume(vol);

        if (audioRef.current) {
            audioRef.current.volume = vol / 100;
        }
    };

    const toggleMute = () => {
        if (volume === 0) {
            setVolume(previousVolume);

            if (audioRef.current) {
                audioRef.current.volume = previousVolume / 100;
            }
        } else {
            setPreviousVolume(volume);
            setVolume(0);

            if (audioRef.current) {
                audioRef.current.volume = 0;
            }
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => {
            setCurrentTime(audio.currentTime);
            setDuration(audio.duration | 0);
        };

        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("loadedmetadata", updateTime);

        return () => {
            audio.removeEventListener("timeupdate", updateTime);
            audio.removeEventListener("loadedmetadata", updateTime);
        };
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume]);

    useEffect(() => {
        const audio = audioRef.current;

        if (!audio || !currentMusic) return;

        const playAudio = async (audio: HTMLAudioElement) => {
            try {
                await audio.play();
                setIsPlaying(true);
            } catch (error) {
                console.log("Music player error:", error);
                setIsPlaying(false);
            }
        };

        playAudio(audio);
    }, [currentMusic]);

    useEffect(() => {
        const audio = audioRef.current;

        if (!audio) return;

        const handleEnded = () => {
            if (repeatMusic) {
                audio.currentTime = 0;
                audio.play();
            } else {
                playNext();
            }
        };

        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("ended", handleEnded);
        };
    }, [playNext, repeatMusic]);

    if (!currentMusic) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full bg-black text-gray-100 px-4 py-3 shadow-md z-50">
            <audio src={currentMusic.audio_url || ""} ref={audioRef}></audio>
            <div className="max-w-8xl w-[95%] mx-auto flex items-center justify-between">
                <div className="flex gap-4 items-center">
                    <Image
                        src={
                            currentMusic.cover_image_url || "/images/cover.png"
                        }
                        alt={`${currentMusic.title} - ${currentMusic.artist}`}
                        width={500}
                        height={500}
                        className="w-13 h-13 object-cover rounded-md"
                    />
                    <div className="w-40">
                        <p className="text-gray-100 font-semibold">
                            {currentMusic.title}
                        </p>
                        <p className="text-gray-200 font-normal">
                            {currentMusic.artist}
                        </p>
                    </div>
                </div>
                <div className="max-w-[400px] w-full flex items-center flex-col gap-3">
                    <div className="flex gap-4">
                        <button
                            disabled={currentIndex > queue.length - 1}
                            onClick={playPrevious}
                            className="text-xl text-gray-100 hover:text-blue-400 disabled:text-gray-500 disabled:cursor-none cursor-pointer"
                        >
                            <IoMdSkipBackward />
                        </button>
                        <button
                            className="bg-gray-100 text-xl text-black w-10 h-10 rounded-full grid place-items-center hover:bg-blue-400 cursor-pointer"
                            onClick={togglePlayButton}
                        >
                            {isPlaying ? <IoMdPause /> : <IoMdPlay />}
                        </button>
                        <button
                            disabled={currentIndex < 0}
                            onClick={playNext}
                            className="text-xl text-gray-100 hover:text-blue-400 disabled:text-gray-500 disabled:cursor-none cursor-pointer"
                        >
                            <IoMdSkipForward />
                        </button>
                    </div>
                    <div className="w-full flex justify-center items-center gap-2">
                        <span className="text-gray-200 font-normal text-sm cursor-default">
                            {formatTime(currentTime)}
                        </span>
                        <div className="w-full">
                            <input
                                className="w-full outline-none h-1 bg-zinc-700 rounded-md appearance-none accent-gray-100 hover:accent-blue-400"
                                max={duration}
                                min="0"
                                onChange={(e) => handleSeek(e)}
                                type="range"
                                value={currentTime}
                            />
                        </div>
                        <span className="text-gray-200 font-normal text-sm cursor-default">
                            {formatTime(duration)}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2 ps-6">
                    <button
                        onClick={() => setRepeatMusic(!repeatMusic)}
                        className={`${repeatMusic ? "text-blue-400" : "text-gray-100"} hover:text-blue-400 text-xl cursor-pointer`}
                    >
                        {repeatMusic ? (
                            <MdOutlineRepeatOne />
                        ) : (
                            <MdOutlineRepeat />
                        )}
                    </button>
                    <button
                        className={`${queueModal ? "text-blue-400" : "text-gray-100"} hover:text-blue-400 text-xl cursor-pointer`}
                        onClick={() => setQueueModal(!queueModal)}
                    >
                        <MdOutlineQueueMusic />
                    </button>
                    <button
                        className="text-gray-100 text-xl cursor-pointer hover:text-blue-400"
                        onClick={toggleMute}
                    >
                        {volume === 0 ? <IoMdVolumeOff /> : <IoMdVolumeHigh />}
                    </button>
                    <input
                        className="w-[100px] outline-none h-1 bg-zinc-700 accent-gray-100 hover:accent-blue-400 appearance-none"
                        min="0"
                        max="100"
                        onChange={(e) => handleVolume(e)}
                        type="range"
                        value={volume}
                    />
                </div>
            </div>
        </div>
    );
}
