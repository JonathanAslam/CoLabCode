import React from "react";
import Etherpad from "../../components/etherpad/Etherpad";

const Document = () => {
  // Example pad name; in a real application, this could be dynamic
  const padName = "example-pad";

  return (
    <div style={{ height: '100vh' }}>
      <h1>Document Collaboration</h1>
      <Etherpad padName={padName} />
    </div>
  );
}
export default Document;