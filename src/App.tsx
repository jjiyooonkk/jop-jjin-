import { BibleVerse } from "./components/BibleVerse";
import { BackgroundEffects } from "./components/BackgroundEffects";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden relative">
      <BackgroundEffects />
      <div className="relative z-10">
        <BibleVerse />
      </div>
      <Toaster />
    </div>
  );
}