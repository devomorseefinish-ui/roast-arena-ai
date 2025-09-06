import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Users, Coins } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";

interface DebateCardProps {
  debate: {
    id: string;
    title: string;
    description: string | null;
    debate_type: string;
    status: string;
    entry_fee_ngn: number;
    entry_fee_sol: number;
    max_participants: number;
    scheduled_at: string | null;
    created_at: string;
    organizer_id: string;
    profiles?: {
      username: string;
      display_name: string | null;
      avatar_url: string | null;
    };
  };
  participantCount?: number;
}

export function DebateCard({ debate, participantCount = 0 }: DebateCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-500';
      case 'live': return 'bg-green-500';
      case 'completed': return 'bg-gray-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const formatFee = () => {
    if (debate.entry_fee_sol > 0 && debate.entry_fee_ngn > 0) {
      return `₦${debate.entry_fee_ngn} / ${debate.entry_fee_sol} SOL`;
    } else if (debate.entry_fee_ngn > 0) {
      return `₦${debate.entry_fee_ngn}`;
    } else if (debate.entry_fee_sol > 0) {
      return `${debate.entry_fee_sol} SOL`;
    }
    return 'Free';
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={debate.profiles?.avatar_url || ""} />
              <AvatarFallback>
                {debate.profiles?.username?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">
                {debate.profiles?.display_name || debate.profiles?.username || "Anonymous"}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(debate.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>
          <Badge className={`${getStatusColor(debate.status)} text-white`}>
            {debate.status.charAt(0).toUpperCase() + debate.status.slice(1)}
          </Badge>
        </div>
        
        <h3 className="text-lg font-bold mt-2">{debate.title}</h3>
        {debate.description && (
          <p className="text-sm text-muted-foreground">{debate.description}</p>
        )}
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <Badge variant="outline" className="capitalize">
              {debate.debate_type}
            </Badge>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Coins className="h-4 w-4" />
              {formatFee()}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {participantCount}/{debate.max_participants} participants
            </div>
            {debate.scheduled_at && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {format(new Date(debate.scheduled_at), "MMM d, h:mm a")}
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-2">
            <Button 
              size="sm" 
              className="flex-1 bg-gradient-primary text-white hover:opacity-90"
              disabled={debate.status !== 'scheduled' && debate.status !== 'live'}
              onClick={() => {
                if (debate.status === 'scheduled' || debate.status === 'live') {
                  // Navigate to debate room
                  window.location.href = `/debates/${debate.id}`;
                }
              }}
            >
              {debate.status === 'scheduled' ? 'Join Debate' : 
               debate.status === 'live' ? '🔴 Join Live' : 
               'View Results'}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.location.href = `/debates/${debate.id}/details`}
            >
              Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}