import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { RoastCard } from "./RoastCard";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";

interface Roast {
  id: string;
  content: string;
  created_at: string;
  likes_count: number;
  comments_count: number;
  author_id: string;
  profiles: {
    username: string;
    display_name: string | null;
    avatar_url: string | null;
  };
}

export function RoastFeed() {
  const [roasts, setRoasts] = useState<Roast[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLikes, setUserLikes] = useState<Set<string>>(new Set());
  const { user } = useAuth();

  const fetchRoasts = async () => {
    try {
      const { data, error } = await supabase
        .from("roasts")
        .select(`
          *,
          profiles!author_id (
            username,
            display_name,
            avatar_url
          )
        `)
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) throw error;

      setRoasts(data || []);

      // Fetch user likes if authenticated
      if (user && data) {
        const roastIds = data.map(roast => roast.id);
        const { data: likes } = await supabase
          .from("likes")
          .select("roast_id")
          .eq("user_id", user.id)
          .in("roast_id", roastIds);

        const likedRoastIds = new Set(likes?.map(like => like.roast_id) || []);
        setUserLikes(likedRoastIds);
      }
    } catch (error) {
      console.error("Error fetching roasts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoasts();
  }, [user]);

  const handleLikeToggle = () => {
    fetchRoasts(); // Refresh to get updated counts
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-4 border rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div>
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
            <Skeleton className="h-16 w-full mb-3" />
            <div className="flex gap-4">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (roasts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No roasts yet. Be the first to create one!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {roasts.map((roast) => (
        <RoastCard
          key={roast.id}
          roast={roast}
          isLiked={userLikes.has(roast.id)}
          onLikeToggle={handleLikeToggle}
        />
      ))}
    </div>
  );
}