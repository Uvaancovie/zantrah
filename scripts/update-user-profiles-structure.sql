-- Add email column to user_profiles if it doesn't exist
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS email TEXT;

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);

-- Update verification_requests to use profile_id instead of user_id
-- (This was already added in the previous script, but ensuring it's there)
ALTER TABLE verification_requests ADD COLUMN IF NOT EXISTS profile_id UUID REFERENCES user_profiles(id);

-- Create index on profile_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_verification_requests_profile_id ON verification_requests(profile_id);
