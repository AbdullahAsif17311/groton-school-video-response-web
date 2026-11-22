import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import VideoResponse from "@/components/VideoResponse";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Closing from "@/components/Closing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <VideoResponse />
        <Marquee />
        <About />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
