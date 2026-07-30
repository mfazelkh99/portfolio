import Header from "@/components/layout/Header";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Projects from "@/sections/Projects";

export default function Home() {
    return (
        <>
            <Header />
            <Hero />
            <About />
            <Skills />
            <Projects />
        </>
    );
}