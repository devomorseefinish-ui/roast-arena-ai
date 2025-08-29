import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, Wallet } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DepositModalProps {
  children: React.ReactNode;
}

export function DepositModal({ children }: DepositModalProps) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("ngn");
  const [loading, setLoading] = useState(false);

  const handleDeposit = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          amount: parseFloat(amount),
          currency,
          type: 'deposit'
        }
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
        setOpen(false);
        setAmount("");
      }
    } catch (error) {
      toast.error('Failed to create payment session');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Deposit Funds
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="currency">Currency</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ngn">Nigerian Naira (₦)</SelectItem>
                <SelectItem value="sol">Solana (SOL)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder={currency === 'ngn' ? "1000" : "0.1"}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step={currency === 'ngn' ? "100" : "0.01"}
            />
          </div>
          
          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="text-sm text-muted-foreground">
              {currency === 'ngn' 
                ? "Deposits will be processed via Stripe. Minimum: ₦1,000" 
                : "SOL deposits are processed on Solana network. Minimum: 0.01 SOL"}
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleDeposit} 
              disabled={loading}
              className="flex-1 bg-gradient-primary text-white"
            >
              {loading ? "Processing..." : "Deposit"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}