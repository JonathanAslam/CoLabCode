# Document Management with UUIDs

## Overview
This guide explains how to create, share, and manage collaborative documents using unique UUIDs.

## How It Works

### 1. Document Creation
- Each document gets a unique UUID (e.g., `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)
- Documents are created from the Dashboard
- Document metadata (title, creation date, last accessed) is stored in localStorage (frontend only for now)

### 2. Document Access
- Documents are accessed via: `/document/:uuid`
- The UUID is passed to Etherpad as the pad name
- Anyone with the UUID can access the document

### 3. Document Sharing
- Click "Copy Link" on any document in the Dashboard
- Share the link with collaborators
- Example: `http://localhost:5173/document/a1b2c3d4-e5f6-7890-abcd-ef1234567890`

---

## User Guide

### Creating a New Document

1. Navigate to the **Dashboard** (`/dashboard`)
2. Enter an optional document title
3. Click **"Create Document"**
4. You'll be redirected to the new document's Etherpad editor

### Opening an Existing Document

**From Dashboard:**
- Click the **"Open"** button on any document card

**Direct Link:**
- Navigate to `/document/:uuid` in your browser
- Or use a shared link from a collaborator

### Sharing a Document

1. Go to the Dashboard
2. Find the document you want to share
3. Click **"Copy Link"**
4. Share the copied URL with collaborators

### Deleting a Document

1. Go to the Dashboard
2. Click **"Delete"** on the document you want to remove
3. Confirm the deletion

**Note:** This only removes the document from your local list. The Etherpad pad itself is not deleted and can still be accessed if someone has the UUID.

---

## Technical Implementation

### Frontend Architecture

#### Routes
```jsx
// App.jsx
<Route path='/document/:documentId' element={<Document/>}></Route>
```

#### Document Component
```jsx
// Document.jsx
const { documentId } = useParams()  // Extract UUID from URL
<Etherpad padName={documentId} />   // Pass UUID to Etherpad
```

#### Dashboard Component
- **Create Document:** Generates UUID with `uuidv4()`
- **Store Metadata:** Saves to localStorage
- **List Documents:** Displays all created documents
- **Copy Link:** Copies shareable URL to clipboard

### Data Storage

**Current:** localStorage (frontend only)
```json
{
  "id": "uuid-here",
  "title": "My Document",
  "createdAt": "2025-10-20T12:00:00.000Z",
  "lastAccessed": "2025-10-20T14:30:00.000Z"
}
```

**Future:** Backend database (see Backend Integration section below)

### Etherpad Integration

Documents are mapped 1:1 to Etherpad pads:
- Document UUID = Etherpad pad name
- URL: `/etherpad/p/:uuid`
- Proxied through Vite (dev) or Nginx (prod)

---

## Backend Integration (Optional/Future)

To persist documents across devices and users, you can add backend support:

### 1. Database Schema

```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  owner_id INTEGER REFERENCES users(id),
  is_public BOOLEAN DEFAULT false
);

CREATE TABLE document_collaborators (
  document_id UUID REFERENCES documents(id),
  user_id INTEGER REFERENCES users(id),
  permission VARCHAR(20) DEFAULT 'edit', -- 'view', 'edit', 'admin'
  PRIMARY KEY (document_id, user_id)
);
```

### 2. Backend API Endpoints

```javascript
// Document routes
POST   /api/documents          // Create new document
GET    /api/documents          // List user's documents
GET    /api/documents/:id      // Get document metadata
PUT    /api/documents/:id      // Update document
DELETE /api/documents/:id      // Delete document
POST   /api/documents/:id/share // Share with user
```

### 3. Update Frontend to Use API

```jsx
// Instead of localStorage
const createDocument = async (title) => {
  const response = await fetch('/api/documents', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  })
  const doc = await response.json()
  navigate(`/document/${doc.id}`)
}
```

---

## Security Considerations

### Current Implementation (No Auth)
- ⚠️ Anyone with the UUID can access the document
- ⚠️ No ownership or permissions
- ⚠️ Documents stored in localStorage are browser-specific

### Recommended Improvements

1. **Authentication**
   - Require login to create documents
   - Track document ownership

2. **Authorization**
   - Public vs Private documents
   - Viewer vs Editor permissions
   - Share with specific users only

3. **UUID Security**
   - UUIDs are hard to guess (128-bit)
   - Use UUIDv4 for cryptographically random IDs
   - Consider adding access tokens for extra security

4. **Rate Limiting**
   - Limit document creation per user
   - Prevent brute-force UUID guessing

---

## Usage Examples

### Example 1: Create and Share
```
1. User A creates "Project Plan" → UUID: abc123...
2. User A clicks "Copy Link"
3. User A shares: http://localhost:5173/document/abc123...
4. User B opens link → Both users can edit simultaneously
```

### Example 2: Direct Access
```
1. User knows UUID: def456...
2. User navigates to: /document/def456...
3. Etherpad loads the pad immediately
```

### Example 3: Bookmark
```
1. User works on document: xyz789...
2. User bookmarks: http://localhost:5173/document/xyz789...
3. Returns anytime via bookmark
```

---

## Troubleshooting

### Document Not Loading
- **Check UUID:** Ensure the UUID in the URL is valid
- **Check Etherpad:** Verify Etherpad container is running
- **Check Proxy:** Ensure proxy configuration is correct

### Can't Find My Documents
- **localStorage:** Documents are stored per browser
- **Clear Cache:** Don't clear localStorage or documents will be lost
- **Solution:** Implement backend storage for persistence

### Someone Else's Content in My Document
- **Shared Etherpad:** If two users create documents with the same UUID (extremely unlikely), they'll share content
- **Probability:** Virtually impossible with UUIDv4 (1 in 2^122)

---

## Next Steps

1. ✅ **Basic Implementation Complete**
   - UUID generation
   - Dynamic routing
   - Dashboard management
   - Shareable links

2. 🔄 **Recommended Enhancements**
   - Add user authentication
   - Implement backend API
   - Add document permissions
   - Real-time document list updates

3. 🎯 **Advanced Features**
   - Document templates
   - Version history
   - Export to PDF/Word
   - Document search
   - Collaborative cursors
   - Comments and annotations

---

## API Reference

### Frontend Functions

#### `handleCreateDocument()`
Creates a new document with UUID and navigates to it.

#### `handleOpenDocument(docId)`
Opens an existing document and updates last accessed time.

#### `handleDeleteDocument(docId)`
Removes document from localStorage (confirmation required).

#### `handleCopyLink(docId)`
Copies shareable document URL to clipboard.

### LocalStorage Keys

- **Key:** `documents`
- **Type:** JSON Array
- **Schema:** `[{ id, title, createdAt, lastAccessed }]`

---

## Migration Guide

If you later add backend storage, here's how to migrate:

```jsx
// 1. Export from localStorage
const exportDocuments = () => {
  const docs = localStorage.getItem('documents')
  return JSON.parse(docs || '[]')
}

// 2. Sync to backend
const syncToBackend = async () => {
  const localDocs = exportDocuments()
  for (const doc of localDocs) {
    await fetch('/api/documents/import', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doc)
    })
  }
}

// 3. Clear localStorage after successful sync
localStorage.removeItem('documents')
```
