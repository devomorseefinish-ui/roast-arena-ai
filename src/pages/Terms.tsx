import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Gavel, Coins, Zap, Video, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-center mb-2">Terms of Use</h1>
          <p className="text-center text-muted-foreground">
            Last updated: January 27, 2025
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                Platform Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Welcome to <strong>SeeFinish</strong>, a social roasting and debate platform where users can engage in respectful roasting, participate in live debates, follow other users, and earn rewards through our XP system.
              </p>
              <p>
                By accessing or using SeeFinish, you agree to be bound by these Terms of Use and all applicable laws and regulations.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                User Conduct & Content Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Acceptable Roasting:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Keep roasts creative and witty, not personally malicious</li>
                  <li>No harassment, bullying, or threats</li>
                  <li>Respect debate rules set by organizers</li>
                  <li>Follow community guidelines and moderator instructions</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Prohibited Content:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Hate speech, discrimination, or incitement to violence</li>
                  <li>Spam, misleading content, or impersonation</li>
                  <li>Copyright infringement or unauthorized content</li>
                  <li>Adult content or content harmful to minors</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gavel className="h-5 w-5 text-purple-500" />
                Debate System & Live Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Debate Participation:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Debaters must follow agreed-upon rules and time limits</li>
                  <li>Judges' decisions are final and binding</li>
                  <li>No disruption of live events by audience members</li>
                  <li>All debates are recorded and may be shared publicly</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Scheduling & Rules:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Organizers can set custom rules (e.g., no swear words)</li>
                  <li>Scheduled events must be honored by participants</li>
                  <li>Entry fees are non-refundable once event begins</li>
                  <li>Violation of debate rules may result in disqualification</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-yellow-500" />
                Payment Terms & Monetization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Accepted Payments:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Nigerian Naira (NGN) - minimum 500 NGN</li>
                  <li>Solana (SOL) - automatic conversion rates apply</li>
                  <li>All transactions are processed securely via smart contracts</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Revenue Distribution:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Platform commission: Variable percentage per event</li>
                  <li>Judges receive payment from audience entry fees</li>
                  <li>Debaters earn based on performance and audience tips</li>
                  <li>Users can tip debaters and judges during events</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-orange-500" />
                XP System & NFT Rewards
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Experience Points (XP):</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Earn XP through participation, wins, and community engagement</li>
                  <li>XP determines ranking and unlock special features</li>
                  <li>XP cannot be transferred between accounts</li>
                  <li>Violations may result in XP penalties</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">NFT Rewards:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Special NFTs awarded for achievements and milestones</li>
                  <li>NFTs are minted on Solana blockchain</li>
                  <li>Users retain ownership of earned NFTs</li>
                  <li>Platform reserves right to issue commemorative NFTs</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5 text-red-500" />
                Content Recording & Viral Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Recording & Content Rights:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>All live events are automatically recorded</li>
                  <li>Platform may create clips from reactions and highlights</li>
                  <li>Viral content may be featured on landing page</li>
                  <li>Users grant platform rights to use recorded content for promotion</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Privacy Controls:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Users can disable notifications for specific content</li>
                  <li>Private debates available for premium users</li>
                  <li>Users can request content removal under certain conditions</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-indigo-500" />
                Wallet Integration & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Solana Wallet Connection:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Each user maintains their own Solana wallet account</li>
                  <li>Platform does not store private keys</li>
                  <li>Users responsible for wallet security and seed phrase protection</li>
                  <li>Smart contract interactions require user approval</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Authentication Methods:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Email/password authentication</li>
                  <li>Google OAuth integration</li>
                  <li>Twitter/X OAuth integration</li>
                  <li>Solana wallet connection</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Separator />

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Account Termination</h3>
                <p className="text-sm">
                  We reserve the right to suspend or terminate accounts that violate these terms. 
                  Users may appeal termination decisions through our support system.
                </p>
                
                <h3 className="text-lg font-semibold">Changes to Terms</h3>
                <p className="text-sm">
                  We may update these terms periodically. Continued use of the platform 
                  constitutes acceptance of updated terms.
                </p>

                <h3 className="text-lg font-semibold">Contact Information</h3>
                <p className="text-sm">
                  For questions about these terms, contact us at: <br />
                  Email: legal@seefinish.com <br />
                  Platform: SeeFinish support system
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Terms;