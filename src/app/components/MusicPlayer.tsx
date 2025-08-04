"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import {
    IoMdPause,
    IoMdPlay,
    IoMdSkipBackward,
    IoMdSkipForward,
    IoMdVolumeHigh,
    IoMdVolumeOff,
} from "react-icons/io";
import { LuRepeat1 } from "react-icons/lu";
import { MdOutlineQueueMusic } from "react-icons/md";

export default function MusicPlayer() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(50);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [previousVolume, setPreviousVolume] = useState(0);

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
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume]);

    return (
        <div className="fixed bottom-0 left-0 w-full bg-black text-gray-100 px-4 py-3 shadow-md z-50">
            <audio src="/audio/audio.mp3" ref={audioRef}></audio>
            <div className="max-w-8xl w-[95%] mx-auto flex items-center justify-between">
                <div className="flex gap-4 items-center">
                    <Image
                        src="/images/cover.png"
                        alt="cover"
                        width={500}
                        height={500}
                        className="w-13 h-13 object-cover rounded-md"
                    />
                    <div className="">
                        <p className="text-gray-100 font-semibold">
                            {"This World"}
                        </p>
                        <p className="text-gray-200 font-normal">
                            {"True Hertz"}
                        </p>
                    </div>
                </div>
                <div className="max-w-[400px] w-full flex items-center flex-col gap-3">
                    <div className="flex gap-4">
                        <button className="text-xl text-gray-200">
                            <IoMdSkipBackward />
                        </button>
                        <button
                            className="bg-white text-xl text-black w-10 h-10 rounded-full grid place-items-center cursor-pointer"
                            onClick={togglePlayButton}
                        >
                            {isPlaying ? <IoMdPause /> : <IoMdPlay />}
                        </button>
                        <button className="text-xl text-gray-200">
                            <IoMdSkipForward />
                        </button>
                    </div>
                    <div className="w-full flex justify-center items-center gap-2">
                        <span className="text-gray-200 font-normal text-sm">
                            {formatTime(currentTime)}
                        </span>
                        <div className="w-full">
                            <input
                                className="w-full outline-none h-1 bg-zinc-700 rounded-md appearance-none accent-white"
                                max={duration}
                                min="0"
                                onChange={(e) => handleSeek(e)}
                                type="range"
                                value={currentTime}
                            />
                        </div>
                        <span className="text-gray-200 font-normal text-sm">
                            {formatTime(duration)}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="text-gray-200 text-xl cursor-pointer">
                        <LuRepeat1 />
                    </button>
                    <button className="text-gray-200 text-xl cursor-pointer">
                        <MdOutlineQueueMusic />
                    </button>
                    <button
                        className="text-gray-200 text-xl cursor-pointer"
                        onClick={toggleMute}
                    >
                        {volume === 0 ? <IoMdVolumeOff /> : <IoMdVolumeHigh />}
                    </button>
                    <input
                        className="w-[100px] outline-none h-1 bg-zinc-700 accent-white appearance-none"
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
