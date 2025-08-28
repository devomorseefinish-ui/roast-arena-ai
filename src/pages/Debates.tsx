import { CreateDebate } from "@/components/debates/CreateDebate";
import { DebateFeed } from "@/components/debates/DebateFeed";

const Debates = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Debates</h1>
          <p className="text-muted-foreground">Participate in heated debates and compete for prizes</p>
        </div>
        
        <CreateDebate />
        <DebateFeed />
      </div>
    </div>
  );
};

export default Debates;