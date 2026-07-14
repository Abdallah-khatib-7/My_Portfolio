import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Work from "./components/Work";
import Stack from "./components/Stack";
import GithubStats from "./components/GithubStats";
import Currently from "./components/Currently";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="bg-bg min-h-screen">
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Work />
      <Stack />
      <GithubStats />
      <Currently />
      <Contact />
    </div>
  );
}

export default App;
