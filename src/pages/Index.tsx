import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { LoadingScreen } from "@/components/LoadingScreen";
import Product from "@/components/Product";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <div className="min-h-screen bg-[#1A1F2C] text-white overflow-hidden">
        <Navigation />
        <main>
          <div id="home"><Hero /></div>
          <div id="about"><About /></div>
          <div id="products"><Product /></div>
          <div id="projects"><Projects /></div>
          <div id="contact"><Contact /></div>
        </main>
      </div>
    </>
  );
}
