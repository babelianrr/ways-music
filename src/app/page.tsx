import FrontendLayout from "../../layouts/FrontendLayout";
import MusicList from "./components/MusicList";

export default function Home() {
    return (
        <FrontendLayout>
            <div className="min-h-screen">
                <MusicList />
            </div>
        </FrontendLayout>
    );
}
