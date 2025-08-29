import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Trophy, 
  Flame, 
  MessageSquare, 
  Users, 
  MapPin,
  Calendar,
  UserPlus,
  UserMinus
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { RoastCard } from "@/components/roasts/RoastCard";
import { DebateCard } from "@/components/debates/DebateCard";

interface Profile {
  id: string;
  user_id: string;
  username: string;
  display_name: string;
  bio: string;
  avatar_url: string;
  followers_count: number;
  following_count: number;
  total_earnings: number;
  xp_points: number;
  rank: string;
  created_at: string;
}

interface Post {
  id: string;
  content: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
  author_id: string;
}

const Profile = () => {
  const { username } = useParams();
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [roasts, setRoasts] = useState<Post[]>([]);
  const [debates, setDebates] = useState<any[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (username) {
      fetchProfile();
      fetchUserContent();
      checkFollowStatus();
    }
  }, [username, user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      toast.error('Failed to load profile');
    }
  };

  const fetchUserContent = async () => {
    try {
      // Fetch roasts
      const { data: roastsData } = await supabase
        .from('roasts')
        .select(`
          *,
          profiles!author_id (username, display_name, avatar_url)
        `)
        .eq('profiles.username', username)
        .order('created_at', { ascending: false });

      // Fetch debates
      const { data: debatesData } = await supabase
        .from('debates')
        .select(`
          *,
          profiles!organizer_id (username, display_name, avatar_url)
        `)
        .eq('profiles.username', username)
        .order('created_at', { ascending: false });

      setRoasts(roastsData || []);
      setDebates(debatesData || []);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkFollowStatus = async () => {
    if (!user || !profile) return;

    try {
      const { data } = await supabase
        .from('follows')
        .select('id')
        .eq('follower_id', user.id)
        .eq('following_id', profile.user_id)
        .single();

      setIsFollowing(!!data);
    } catch (error) {
      // Not following
    }
  };

  const handleFollow = async () => {
    if (!user || !profile) return;

    try {
      if (isFollowing) {
        await supabase
          .from('follows')
          .delete()
          .eq('follower_id', user.id)
          .eq('following_id', profile.user_id);
        
        setIsFollowing(false);
        toast.success('Unfollowed successfully');
      } else {
        await supabase
          .from('follows')
          .insert({
            follower_id: user.id,
            following_id: profile.user_id
          });
        
        setIsFollowing(true);
        toast.success('Following successfully');
      }
    } catch (error) {
      toast.error('Failed to update follow status');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle p-4">
        <div className="max-w-4xl mx-auto text-center">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-subtle p-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-2">Profile Not Found</h1>
          <p className="text-muted-foreground">The user you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const isOwnProfile = user?.id === profile.user_id;

  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile.avatar_url} />
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {profile.username[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-3xl font-bold">{profile.display_name}</h1>
                  <p className="text-muted-foreground">@{profile.username}</p>
                  <Badge className="mt-2">{profile.rank}</Badge>
                </div>
                
                {profile.bio && (
                  <p className="text-muted-foreground">{profile.bio}</p>
                )}
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Joined {new Date(profile.created_at).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="font-bold text-xl">{profile.followers_count}</div>
                    <div className="text-sm text-muted-foreground">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-xl">{profile.following_count}</div>
                    <div className="text-sm text-muted-foreground">Following</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-xl">{profile.xp_points}</div>
                    <div className="text-sm text-muted-foreground">XP Points</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-xl">₦{profile.total_earnings?.toLocaleString() || 0}</div>
                    <div className="text-sm text-muted-foreground">Earnings</div>
                  </div>
                </div>
              </div>
              
              {!isOwnProfile && user && (
                <Button
                  onClick={handleFollow}
                  variant={isFollowing ? "outline" : "default"}
                  className={!isFollowing ? "bg-gradient-primary text-white" : ""}
                >
                  {isFollowing ? (
                    <>
                      <UserMinus className="mr-2 h-4 w-4" />
                      Unfollow
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Follow
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <Tabs defaultValue="roasts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="roasts" className="flex items-center gap-2">
              <Flame className="h-4 w-4" />
              Roasts ({roasts.length})
            </TabsTrigger>
            <TabsTrigger value="debates" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Debates ({debates.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="roasts">
            <div className="space-y-4">
              {roasts.length > 0 ? (
                roasts.map((roast) => (
                  <RoastCard key={roast.id} roast={roast} />
                ))
              ) : (
                <Card>
                  <CardContent className="text-center py-8">
                    <Flame className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Roasts Yet</h3>
                    <p className="text-muted-foreground">
                      {isOwnProfile ? "You haven't posted any roasts yet." : "This user hasn't posted any roasts yet."}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="debates">
            <div className="space-y-4">
              {debates.length > 0 ? (
                debates.map((debate) => (
                  <DebateCard key={debate.id} debate={debate} />
                ))
              ) : (
                <Card>
                  <CardContent className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Debates Yet</h3>
                    <p className="text-muted-foreground">
                      {isOwnProfile ? "You haven't organized any debates yet." : "This user hasn't organized any debates yet."}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;