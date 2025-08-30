import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, Copy, ExternalLink, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

declare global {
  interface Window {
    solana?: any;
  }
}

export function SolanaWalletConnect() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [connecting, setConnecting] = useState(false);
  const { user, profile } = useAuth();

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    if (window.solana?.isPhantom) {
      try {
        const response = await window.solana.connect({ onlyIfTrusted: true });
        if (response.publicKey) {
          setWalletAddress(response.publicKey.toString());
          setIsConnected(true);
          await fetchBalance(response.publicKey.toString());
        }
      } catch (error) {
        // User not connected
      }
    }
  };

  const connectWallet = async () => {
    if (!window.solana?.isPhantom) {
      toast.error("Phantom wallet not found. Please install Phantom wallet.");
      window.open("https://phantom.app/", "_blank");
      return;
    }

    setConnecting(true);
    try {
      const response = await window.solana.connect();
      const address = response.publicKey.toString();
      
      setWalletAddress(address);
      setIsConnected(true);
      
      // Update profile with wallet address if user is logged in
      if (user?.id) {
        const { error } = await supabase
          .from('profiles')
          .update({ wallet_address: address })
          .eq('user_id', user.id);

        if (error) throw error;
      }

      await fetchBalance(address);
      toast.success('Wallet connected successfully!');
    } catch (error) {
      console.error('Wallet connection error:', error);
      toast.error('Failed to connect wallet');
    } finally {
      setConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    try {
      await window.solana.disconnect();
      setIsConnected(false);
      setWalletAddress("");
      setBalance(0);
      
      // Clear wallet address from profile
      await supabase
        .from('profiles')
        .update({ wallet_address: null })
        .eq('user_id', user?.id);
        
      toast.success('Wallet disconnected');
    } catch (error) {
      toast.error('Failed to disconnect wallet');
    }
  };

  const fetchBalance = async (address: string) => {
    try {
      // TODO: Replace with real Solana RPC call
      // For now, using mock data with more realistic values
      const savedBalance = localStorage.getItem(`sol_balance_${address}`);
      if (savedBalance) {
        setBalance(parseFloat(savedBalance));
      } else {
        const mockBalance = Math.random() * 5 + 0.5; // 0.5 to 5.5 SOL
        localStorage.setItem(`sol_balance_${address}`, mockBalance.toString());
        setBalance(mockBalance);
      }
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    toast.success('Address copied to clipboard');
  };

  const refreshBalance = async () => {
    if (walletAddress) {
      await fetchBalance(walletAddress);
      toast.success('Balance refreshed');
    }
  };

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Connect Solana Wallet
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Wallet className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Wallet Connected</h3>
          <p className="text-muted-foreground mb-4">
            Connect your Phantom wallet to trade SOL and participate in debates
          </p>
          <Button 
            onClick={connectWallet} 
            disabled={connecting}
            className="bg-gradient-primary text-white"
          >
            {connecting ? "Connecting..." : "Connect Phantom Wallet"}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Solana Wallet
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Connected
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Wallet Address</label>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-1 font-mono text-sm p-2 bg-muted rounded">
              {walletAddress.slice(0, 8)}...{walletAddress.slice(-8)}
            </div>
            <Button size="sm" variant="outline" onClick={copyAddress}>
              <Copy className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div>
            <p className="text-sm text-muted-foreground">SOL Balance</p>
            <p className="text-xl font-bold">{balance.toFixed(4)} SOL</p>
          </div>
          <Button size="sm" variant="outline" onClick={refreshBalance}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={disconnectWallet} className="flex-1">
            Disconnect
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}