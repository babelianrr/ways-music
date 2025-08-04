import MusicList from "./components/MusicList";
import MusicPlayer from "./components/MusicPlayer";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export default function Home() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <main>
                <Sidebar />
                <MusicList />
                <MusicPlayer />
            </main>
        </div>
    );
}
