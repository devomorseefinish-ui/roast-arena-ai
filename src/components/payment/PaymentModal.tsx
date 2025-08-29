import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Wallet, Info } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
  currency: 'ngn' | 'sol';
  debateId?: string;
  onSuccess?: () => void;
}

export function PaymentModal({ 
  open, 
  onOpenChange, 
  amount, 
  currency, 
  debateId,
  onSuccess 
}: PaymentModalProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          amount,
          currency,
          type: debateId ? 'entry_fee' : 'deposit',
          debate_id: debateId
        }
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
        onOpenChange(false);
        onSuccess?.();
      }
    } catch (error) {
      toast.error('Failed to process payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Required
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center p-6 border border-border rounded-lg">
            <div className="text-3xl font-bold text-primary mb-2">
              {currency === 'ngn' ? '₦' : ''}{amount.toLocaleString()}{currency === 'sol' ? ' SOL' : ''}
            </div>
            <Badge variant="secondary" className="text-sm">
              {debateId ? 'Debate Entry Fee' : 'Wallet Deposit'}
            </Badge>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-blue-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-800 dark:text-blue-200">Payment Information</p>
                <p className="text-blue-700 dark:text-blue-300 mt-1">
                  {currency === 'ngn' 
                    ? "Payment will be processed securely via Stripe. You'll be redirected to complete your payment."
                    : "SOL payments are processed on the Solana blockchain. Ensure you have enough SOL in your wallet."}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)} 
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handlePayment} 
              disabled={loading}
              className="flex-1 bg-gradient-primary text-white"
            >
              <Wallet className="mr-2 h-4 w-4" />
              {loading ? "Processing..." : `Pay ${currency === 'ngn' ? '₦' : ''}${amount}${currency === 'sol' ? ' SOL' : ''}`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}