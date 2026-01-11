import React from 'react'
import './Button.css'

const Button = ({ text, onClick, className }) => {
    return (
        <button
        // allows the classname to be overwritten 
            className={`button${className ? ' ' + className : ''}`}
            type="button"
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export default Button