import React from "react";
import { useParams } from "react-router-dom";
import Etherpad from "../../components/etherpad/Etherpad";

const Document = () => {
  // Get the document UUID from the URL parameter
  const { documentId } = useParams();

  return (
    <div style={{ height: '100vh' }}>
      <h1>Document Collaboration</h1>
      {documentId ? (
        <Etherpad padName={documentId} />
      ) : (
        <div className="etherpad-message error">
          <strong>Error:</strong> No document ID provided in URL
        </div>
      )}
    </div>
  );
}
export default Document;