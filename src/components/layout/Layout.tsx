import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user } = useAuth();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {user && <AppSidebar />}
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="flex items-center justify-between px-4 h-full">
              <div className="flex items-center gap-4">
                {user && <SidebarTrigger />}
                {!user && (
                  <Link to="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">S</span>
                    </div>
                    <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                      SeeFinish
                    </span>
                  </Link>
                )}
                
                {/* Search Bar */}
                <div className="relative max-w-md w-full hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    placeholder="Search roasts, debates, users..." 
                    className="pl-10 bg-muted/50 border-0 focus:bg-background transition-colors"
                    data-tutorial="search"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                {user && (
                  <Link to="/notifications">
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-4 w-4" />
                      <span className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full"></span>
                    </Button>
                  </Link>
                )}
                <ThemeToggle />
                {!user && (
                  <div className="flex items-center gap-2">
                    <Link to="/auth">
                      <Button variant="outline" size="sm">Sign In</Button>
                    </Link>
                    <Link to="/auth?tab=signup">
                      <Button size="sm" className="bg-gradient-primary text-white">Sign Up</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}