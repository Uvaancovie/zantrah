-- Create verification_requests table
CREATE TABLE IF NOT EXISTS verification_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  age INTEGER NOT NULL,
  nationality TEXT NOT NULL,
  id_number TEXT NOT NULL,
  id_document_url TEXT,
  proof_of_address_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'video_scheduled')),
  video_call_scheduled_at TIMESTAMP WITH TIME ZONE,
  video_call_completed_at TIMESTAMP WITH TIME ZONE,
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE verification_requests ENABLE ROW LEVEL SECURITY;

-- Users can only see their own verification requests
CREATE POLICY "Users can view own verification requests" ON verification_requests
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own verification requests
CREATE POLICY "Users can insert own verification requests" ON verification_requests
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own verification requests (for rescheduling video calls)
CREATE POLICY "Users can update own verification requests" ON verification_requests
  FOR UPDATE USING (auth.uid() = user_id);

-- Create storage bucket for verification documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('verification-documents', 'verification-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies
CREATE POLICY "Users can upload verification documents" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'verification-documents' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view own verification documents" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'verification-documents' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_verification_requests_updated_at
  BEFORE UPDATE ON verification_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
