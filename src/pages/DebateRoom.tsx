import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Video, Mic, Users, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function DebateRoom() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/debates">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Debates
            </Button>
          </Link>
          <Badge className="bg-destructive text-white">🔴 LIVE</Badge>
          <Badge variant="outline">
            <Users className="w-3 h-3 mr-1" />
            3/5 participants
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Video Area */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Should pineapple be on pizza?</span>
                  <Badge variant="secondary">Video Debate</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-black rounded-lg flex items-center justify-center mb-4">
                  <div className="text-white text-center">
                    <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Debate will start soon...</p>
                    <p className="text-sm opacity-75">Waiting for participants</p>
                  </div>
                </div>
                
                {/* Control Buttons */}
                <div className="flex justify-center gap-4">
                  <Button size="sm" variant="outline">
                    <Mic className="w-4 h-4 mr-2" />
                    Mute
                  </Button>
                  <Button size="sm" variant="outline">
                    <Video className="w-4 h-4 mr-2" />
                    Camera Off
                  </Button>
                  <Button size="sm" variant="destructive">
                    Leave Debate
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Participants */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Participants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3 p-3 border rounded-lg">
                      <Avatar>
                        <AvatarFallback>U{i}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">User {i}</p>
                        <p className="text-sm text-muted-foreground">
                          {i === 1 ? "Pro-pineapple" : "Anti-pineapple"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Live Chat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 h-64 overflow-y-auto mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="text-sm">
                      <span className="font-medium text-primary">User{i}:</span>
                      <span className="ml-2">This is getting heated! 🔥</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 text-sm border rounded-md"
                  />
                  <Button size="sm">Send</Button>
                </div>
              </CardContent>
            </Card>

            {/* Debate Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Debate Rules</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>• Each side gets 2 minutes opening</p>
                <p>• 30 seconds for rebuttals</p>
                <p>• Audience votes at the end</p>
                <p>• Winner takes 80% of entry fees</p>
                <div className="pt-2 mt-4 border-t">
                  <p className="font-medium">Entry Fee: ₦500</p>
                  <p className="font-medium">Total Pool: ₦2,500</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}