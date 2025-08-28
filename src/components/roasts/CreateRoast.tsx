import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ConfettiEffect } from "@/components/animations/ConfettiEffect";

export function CreateRoast() {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in to create a roast");
      return;
    }

    if (!content.trim()) {
      toast.error("Please enter some content for your roast");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("roasts")
        .insert({
          content: content.trim(),
          author_id: user.id,
        });

      if (error) {
        toast.error("Failed to create roast");
        return;
      }

      toast.success("Roast created successfully!");
      setContent("");
      setShowConfetti(true);
    } catch (error) {
      toast.error("An error occurred while creating the roast");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Card data-tutorial="create-roast">
      <CardHeader>
        <CardTitle>Create a Roast</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="What's on your mind? Roast someone or something..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[120px] resize-none"
            maxLength={500}
          />
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {content.length}/500 characters
            </span>
            <Button 
              type="submit" 
              disabled={isSubmitting || !content.trim()}
              className="bg-gradient-primary text-white"
            >
              {isSubmitting ? "Posting..." : "Post Roast"}
            </Button>
          </div>
        </form>
      </CardContent>
      <ConfettiEffect 
        trigger={showConfetti} 
        type="success"
        onComplete={() => setShowConfetti(false)}
      />
    </Card>
  );
}