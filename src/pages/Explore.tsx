import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, Users, Flame, Video } from "lucide-react";
import { RoastFeed } from "@/components/roasts/RoastFeed";
import { DebateFeed } from "@/components/debates/DebateFeed";
import { supabase } from "@/integrations/supabase/client";

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [trendingTopics] = useState([
    "Tech", "Politics", "Sports", "Entertainment", "Gaming", "Food", "Travel", "Music"
  ]);

  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Explore</h1>
          <p className="text-muted-foreground">Discover trending content and connect with the community</p>
        </div>

        {/* Search Bar */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search roasts, debates, users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Trending Topics */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Trending Topics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {trendingTopics.map((topic) => (
                <Badge
                  key={topic}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  #{topic}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Content</TabsTrigger>
            <TabsTrigger value="roasts" className="flex items-center gap-2">
              <Flame className="h-4 w-4" />
              Roasts
            </TabsTrigger>
            <TabsTrigger value="debates" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Debates
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Flame className="h-5 w-5 text-secondary" />
                  Latest Roasts
                </h3>
                <RoastFeed />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Video className="h-5 w-5 text-accent" />
                  Active Debates
                </h3>
                <DebateFeed />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="roasts">
            <RoastFeed />
          </TabsContent>

          <TabsContent value="debates">
            <DebateFeed />
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">User Search</h3>
                <p className="text-muted-foreground">
                  User discovery feature coming soon! Connect with fellow roasters and debaters.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Explore;