import { Hero } from "./components/Hero.tsx";
import { Feature } from "@/components/Feature.tsx";
import { Organize } from "@/components/Organize.tsx";
import { Topbar } from "@/components/Topbar.tsx";
import { FAQ } from "@/components/FAQ.tsx";
import { Footer } from "@/components/Footer.tsx";
import { ThemeToggler } from "@/components/ThemeToggler.tsx";
import { Theme, useTheme } from "react-daisyui";
import { Works } from "@/components/Works.tsx";
import { Testimonial } from "@/components/Testimonial.tsx";
import { Download } from "@/components/Download.tsx";

function App() {
  const { theme } = useTheme();

  return (
    <>
      <Theme dataTheme={theme}>
        <Topbar />
        <Hero />
        <Feature />
        {/* <Works />
        <Organize />
        <Testimonial />
        <FAQ /> */}
        <Download />
        <Footer />
        {/* <ThemeToggler /> */}
      </Theme>
    </>
  );
}

export default App;
