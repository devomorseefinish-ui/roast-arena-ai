import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-2xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-4">Welcome to seefinish</h1>
        <p className="text-xl text-muted-foreground mb-8">The ultimate platform for roasting and debates</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                Terms of Use
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Learn about platform rules, debate guidelines, and user conduct expectations.
              </p>
              <Link to="/terms">
                <Button variant="outline" className="w-full">
                  Read Terms
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                Privacy Policy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Understand how we protect your data and respect your privacy.
              </p>
              <Link to="/privacy">
                <Button variant="outline" className="w-full">
                  Read Policy
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <p className="text-sm text-muted-foreground">
          Authentication coming soon with Email, Google, Twitter, and Solana wallet support
        </p>
      </div>
    </div>
  );
};

export default Index;
