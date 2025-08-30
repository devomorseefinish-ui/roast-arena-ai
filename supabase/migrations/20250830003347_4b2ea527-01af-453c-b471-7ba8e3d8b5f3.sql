-- Create some test users with real data
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_user_meta_data)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'sarah@example.com', crypt('password123', gen_salt('bf')), NOW(), NOW(), NOW(), '{"username": "sarah_roaster", "display_name": "Sarah the Roaster"}'),
  ('22222222-2222-2222-2222-222222222222', 'mike@example.com', crypt('password123', gen_salt('bf')), NOW(), NOW(), NOW(), '{"username": "mike_debater", "display_name": "Mike the Debater"}'),
  ('33333333-3333-3333-3333-333333333333', 'alex@example.com', crypt('password123', gen_salt('bf')), NOW(), NOW(), NOW(), '{"username": "alex_legend", "display_name": "Alex Legend"}'),
  ('44444444-4444-4444-4444-444444444444', 'jamie@example.com', crypt('password123', gen_salt('bf')), NOW(), NOW(), NOW(), '{"username": "jamie_pro", "display_name": "Jamie Pro"}')
ON CONFLICT (id) DO NOTHING;

-- Create profiles for test users
INSERT INTO profiles (user_id, username, display_name, bio, xp_points, rank, total_earnings, followers_count, following_count, avatar_url)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'sarah_roaster', 'Sarah the Roaster', 'Professional roaster with years of experience burning people online 🔥', 2850, 'Elite', 45.50, 1250, 180, null),
  ('22222222-2222-2222-2222-222222222222', 'mike_debater', 'Mike the Debater', 'Champion debater who never backs down from a challenge 💪', 3200, 'Legend', 78.25, 980, 220, null),
  ('33333333-3333-3333-3333-333333333333', 'alex_legend', 'Alex Legend', 'Rising star in the roasting world. Watch out for my legendary burns! ⚡', 4100, 'Legend', 102.75, 2100, 350, null),
  ('44444444-4444-4444-4444-444444444444', 'jamie_pro', 'Jamie Pro', 'Quick wit, sharp tongue, and unmatched comebacks. The roast master! 🎯', 1900, 'Pro', 32.00, 750, 120, null)
ON CONFLICT (user_id) DO NOTHING;

-- Create some roasts from these users
INSERT INTO roasts (author_id, content, likes_count, comments_count, is_viral, target_user_id)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'Just saw someone claim they''re a ''social media influencer'' with 12 followers. Honey, you''re not influencing anyone except maybe your mom to worry about your career choices! 😂', 45, 12, false, null),
  ('22222222-2222-2222-2222-222222222222', 'Why do people say ''money can''t buy happiness'' when clearly it can buy pizza, and pizza makes me very happy? Checkmate, philosophy majors! 🍕', 78, 23, true, null),
  ('33333333-3333-3333-3333-333333333333', 'Shoutout to autocorrect for changing ''duck'' to something way more interesting and making my texts to my boss 1000% more awkward! 📱', 156, 34, true, null),
  ('44444444-4444-4444-4444-444444444444', 'Some people age like fine wine. Others age like milk left in the sun. We all know which category you fall into! 🥛☀️', 89, 18, false, null),
  ('11111111-1111-1111-1111-111111111111', 'Your selfie game is so weak, even your front camera tried to flip to the back one! 📸', 67, 15, false, null),
  ('33333333-3333-3333-3333-333333333333', 'I''d roast you about your fashion sense, but I don''t want to be responsible for starting a fire this big! 🔥👗', 123, 28, true, null);

-- Create some debates
INSERT INTO debates (organizer_id, title, description, debate_type, entry_fee_ngn, entry_fee_sol, max_participants, status, scheduled_at, rules)
VALUES 
  ('22222222-2222-2222-2222-222222222222', 'Pineapple on Pizza: Culinary Crime or Misunderstood Masterpiece?', 'The age-old debate that has torn families apart and ended friendships. Time to settle this once and for all!', 'Public Forum', 1000, 0.005, 4, 'scheduled', NOW() + INTERVAL '2 hours', ARRAY['No personal attacks', 'Stick to food arguments', '5 minute rounds', 'No bringing up other controversial toppings']),
  ('33333333-3333-3333-3333-333333333333', 'Is Social Media Making Us More Connected or More Isolated?', 'A deep dive into the paradox of modern digital communication and its impact on human relationships.', 'Oxford Style', 2500, 0.01, 6, 'scheduled', NOW() + INTERVAL '1 day', ARRAY['Academic sources preferred', 'No anecdotal evidence only', '10 minute opening statements', 'Respectful discourse required']),
  ('44444444-4444-4444-4444-444444444444', 'Cats vs Dogs: The Ultimate Pet Showdown', 'Which furry friend reigns supreme? Prepare your arguments and may the best species win!', 'Battle Royale', 500, 0.002, 8, 'live', NOW() - INTERVAL '30 minutes', ARRAY['Photos allowed as evidence', 'No bringing up allergies', 'Cute factor counts', 'Must own or have owned the pet you''re defending']);

-- Create some comments
INSERT INTO comments (author_id, roast_id, content, likes_count)
VALUES 
  ('22222222-2222-2222-2222-222222222222', (SELECT id FROM roasts WHERE content LIKE '%influencer%' LIMIT 1), 'Absolutely brutal! 😂 But also 100% accurate!', 8),
  ('33333333-3333-3333-3333-333333333333', (SELECT id FROM roasts WHERE content LIKE '%influencer%' LIMIT 1), 'This hits different when you have 11 followers... asking for a friend 👀', 12),
  ('44444444-4444-4444-4444-444444444444', (SELECT id FROM roasts WHERE content LIKE '%money can''t buy%' LIMIT 1), 'Philosophy majors in shambles right now 📚💔', 5),
  ('11111111-1111-1111-1111-111111111111', (SELECT id FROM roasts WHERE content LIKE '%autocorrect%' LIMIT 1), 'The second-hand embarrassment is REAL! 😅', 9);

-- Create some likes
INSERT INTO likes (user_id, roast_id)
SELECT 
  users.user_id,
  roasts.id
FROM 
  (SELECT user_id FROM profiles ORDER BY RANDOM() LIMIT 3) users
CROSS JOIN 
  (SELECT id FROM roasts ORDER BY RANDOM() LIMIT 2) roasts
ON CONFLICT DO NOTHING;

-- Create some follows
INSERT INTO follows (follower_id, following_id)
VALUES 
  ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222'),
  ('11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333'),
  ('22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333'),
  ('22222222-2222-2222-2222-222222222222', '44444444-4444-4444-4444-444444444444'),
  ('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111'),
  ('44444444-4444-4444-4444-444444444444', '33333333-3333-3333-3333-333333333333')
ON CONFLICT DO NOTHING;

-- Create some notifications
INSERT INTO notifications (user_id, type, title, message, related_id)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'like', 'New Like!', 'Mike the Debater liked your roast', (SELECT id FROM roasts WHERE author_id = '11111111-1111-1111-1111-111111111111' LIMIT 1)),
  ('22222222-2222-2222-2222-222222222222', 'follow', 'New Follower!', 'Sarah the Roaster started following you', null),
  ('33333333-3333-3333-3333-333333333333', 'comment', 'New Comment!', 'Jamie Pro commented on your roast', (SELECT id FROM roasts WHERE author_id = '33333333-3333-3333-3333-333333333333' LIMIT 1))
ON CONFLICT DO NOTHING;