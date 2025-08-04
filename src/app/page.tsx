import MusicList from "./components/MusicList";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export default function Home() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <main>
                <Sidebar />
                <MusicList />
            </main>
        </div>
    );
}
