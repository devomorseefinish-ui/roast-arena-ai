import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Video, 
  Users, 
  MessageCircle, 
  Send,
  Play,
  Pause,
  Volume2,
  Settings,
  Share,
  Heart,
  Gift
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LiveStream {
  id: string;
  title: string;
  streamer: {
    username: string;
    display_name: string;
    avatar_url: string;
  };
  viewers: number;
  is_live: boolean;
  category: string;
  thumbnail_url: string;
  started_at: string;
}

interface ChatMessage {
  id: string;
  user: {
    username: string;
    avatar_url: string;
  };
  message: string;
  timestamp: string;
  type: 'message' | 'tip' | 'follow';
}

const mockStreams: LiveStream[] = [
  {
    id: "1",
    title: "Epic Roast Battle Championship - Final Round!",
    streamer: {
      username: "roastking",
      display_name: "Roast King",
      avatar_url: ""
    },
    viewers: 1247,
    is_live: true,
    category: "Roast Battle",
    thumbnail_url: "",
    started_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "2",
    title: "Political Debate: Economy vs Environment",
    streamer: {
      username: "debatemaster",
      display_name: "Debate Master",
      avatar_url: ""
    },
    viewers: 890,
    is_live: true,
    category: "Politics",
    thumbnail_url: "",
    started_at: new Date(Date.now() - 30 * 60 * 1000).toISOString()
  }
];

const mockChatMessages: ChatMessage[] = [
  {
    id: "1",
    user: { username: "user1", avatar_url: "" },
    message: "This is incredible! 🔥",
    timestamp: new Date().toISOString(),
    type: "message"
  },
  {
    id: "2", 
    user: { username: "user2", avatar_url: "" },
    message: "Tipped ₦500!",
    timestamp: new Date().toISOString(),
    type: "tip"
  }
];

const Live = () => {
  const [selectedStream, setSelectedStream] = useState<LiveStream | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  const { user } = useAuth();

  const handleSendMessage = () => {
    if (!newMessage.trim() || !user) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      user: {
        username: user.email?.split('@')[0] || 'user',
        avatar_url: ""
      },
      message: newMessage,
      timestamp: new Date().toISOString(),
      type: "message"
    };

    setChatMessages(prev => [...prev, message]);
    setNewMessage("");
  };

  const formatViewers = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const getStreamDuration = (startedAt: string) => {
    const duration = Date.now() - new Date(startedAt).getTime();
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  };

  if (selectedStream) {
    return (
      <div className="h-screen bg-black flex">
        {/* Video Player */}
        <div className="flex-1 flex flex-col">
          {/* Video Area */}
          <div className="flex-1 bg-gray-900 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <Video className="h-24 w-24 mx-auto mb-4 opacity-50" />
                <p className="text-xl mb-2">Live Video Stream</p>
                <p className="text-sm opacity-75">
                  Video integration would go here (WebRTC, YouTube Live, etc.)
                </p>
              </div>
            </div>
            
            {/* Video Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white hover:bg-white/20"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                  <Volume2 className="h-4 w-4" />
                </Button>
                <div className="text-white text-sm">
                  {getStreamDuration(selectedStream.started_at)}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                  <Share className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Stream Info */}
          <div className="p-4 bg-background border-t">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-xl font-bold mb-2">{selectedStream.title}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={selectedStream.streamer.avatar_url} />
                      <AvatarFallback>
                        {selectedStream.streamer.username[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{selectedStream.streamer.display_name}</p>
                      <p className="text-sm text-muted-foreground">@{selectedStream.streamer.username}</p>
                    </div>
                  </div>
                  <Badge className="bg-red-500 text-white">
                    <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                    LIVE
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    {formatViewers(selectedStream.viewers)} viewers
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Heart className="mr-2 h-4 w-4" />
                  Follow
                </Button>
                <Button size="sm" className="bg-gradient-primary text-white">
                  <Gift className="mr-2 h-4 w-4" />
                  Tip
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Chat Sidebar */}
        <div className="w-80 bg-background border-l flex flex-col">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Live Chat</h3>
            <p className="text-sm text-muted-foreground">
              {formatViewers(selectedStream.viewers)} viewers
            </p>
          </div>
          
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-3">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="flex items-start gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={msg.user.avatar_url} />
                    <AvatarFallback className="text-xs">
                      {msg.user.username[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{msg.user.username}</span>
                      {msg.type === 'tip' && (
                        <Badge variant="secondary" className="text-xs">TIP</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground break-words">
                      {msg.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          {user && (
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button size="sm" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Live Streams</h1>
          <p className="text-muted-foreground">Watch live roast battles and debates</p>
        </div>

        {/* Featured Streams */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockStreams.map((stream) => (
            <Card key={stream.id} className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedStream(stream)}>
              <CardHeader className="p-0">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-t-lg relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-red-500 text-white">
                      <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                      LIVE
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3 bg-black/70 text-white text-sm px-2 py-1 rounded">
                    {getStreamDuration(stream.started_at)}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-sm px-2 py-1 rounded flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {formatViewers(stream.viewers)}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 line-clamp-2">{stream.title}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={stream.streamer.avatar_url} />
                    <AvatarFallback className="text-xs">
                      {stream.streamer.username[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">
                    {stream.streamer.display_name}
                  </span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {stream.category}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Start Streaming CTA */}
        <Card className="mt-8">
          <CardContent className="text-center py-8">
            <Video className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Ready to Go Live?</h3>
            <p className="text-muted-foreground mb-4">
              Share your roasts and debates with the community in real-time
            </p>
            <Button className="bg-gradient-primary text-white">
              <Video className="mr-2 h-4 w-4" />
              Start Streaming
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Live;