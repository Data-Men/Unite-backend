--This extension is for generating uuid
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    category VARCHAR(50) NOT NULL
);
CREATE TABLE communities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    profile_pic TEXT,
    banner_img TEXT,
    privacy_status VARCHAR(10) NOT NULL,
    created_by VARCHAR(200) NOT NUll,
    created_at TIMESTAMPTZ NOT NULL
);
CREATE TABLE community_tags (
    id SERIAL PRIMARY KEY,
    tag_id SERIAL REFERENCES tags(id) NOT NULL,
    community_id UUID REFERENCES communities(id) NOT NULL
);
CREATE TABLE community_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    community_id UUID REFERENCES communities(id) NOT NULL,
    is_member BOOLEAN NOT NUll DEFAULT 't',
    user_id VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL,
    member_name VARCHAR(200) NOt NULL,
    member_pic TEXT,
    member_role VARCHAR(10) DEFAULT 'Member',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);
CREATE TABLE community_posts(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    caption TEXT,
    media JSON[],
    community_id UUID REFERENCES communities(id) NOT NULL,
    member_id UUID REFERENCES community_members(id) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE post_tags(
    id SERIAL PRIMARY KEY,
    post_id UUID REFERENCES community_posts(id) NOT NULL,
    tag_id SERIAL REFERENCES tags(id) NOT NULL
);
--category removed color added
ALTER TABLE tags   
DROP COLUMN category
ALTER TABLE tags   
Add COLUMN tag_color VARCHAR(7) DEFAULT '#3498db';

