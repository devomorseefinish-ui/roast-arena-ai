import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { DebateCard } from "./DebateCard";
import { Skeleton } from "@/components/ui/skeleton";

interface Debate {
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
  profiles: {
    username: string;
    display_name: string | null;
    avatar_url: string | null;
  };
}

export function DebateFeed() {
  const [debates, setDebates] = useState<Debate[]>([]);
  const [loading, setLoading] = useState(true);
  const [participantCounts, setParticipantCounts] = useState<Record<string, number>>({});

  const fetchDebates = async () => {
    try {
      const { data, error } = await supabase
        .from("debates")
        .select(`
          *,
          profiles!organizer_id (
            username,
            display_name,
            avatar_url
          )
        `)
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) throw error;

      setDebates(data || []);

      // Fetch participant counts
      if (data) {
        const debateIds = data.map(debate => debate.id);
        const { data: participants } = await supabase
          .from("debate_participants")
          .select("debate_id")
          .in("debate_id", debateIds);

        const counts: Record<string, number> = {};
        participants?.forEach(p => {
          counts[p.debate_id] = (counts[p.debate_id] || 0) + 1;
        });
        setParticipantCounts(counts);
      }
    } catch (error) {
      console.error("Error fetching debates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDebates();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-4 border rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-3 w-32" />
              </div>
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-16 w-full mb-3" />
            <div className="flex gap-2">
              <Skeleton className="h-8 flex-1" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (debates.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No debates yet. Be the first to create one!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {debates.map((debate) => (
        <DebateCard
          key={debate.id}
          debate={debate}
          participantCount={participantCounts[debate.id] || 0}
        />
      ))}
    </div>
  );
}