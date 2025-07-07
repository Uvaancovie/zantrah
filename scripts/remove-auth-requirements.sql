-- Remove RLS from user_profiles to allow public access
ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;

-- Remove user_id foreign key constraint to auth.users
ALTER TABLE user_profiles DROP CONSTRAINT IF EXISTS user_profiles_user_id_fkey;

-- Make user_id nullable and not required to be from auth.users
ALTER TABLE user_profiles ALTER COLUMN user_id DROP NOT NULL;

-- Add a simple public_id for identification instead
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS public_id UUID DEFAULT gen_random_uuid() UNIQUE;

-- Remove verification_requests dependency on auth.users
ALTER TABLE verification_requests DISABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own verification requests" ON verification_requests;
DROP POLICY IF EXISTS "Users can insert own verification requests" ON verification_requests;
DROP POLICY IF EXISTS "Users can update own verification requests" ON verification_requests;

-- Remove foreign key constraint
ALTER TABLE verification_requests DROP CONSTRAINT IF EXISTS verification_requests_user_id_fkey;
ALTER TABLE verification_requests ALTER COLUMN user_id DROP NOT NULL;

-- Add profile_id to link to user_profiles instead
ALTER TABLE verification_requests ADD COLUMN IF NOT EXISTS profile_id UUID REFERENCES user_profiles(id);

-- Remove auth trigger since we don't need it
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

-- Grant public access to tables
GRANT ALL ON user_profiles TO anon, authenticated;
GRANT ALL ON verification_requests TO anon, authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Remove storage policies that depend on auth
DROP POLICY IF EXISTS "Users can upload verification documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can view own verification documents" ON storage.objects;

-- Create simple storage policies for public access
CREATE POLICY "Anyone can upload verification documents" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'verification-documents');

CREATE POLICY "Anyone can view verification documents" ON storage.objects
  FOR SELECT USING (bucket_id = 'verification-documents');
