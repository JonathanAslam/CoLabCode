import React from 'react';
import PropTypes from 'prop-types';

import './Etherpad.css';

const etherpadBaseUrl = import.meta.env.VITE_ETHERPAD_BASE_URL;

const Etherpad = ({ padName }) => {
  if (!etherpadBaseUrl) {
    return (
      <div className="etherpad-message error">
        <strong>Configuration Error:</strong> The Etherpad base URL is not set in your
        environment variables.
      </div>
    );
  }

  if (!padName) {
    return (
      <div className="etherpad-message warning">
        <strong>Usage Error:</strong> Please provide a 'padName' prop to the Etherpad
        component.
      </div>
    );
  }

  const padUrl = `${etherpadBaseUrl}${padName}`;

  return (
    <div className="etherpad-container">
      <iframe
        src={padUrl}
        title={`Etherpad: ${padName}`}
        className="etherpad-iframe"
        frameBorder="0"
        allow="storage-access *"
      />
    </div>
  );
};

Etherpad.propTypes = {
  padName: PropTypes.string.isRequired,
};

export default Etherpad;