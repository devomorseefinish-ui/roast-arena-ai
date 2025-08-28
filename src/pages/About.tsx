import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Flame, 
  Video, 
  Trophy, 
  Zap, 
  Users, 
  Coins, 
  Target,
  Mic,
  Camera,
  MessageSquare,
  Award,
  Wallet
} from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const features = [
    {
      icon: <Flame className="h-8 w-8 text-secondary" />,
      title: "Epic Roasts",
      description: "Share your wittiest roasts, engage with the community, and build your reputation as a master roaster."
    },
    {
      icon: <Video className="h-8 w-8 text-accent" />,
      title: "Live Debates",
      description: "Participate in heated debates with video, audio, or text. Compete head-to-head for prizes and glory."
    },
    {
      icon: <Trophy className="h-8 w-8 text-success" />,
      title: "Earn Rewards",
      description: "Gain XP, climb rankings, earn real money in Naira and Solana, and unlock exclusive NFT rewards."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Community",
      description: "Connect with fellow roasters and debaters. Follow your favorites and build your own fanbase."
    },
    {
      icon: <Wallet className="h-8 w-8 text-warning" />,
      title: "Crypto Integration",
      description: "Built on Solana blockchain with seamless wallet integration for secure and fast transactions."
    },
    {
      icon: <Target className="h-8 w-8 text-info" />,
      title: "Skill-Based Matching",
      description: "Get matched with opponents of similar skill levels for fair and competitive debates."
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Sign Up & Connect",
      description: "Create your account and connect your Solana wallet to start earning.",
      icon: <Users className="h-6 w-6" />
    },
    {
      step: 2,
      title: "Create Content",
      description: "Post roasts, join debates, or organize your own debate tournaments.",
      icon: <MessageSquare className="h-6 w-6" />
    },
    {
      step: 3,
      title: "Engage & Compete",
      description: "Like, comment, debate, and compete with other community members.",
      icon: <Target className="h-6 w-6" />
    },
    {
      step: 4,
      title: "Earn & Win",
      description: "Accumulate XP, win debates, and earn real money and exclusive rewards.",
      icon: <Award className="h-6 w-6" />
    }
  ];

  const stats = [
    { label: "Active Users", value: "10K+", icon: <Users className="h-5 w-5" /> },
    { label: "Daily Debates", value: "500+", icon: <Video className="h-5 w-5" /> },
    { label: "Roasts Posted", value: "50K+", icon: <Flame className="h-5 w-5" /> },
    { label: "Total Payouts", value: "₦2M+", icon: <Coins className="h-5 w-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">About SeeFinish</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Where Words{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Become Weapons
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            SeeFinish is the ultimate platform for verbal warriors. Engage in epic roasting battles, 
            participate in intense debates, and earn real rewards for your wit and skill.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth?tab=signup">
              <Button size="lg" className="animate-pulse-glow">
                <Flame className="mr-2 h-5 w-5" />
                Join the Battle
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" size="lg">
                Explore Platform
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-2 text-primary">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything You Need to{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Dominate
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <Card key={index} className="relative">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mx-auto mb-4">
                    {item.icon}
                  </div>
                  <Badge variant="outline" className="mb-2">Step {item.step}</Badge>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Debate Types */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Debate{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Formats
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic className="h-6 w-6 text-accent" />
                  Audio Debates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Voice-only debates where your words and delivery matter most. Perfect for those who want to focus on verbal skills.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Real-time</Badge>
                  <Badge variant="outline">Timed rounds</Badge>
                  <Badge variant="outline">Audience voting</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-6 w-6 text-secondary" />
                  Video Debates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Full video debates where presence, charisma, and visual communication play a role. The ultimate test of debate skills.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">HD streaming</Badge>
                  <Badge variant="outline">Recording</Badge>
                  <Badge variant="outline">Live audience</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  Text Debates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Written debates for those who prefer to craft their arguments carefully. Great for detailed, thoughtful discussions.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Turn-based</Badge>
                  <Badge variant="outline">Character limits</Badge>
                  <Badge variant="outline">Threaded replies</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-success" />
                  Tournament Mode
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Multi-round tournaments with elimination brackets. Compete against multiple opponents for the ultimate prize.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Elimination</Badge>
                  <Badge variant="outline">Big prizes</Badge>
                  <Badge variant="outline">Leaderboards</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-primary text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Show Your Skills?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of verbal warriors earning real money through wit and skill.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth?tab=signup">
                <Button size="lg" variant="secondary">
                  <Zap className="mr-2 h-5 w-5" />
                  Start Earning Today
                </Button>
              </Link>
              <Link to="/explore">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
                  Explore Content
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;