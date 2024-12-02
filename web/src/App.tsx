import { Hero } from "./components/Hero.tsx";
import { Feature } from "@/components/Feature.tsx";
import { Topbar } from "@/components/Topbar.tsx";
import { Footer } from "@/components/Footer.tsx";
import { Theme, useTheme } from "react-daisyui";
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
