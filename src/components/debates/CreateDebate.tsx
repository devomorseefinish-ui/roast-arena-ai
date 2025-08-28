import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function CreateDebate() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    debate_type: "",
    entry_fee_ngn: 0,
    entry_fee_sol: 0,
    max_participants: 2,
    scheduled_at: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in to create a debate");
      return;
    }

    if (!formData.title.trim() || !formData.debate_type) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("debates")
        .insert({
          ...formData,
          organizer_id: user.id,
          scheduled_at: formData.scheduled_at ? new Date(formData.scheduled_at).toISOString() : null,
        });

      if (error) {
        toast.error("Failed to create debate");
        return;
      }

      toast.success("Debate created successfully!");
      setFormData({
        title: "",
        description: "",
        debate_type: "",
        entry_fee_ngn: 0,
        entry_fee_sol: 0,
        max_participants: 2,
        scheduled_at: "",
      });
    } catch (error) {
      toast.error("An error occurred while creating the debate");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a Debate</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Enter debate title..."
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the debate topic..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="debate_type">Debate Type *</Label>
            <Select
              value={formData.debate_type}
              onValueChange={(value) => setFormData(prev => ({ ...prev, debate_type: value }))}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select debate type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="freestyle">Freestyle</SelectItem>
                <SelectItem value="structured">Structured</SelectItem>
                <SelectItem value="timed">Timed</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="entry_fee_ngn">Entry Fee (NGN)</Label>
              <Input
                id="entry_fee_ngn"
                type="number"
                min="0"
                step="100"
                value={formData.entry_fee_ngn}
                onChange={(e) => setFormData(prev => ({ ...prev, entry_fee_ngn: Number(e.target.value) }))}
              />
            </div>
            <div>
              <Label htmlFor="entry_fee_sol">Entry Fee (SOL)</Label>
              <Input
                id="entry_fee_sol"
                type="number"
                min="0"
                step="0.01"
                value={formData.entry_fee_sol}
                onChange={(e) => setFormData(prev => ({ ...prev, entry_fee_sol: Number(e.target.value) }))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="max_participants">Max Participants</Label>
            <Select
              value={formData.max_participants.toString()}
              onValueChange={(value) => setFormData(prev => ({ ...prev, max_participants: Number(value) }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2 (1v1)</SelectItem>
                <SelectItem value="4">4 (2v2)</SelectItem>
                <SelectItem value="6">6 (3v3)</SelectItem>
                <SelectItem value="8">8 (4v4)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="scheduled_at">Scheduled Date & Time</Label>
            <Input
              id="scheduled_at"
              type="datetime-local"
              value={formData.scheduled_at}
              onChange={(e) => setFormData(prev => ({ ...prev, scheduled_at: e.target.value }))}
            />
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-gradient-primary text-white"
          >
            {isSubmitting ? "Creating..." : "Create Debate"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}