import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import './Dashboard.css'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  // TODO: ADD USER AUTHMIDDLEWARE SO ONLY AUTHENTICATED USERS CAN INTERACT W CREATE DOCUMENT BUTTON


  const navigate = useNavigate()
  const [documents, setDocuments] = useState([])
  const [documentTitle, setDocumentTitle] = useState('')

  // Load documents from localStorage on component mount
  useEffect(() => {
    const savedDocs = localStorage.getItem('documents')
    if (savedDocs) {
      setDocuments(JSON.parse(savedDocs))
    }
  }, [])

  // Create a new document with UUID
  const handleCreateDocument = () => {
    const newDoc = {
      id: uuidv4(),
      title: documentTitle || 'Untitled Document',
      createdAt: new Date().toISOString(),
      lastAccessed: new Date().toISOString()
    }

    const updatedDocs = [...documents, newDoc]
    setDocuments(updatedDocs)
    localStorage.setItem('documents', JSON.stringify(updatedDocs))
    setDocumentTitle('')

    // Navigate to the new document
    navigate(`/document/${newDoc.id}`)
  }

  // Open an existing document
  const handleOpenDocument = (docId) => {
    // Update last accessed time
    const updatedDocs = documents.map(doc => 
      doc.id === docId 
        ? { ...doc, lastAccessed: new Date().toISOString() }
        : doc
    )
    setDocuments(updatedDocs)
    localStorage.setItem('documents', JSON.stringify(updatedDocs))
    
    navigate(`/document/${docId}`)
  }

  // Delete a document
  const handleDeleteDocument = (docId) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      const updatedDocs = documents.filter(doc => doc.id !== docId)
      setDocuments(updatedDocs)
      localStorage.setItem('documents', JSON.stringify(updatedDocs))
    }
  }

  // Copy shareable link
  const handleCopyLink = (docId) => {
    const url = `${window.location.origin}/document/${docId}`
    navigator.clipboard.writeText(url)
    alert('Link copied to clipboard!')
  }

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      
      <div className="create-document-section">
        <h2>Create New Document</h2>
        <div className="create-form">
          <input
            type="text"
            placeholder="Document title (optional)"
            value={documentTitle}
            onChange={(e) => setDocumentTitle(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCreateDocument()}
          />
          <button onClick={handleCreateDocument}>Create Document</button>
        </div>
      </div>

      <div className="documents-section">
        <h2>Your Documents</h2>
        {documents.length === 0 ? (
          <p className="no-documents">No documents yet. Create your first document above!</p>
        ) : (
          <div className="documents-list">
            {documents.map((doc) => (
              <div key={doc.id} className="document-card">
                <div className="document-info">
                  <h3>{doc.title}</h3>
                  <p className="document-meta">
                    Created: {new Date(doc.createdAt).toLocaleDateString()}
                  </p>
                  <p className="document-meta">
                    Last accessed: {new Date(doc.lastAccessed).toLocaleDateString()}
                  </p>
                  <p className="document-id">ID: {doc.id}</p>
                </div>
                <div className="document-actions">
                  <button 
                    onClick={() => handleOpenDocument(doc.id)}
                    className="btn-open"
                  >
                    Open
                  </button>
                  <button 
                    onClick={() => handleCopyLink(doc.id)}
                    className="btn-share"
                  >
                    Copy Link
                  </button>
                  <button 
                    onClick={() => handleDeleteDocument(doc.id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
