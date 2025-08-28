import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface RoastCardProps {
  roast: {
    id: string;
    content: string;
    created_at: string;
    likes_count: number;
    comments_count: number;
    author_id: string;
    profiles?: {
      username: string;
      display_name: string | null;
      avatar_url: string | null;
    };
  };
  isLiked?: boolean;
  onLikeToggle?: () => void;
}

export function RoastCard({ roast, isLiked = false, onLikeToggle }: RoastCardProps) {
  const [liking, setLiking] = useState(false);
  const { user } = useAuth();

  const handleLike = async () => {
    if (!user) {
      toast.error("You must be logged in to like roasts");
      return;
    }

    setLiking(true);

    try {
      if (isLiked) {
        // Unlike
        const { error } = await supabase
          .from("likes")
          .delete()
          .eq("user_id", user.id)
          .eq("roast_id", roast.id);

        if (error) throw error;
      } else {
        // Like
        const { error } = await supabase
          .from("likes")
          .insert({
            user_id: user.id,
            roast_id: roast.id,
          });

        if (error) throw error;
      }

      onLikeToggle?.();
    } catch (error) {
      toast.error("Failed to update like");
    } finally {
      setLiking(false);
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={roast.profiles?.avatar_url || ""} />
              <AvatarFallback>
                {roast.profiles?.username?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">
                {roast.profiles?.display_name || roast.profiles?.username || "Anonymous"}
              </p>
              <p className="text-xs text-muted-foreground">
                @{roast.profiles?.username || "anonymous"} • {" "}
                {formatDistanceToNow(new Date(roast.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm leading-relaxed mb-4">{roast.content}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              disabled={liking}
              className={`gap-2 ${isLiked ? "text-red-500 hover:text-red-600" : ""}`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
              {roast.likes_count}
            </Button>
            
            <Button variant="ghost" size="sm" className="gap-2">
              <MessageCircle className="h-4 w-4" />
              {roast.comments_count}
            </Button>
          </div>
          
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}