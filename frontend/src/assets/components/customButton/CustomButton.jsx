import React from 'react';
import PropTypes from 'prop-types';
import './CustomButton.css';
import { RiArrowRightUpBoxLine } from "react-icons/ri";

const CustomButton = ({ label, onClick, type = 'button', disabled = false, className = '' }) => {
    return (
        <button
            type={type}
            className={`custom-button ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            <span className="custom-button__label">{label}</span>
            <RiArrowRightUpBoxLine className="custom-button__icon" aria-hidden="false" />
        </button>
    );
};

CustomButton.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    disabled: PropTypes.bool,
    className: PropTypes.string,
};

export default CustomButton;