import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Flame, Video, Trophy, Zap, Users, Coins } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { CreateRoast } from "@/components/roasts/CreateRoast";
import { RoastFeed } from "@/components/roasts/RoastFeed";
import { CreateDebate } from "@/components/debates/CreateDebate";
import { DebateFeed } from "@/components/debates/DebateFeed";
import { WelcomeTutorial } from "@/components/tutorial/WelcomeTutorial";

const Index = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">The Ultimate Roasting Platform</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Welcome to{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  SeeFinish
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join the most vibrant community for roasting, debates, and epic verbal battles. 
                Earn XP, win prizes, and become a legend.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/auth?tab=signup">
                <Button size="lg" className="animate-pulse-glow">
                  <Flame className="mr-2 h-5 w-5" />
                  Start Roasting
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline" size="lg">
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <Card className="border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Flame className="h-6 w-6 text-secondary" />
                    Epic Roasts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Share your wittiest roasts and engage with the community. 
                    Get likes, comments, and go viral!
                  </p>
                </CardContent>
              </Card>

              <Card className="border-accent/20 hover:border-accent/40 transition-all duration-300 hover:shadow-secondary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-6 w-6 text-accent" />
                    Live Debates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Participate in heated debates with video, audio, or text. 
                    Compete for prizes and audience approval.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-success/20 hover:border-success/40 transition-all duration-300 hover:shadow-success">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-6 w-6 text-success" />
                    Earn & Win
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Gain XP, climb rankings, earn Solana, and unlock exclusive NFT rewards. 
                    Real money, real prizes.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Entry Fee (₦)</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary">10K+</div>
                <div className="text-sm text-muted-foreground">Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">Live</div>
                <div className="text-sm text-muted-foreground">Debates Daily</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-success">₦/SOL</div>
                <div className="text-sm text-muted-foreground">Payouts</div>
              </div>
            </div>
          </div>
        </div>

            {/* Footer Links */}
        <div className="border-t bg-muted/50">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg">SeeFinish</span>
              </div>
              <div className="flex gap-6">
                <Link to="/about" className="text-sm hover:text-primary">About</Link>
                <Link to="/terms" className="text-sm hover:text-primary">Terms of Use</Link>
                <Link to="/privacy" className="text-sm hover:text-primary">Privacy Policy</Link>
                <a href="#" className="text-sm hover:text-primary">Support</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      <WelcomeTutorial />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
          <p className="text-muted-foreground">What's happening in your world today?</p>
        </div>

        <Tabs defaultValue="roasts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="roasts">Roasts</TabsTrigger>
            <TabsTrigger value="debates">Debates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="roasts" className="space-y-6">
            <CreateRoast />
            <RoastFeed />
          </TabsContent>
          
          <TabsContent value="debates" className="space-y-6">
            <CreateDebate />
            <DebateFeed />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
