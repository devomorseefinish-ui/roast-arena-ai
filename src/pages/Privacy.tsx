import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Database, Users, Eye, Globe, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const Privacy = () => {
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
          <h1 className="text-4xl font-bold text-center mb-2">Privacy Policy</h1>
          <p className="text-center text-muted-foreground">
            Last updated: January 27, 2025
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-500" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                At <strong>seefinish</strong>, we respect your privacy and are committed to protecting your personal data. 
                This privacy policy explains how we collect, use, and safeguard your information when you use our platform.
              </p>
              <p>
                This policy applies to all users of seefinish, including debaters, judges, audience members, and general social media users.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-green-500" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Account Information:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Username and display name</li>
                  <li>Email address (for email authentication)</li>
                  <li>Profile information and avatars</li>
                  <li>Social media account data (Google, Twitter)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Blockchain & Wallet Data:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Solana wallet addresses</li>
                  <li>Transaction history and payment records</li>
                  <li>NFT ownership and transfers</li>
                  <li>Smart contract interaction logs</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Platform Activity:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Roasts, comments, and social interactions</li>
                  <li>Debate recordings (video and audio)</li>
                  <li>Chat logs and private messages</li>
                  <li>XP points, rankings, and achievements</li>
                  <li>Following/follower relationships</li>
                  <li>Notification preferences and settings</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Technical Data:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>IP addresses and device information</li>
                  <li>Browser type and operating system</li>
                  <li>Usage analytics and performance metrics</li>
                  <li>Error logs and debugging information</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-purple-500" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Platform Operations:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Provide and maintain seefinish services</li>
                  <li>Process payments and handle financial transactions</li>
                  <li>Create and distribute viral content clips</li>
                  <li>Calculate XP points and distribute rewards</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Content & Community:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Moderate content and enforce community guidelines</li>
                  <li>Enable social features (following, likes, sharing)</li>
                  <li>Create highlight reels and promotional content</li>
                  <li>Recommend content and connect users</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Analytics & Improvement:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Analyze usage patterns and improve platform features</li>
                  <li>Detect and prevent fraud or abuse</li>
                  <li>Optimize performance and user experience</li>
                  <li>Develop new features and services</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-orange-500" />
                Information Sharing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Public Content:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Roasts, debates, and public comments are visible to all users</li>
                  <li>Live debate recordings may be shared and promoted</li>
                  <li>Viral clips and highlights may appear on landing page</li>
                  <li>User profiles and achievements are publicly visible</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Third-Party Services:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>Supabase:</strong> Backend database and authentication</li>
                  <li><strong>Solana Blockchain:</strong> Payment processing and NFT minting</li>
                  <li><strong>Google/Twitter:</strong> OAuth authentication services</li>
                  <li><strong>Payment Processors:</strong> Naira to Solana conversion</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Legal Requirements:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Comply with legal obligations and court orders</li>
                  <li>Investigate suspected violations of terms of service</li>
                  <li>Protect rights, property, or safety of users and platform</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-red-500" />
                Data Security & Storage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Security Measures:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Access controls and authentication requirements</li>
                  <li>Monitoring for unauthorized access or suspicious activity</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Blockchain Security:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Private keys never stored on our servers</li>
                  <li>Users maintain full control of their wallets</li>
                  <li>Smart contracts audited for security vulnerabilities</li>
                  <li>Transaction data secured by Solana blockchain</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Data Retention:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Account data retained while account is active</li>
                  <li>Debate recordings stored for historical purposes</li>
                  <li>Payment records retained for legal compliance</li>
                  <li>Deleted accounts: data removed within 30 days</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-teal-500" />
                Your Privacy Rights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Account Controls:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Update or correct your personal information</li>
                  <li>Adjust notification and privacy settings</li>
                  <li>Control who can follow you and see your content</li>
                  <li>Delete your account and associated data</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Data Access Rights:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Request access to your personal data</li>
                  <li>Download your content and activity history</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Object to certain types of data processing</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Regional Rights (GDPR/CCPA):</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>EU users: Full GDPR rights including portability</li>
                  <li>California users: CCPA rights to know and delete</li>
                  <li>Right to withdraw consent for data processing</li>
                  <li>Right to file complaints with supervisory authorities</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-indigo-500" />
                Cookies & Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Essential Cookies:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Authentication and session management</li>
                  <li>User preferences and settings</li>
                  <li>Security and fraud prevention</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Analytics & Performance:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Usage statistics and feature adoption</li>
                  <li>Performance monitoring and error tracking</li>
                  <li>A/B testing for platform improvements</li>
                  <li>Content engagement and viral metrics</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Separator />

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">International Transfers</h3>
                <p className="text-sm">
                  Your data may be processed in countries other than your own. We ensure appropriate 
                  safeguards are in place to protect your personal data during international transfers.
                </p>
                
                <h3 className="text-lg font-semibold">Children's Privacy</h3>
                <p className="text-sm">
                  seefinish is not intended for users under 13 years old. We do not knowingly 
                  collect personal information from children under 13.
                </p>

                <h3 className="text-lg font-semibold">Changes to This Policy</h3>
                <p className="text-sm">
                  We may update this privacy policy periodically. We will notify users of significant 
                  changes via email or platform notifications.
                </p>

                <h3 className="text-lg font-semibold">Contact Information</h3>
                <p className="text-sm">
                  For privacy-related questions or to exercise your rights, contact us at: <br />
                  Email: privacy@seefinish.com <br />
                  Data Protection Officer: dpo@seefinish.com <br />
                  Platform: seefinish support system
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Privacy;