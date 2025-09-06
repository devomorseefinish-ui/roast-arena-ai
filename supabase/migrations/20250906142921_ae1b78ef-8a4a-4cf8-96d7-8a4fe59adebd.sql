-- Fix critical security vulnerability: Restrict access to debate_participants table
-- This prevents exposure of sensitive financial information (payment amounts, status)

-- Drop the current overly permissive policy
DROP POLICY "Debate participants are viewable by everyone" ON public.debate_participants;

-- Create a new secure policy that only allows users to see their own participation data
CREATE POLICY "Users can view their own participation data" 
ON public.debate_participants 
FOR SELECT 
USING (auth.uid() = user_id);

-- Create a view for public participant information that debates need to function
-- This exposes only non-sensitive data needed for debate functionality
CREATE VIEW public.debate_participants_public AS
SELECT 
  dp.id,
  dp.debate_id,
  dp.user_id,
  dp.team,
  dp.role,
  dp.joined_at,
  p.username,
  p.display_name,
  p.avatar_url
FROM public.debate_participants dp
LEFT JOIN public.profiles p ON p.user_id = dp.user_id;

-- Enable RLS on the view (inherited from base table)
ALTER VIEW public.debate_participants_public SET (security_invoker = true);

-- Grant access to the public view for authenticated users
GRANT SELECT ON public.debate_participants_public TO authenticated;