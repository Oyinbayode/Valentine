import ProposalCard from "@/components/proposal/ProposalCard";
import FloatingHearts from "@/components/effects/FloatingHearts";

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden px-0 py-8 sm:py-12">
      <FloatingHearts />
      <ProposalCard />
    </main>
  );
}
