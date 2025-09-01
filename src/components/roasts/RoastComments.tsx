import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

interface CommentItem {
  id: string;
  content: string;
  created_at: string;
  author_id: string;
  profiles: {
    username: string;
    display_name: string | null;
    avatar_url: string | null;
  };
}

interface RoastCommentsProps {
  roastId: string;
  onCommentAdded?: () => void;
}

export function RoastComments({ roastId, onCommentAdded }: RoastCommentsProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from("comments")
        .select(`*, profiles!author_id (username, display_name, avatar_url)`) 
        .eq("roast_id", roastId)
        .order("created_at", { ascending: false })
        .limit(20);
      if (error) throw error;
      setComments((data as any) || []);
    } catch (e) {
      console.error("Error fetching comments", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [roastId]);

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to comment");
      return;
    }
    const content = input.trim();
    if (!content) {
      toast.error("Please enter a comment");
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.from("comments").insert({
        content,
        author_id: user.id,
        roast_id: roastId,
      });
      if (error) throw error;
      setInput("");
      await fetchComments();
      onCommentAdded?.();
      toast.success("Comment added");
    } catch (e) {
      toast.error("Failed to add comment");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <form onSubmit={submitComment} className="space-y-2">
        <Textarea
          placeholder="Write a comment..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[80px]"
          maxLength={280}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={submitting || !input.trim()} className="bg-gradient-primary text-white">
            {submitting ? "Posting..." : "Post Comment"}
          </Button>
        </div>
      </form>

      <div className="space-y-4">
        {comments.map((c) => (
          <div key={c.id} className="flex gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={c.profiles?.avatar_url || undefined} />
              <AvatarFallback>
                {c.profiles?.username?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground mr-1">
                  {c.profiles?.display_name || c.profiles?.username || "Anonymous"}
                </span>
                • {formatDistanceToNow(new Date(c.created_at), { addSuffix: true })}
              </div>
              <div className="text-sm mt-1">{c.content}</div>
            </div>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-sm text-muted-foreground">No comments yet. Be the first!</p>
        )}
      </div>
    </div>
  );
}
