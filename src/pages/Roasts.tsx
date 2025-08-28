import { CreateRoast } from "@/components/roasts/CreateRoast";
import { RoastFeed } from "@/components/roasts/RoastFeed";

const Roasts = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Roasts</h1>
          <p className="text-muted-foreground">Share your wittiest roasts and engage with the community</p>
        </div>
        
        <CreateRoast />
        <RoastFeed />
      </div>
    </div>
  );
};

export default Roasts;