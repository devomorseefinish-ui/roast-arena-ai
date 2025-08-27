import { useState } from "react";
import { 
  Home, 
  Flame, 
  Users, 
  Trophy, 
  Video, 
  Bell, 
  Settings, 
  LogOut,
  Wallet,
  Zap
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";

const mainItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Roasts", url: "/roasts", icon: Flame },
  { title: "Debates", url: "/debates", icon: Video },
  { title: "Leaderboard", url: "/leaderboard", icon: Trophy },
  { title: "Explore", url: "/explore", icon: Users },
];

const userItems = [
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Wallet", url: "/wallet", icon: Wallet },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const { user, profile, signOut } = useAuth();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = (path: string) =>
    isActive(path) 
      ? "bg-primary/10 text-primary border-r-2 border-primary font-medium" 
      : "hover:bg-muted/50";

  return (
    <Sidebar
      className={!open ? "w-14" : "w-64"}
      collapsible="icon"
    >
      <SidebarContent>
        {/* Logo */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            {!open && (
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                seefinish
              </span>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavCls(item.url)}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Menu */}
        {user && (
          <SidebarGroup>
            <SidebarGroupLabel>Account</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {userItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        className={getNavCls(item.url)}
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {!open && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      {/* User Profile & Sign Out */}
      {user && (
        <SidebarFooter>
          <div className="p-4 border-t">
            {!open ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profile?.avatar_url || undefined} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {profile?.username?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {profile?.display_name || profile?.username}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {profile?.xp_points || 0} XP
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={signOut}
                  className="w-full"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button 
                variant="outline" 
                size="icon" 
                onClick={signOut}
                className="w-8 h-8"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            )}
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}