CREATE TABLE membership (
  id SERIAL PRIMARY KEY NOT NULL,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  password TEXT NOT NULL,
  fileName_image TEXT,
  balance INT DEFAULT 0,
  limit_login INT DEFAULT 0,
  block_account_date TIMESTAMP NOT NULL DEFAULT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true
)

CREATE TABLE banners (
  id SERIAL PRIMARY KEY NOT NULL,
  banner_name TEXT NOT NULL,
  banner_image TEXT NOT NULL,
  description TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true
)

CREATE TABLE services (
  id SERIAL PRIMARY KEY NOT NULL,
  service_code TEXT NOT NULL,
  service_name TEXT NOT NULL,
  service_icon TEXT NOT NULL,
  service_tarif INT NOT NULL,
  is_active BOOLEAN DEFAULT true
)

CREATE TABLE transaction (
  id SERIAL PRIMARY KEY NOT NULL,
  invoice_number TEXT NOT NULL,
  transaction_type TEXT NOT NULL,
  service_id INT REFERENCES services (id),
  total_amount INT NOT NULL,
  created_on TIMESTAMP NOT NULL DEFAULT NOW(),
  membership_id INT REFERENCES membership (id),
  is_active BOOLEAN NOT NULL DEFAULT true
)