import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ConfettiEffect } from "@/components/animations/ConfettiEffect";
import { ImageUpload } from "@/components/upload/ImageUpload";

export function CreateRoast() {
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
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
          media_url: imageUrl
        });

      if (error) {
        toast.error("Failed to create roast");
        return;
      }

      toast.success("Roast created successfully!");
      setContent("");
      setImageUrl(null);
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
            placeholder="What's the hottest roast you've got? 🔥"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[120px] resize-none"
            maxLength={280}
            data-tutorial="create-roast"
          />
          
          <ImageUpload 
            onImageUploaded={setImageUrl}
            className="mt-3"
          />
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {content.length}/280 characters
            </span>
            <Button 
              type="submit" 
              disabled={isSubmitting || !content.trim()}
              className="bg-gradient-primary text-white"
            >
              <Send className="h-4 w-4 mr-2" />
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