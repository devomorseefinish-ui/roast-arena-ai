import { useState, useEffect } from 'react';
import { Search, User, MessageSquare, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

interface SearchResult {
  type: 'user' | 'roast' | 'debate';
  id: string;
  title: string;
  subtitle?: string;
  avatar?: string;
  badges?: string[];
}

interface SearchBarProps {
  className?: string;
  onSelect?: (result: SearchResult) => void;
}

export function SearchBar({ className = '', onSelect }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchContent = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        // Search users
        const { data: users } = await supabase
          .from('profiles')
          .select('user_id, username, display_name, avatar_url, rank, xp_points')
          .or(`username.ilike.%${query}%,display_name.ilike.%${query}%`)
          .limit(5);

        // Search roasts
        const { data: roasts } = await supabase
          .from('roasts')
          .select(`
            id, 
            content, 
            likes_count,
            author_id,
            profiles!roasts_author_id_fkey(username, display_name)
          `)
          .ilike('content', `%${query}%`)
          .limit(5);

        // Search debates
        const { data: debates } = await supabase
          .from('debates')
          .select(`
            id, 
            title, 
            description,
            status,
            organizer_id,
            profiles!debates_organizer_id_fkey(username, display_name)
          `)
          .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
          .limit(5);

        const searchResults: SearchResult[] = [
          ...(users || []).map(user => ({
            type: 'user' as const,
            id: user.user_id,
            title: user.display_name || user.username,
            subtitle: `@${user.username}`,
            avatar: user.avatar_url,
            badges: [user.rank, `${user.xp_points} XP`]
          })),
          ...(roasts || []).map(roast => ({
            type: 'roast' as const,
            id: roast.id,
            title: roast.content.slice(0, 60) + (roast.content.length > 60 ? '...' : ''),
            subtitle: `by @${roast.profiles?.username} • ${roast.likes_count} likes`,
            badges: ['Roast']
          })),
          ...(debates || []).map(debate => ({
            type: 'debate' as const,
            id: debate.id,
            title: debate.title,
            subtitle: `by @${debate.profiles?.username}`,
            badges: [debate.status]
          }))
        ];

        setResults(searchResults);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(searchContent, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSelect = (result: SearchResult) => {
    onSelect?.(result);
    setIsOpen(false);
    setQuery('');
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'user': return <User className="h-4 w-4" />;
      case 'roast': return <MessageSquare className="h-4 w-4" />;
      case 'debate': return <Users className="h-4 w-4" />;
      default: return <Search className="h-4 w-4" />;
    }
  };

  const getResultLink = (result: SearchResult) => {
    switch (result.type) {
      case 'user': return `/profile/${result.subtitle?.slice(1)}`;
      case 'roast': return '/roasts';
      case 'debate': return '/debates';
      default: return '/';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input 
          placeholder="Search roasts, debates, users..." 
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          className="pl-10 bg-muted/50 border-0 focus:bg-background transition-colors"
          data-tutorial="search"
        />
      </div>

      {isOpen && (query.length >= 2 || results.length > 0) && (
        <Card className="absolute top-full mt-1 w-full z-50 max-h-96 overflow-y-auto">
          <CardContent className="p-2">
            {loading ? (
              <div className="text-center py-4 text-muted-foreground">
                Searching...
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-1">
                {results.map((result) => (
                  <Link
                    key={`${result.type}-${result.id}`}
                    to={getResultLink(result)}
                    onClick={() => handleSelect(result)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                  >
                    {result.avatar ? (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={result.avatar} />
                        <AvatarFallback>
                          {result.title.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        {getResultIcon(result.type)}
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{result.title}</p>
                      {result.subtitle && (
                        <p className="text-sm text-muted-foreground truncate">
                          {result.subtitle}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {result.badges?.map((badge, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            ) : query.length >= 2 ? (
              <div className="text-center py-4 text-muted-foreground">
                No results found for "{query}"
              </div>
            ) : null}
          </CardContent>
        </Card>
      )}
    </div>
  );
}