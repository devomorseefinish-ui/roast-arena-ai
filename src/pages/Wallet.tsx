import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet as WalletIcon, Plus, Send, Receipt, TrendingUp } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { SolanaWalletConnect } from "@/components/wallet/SolanaWalletConnect";
import { DepositModal } from "@/components/wallet/DepositModal";

interface Transaction {
  id: string;
  type: string;
  amount_ngn: number | null;
  amount_sol: number | null;
  status: string;
  created_at: string;
  transaction_hash: string | null;
}

const Wallet = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, profile } = useAuth();

  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setTransactions(data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };


  const getTransactionTypeIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'withdrawal':
        return <Send className="h-4 w-4 text-red-500" />;
      case 'reward':
        return <Receipt className="h-4 w-4 text-yellow-500" />;
      case 'entry_fee':
        return <Receipt className="h-4 w-4 text-blue-500" />;
      default:
        return <Receipt className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-subtle p-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-2">Wallet</h1>
          <p className="text-muted-foreground">Please log in to access your wallet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Wallet</h1>
          <p className="text-muted-foreground">Manage your crypto wallet and earnings</p>
        </div>

        {/* Balance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="text-3xl font-bold text-primary mb-2">
                ₦{profile?.total_earnings?.toLocaleString() || '0'}
              </h3>
              <p className="text-muted-foreground">Total Earnings (NGN)</p>
              <DepositModal>
                <Button className="mt-4 w-full bg-gradient-primary text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Deposit NGN
                </Button>
              </DepositModal>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="text-3xl font-bold text-secondary mb-2">0.00 SOL</h3>
              <p className="text-muted-foreground">SOL Balance</p>
              <DepositModal>
                <Button className="mt-4 w-full" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Deposit SOL
                </Button>
              </DepositModal>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="text-3xl font-bold text-success mb-2">
                {profile?.xp_points?.toLocaleString() || '0'}
              </h3>
              <p className="text-muted-foreground">XP Points</p>
              <Button className="mt-4 w-full" variant="outline" disabled>
                Earn More XP
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Solana Wallet */}
        <div className="mb-8">
          <SolanaWalletConnect />
        </div>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center text-muted-foreground">Loading transactions...</p>
            ) : transactions.length > 0 ? (
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getTransactionTypeIcon(transaction.type)}
                      <div>
                        <h4 className="font-medium capitalize">{transaction.type.replace('_', ' ')}</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(transaction.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-medium">
                        {transaction.amount_ngn && `₦${transaction.amount_ngn.toLocaleString()}`}
                        {transaction.amount_sol && `${transaction.amount_sol} SOL`}
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`${getStatusColor(transaction.status)} text-white text-xs`}
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Receipt className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Transactions Yet</h3>
                <p className="text-muted-foreground">
                  Your transaction history will appear here once you start participating in debates
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Wallet;