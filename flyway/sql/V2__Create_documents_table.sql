-- Create documents table for collaborative editing
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on owner_id for faster queries
CREATE INDEX idx_documents_owner_id ON documents(owner_id);

-- Create index on created_at for sorting
CREATE INDEX idx_documents_created_at ON documents(created_at DESC);
