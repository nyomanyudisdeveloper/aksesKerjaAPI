CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT, 
  password TEXT, 
  isGmail BOOLEAN DEFAULT false, 
  isFacebook BOOLEAN DEFAULT false, 
  is_active BOOLEAN DEFAULT true, 
)
