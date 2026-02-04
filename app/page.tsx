import ProposalCard from "@/components/proposal/ProposalCard";
import FloatingHearts from "@/components/effects/FloatingHearts";
import AudioProvider from "@/components/effects/AudioProvider";

export default function Home() {
  return (
    <AudioProvider>
      <main className="relative min-h-screen flex items-center justify-center overflow-hidden px-0 py-8 sm:py-12">
        <FloatingHearts />
        <ProposalCard />
      </main>
    </AudioProvider>
  );
}
