import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Landing from "@/components/common/Landing";


export default function Home() {
    return (
        <div className="bg-white flex flex-col">
            <div className="flex flex-col relative shrink-0 box-border">
                <Navbar />
                <Landing />
            </div>
            <Footer />
        </div>
    );
}