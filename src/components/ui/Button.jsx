import React from 'react';

/**
 * Reusable Button component with multiple variants
 * Used throughout the application for consistent styling
 */
const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false, 
  className = '',
  ...props 
}) => {
  /**
   * Get button styles based on variant
   */
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return `
          bg-blue-600 hover:bg-blue-700 text-white
          disabled:bg-gray-400 disabled:cursor-not-allowed
        `;
      case 'secondary':
        return `
          bg-gray-200 hover:bg-gray-300 text-gray-800
          disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
        `;
      case 'ghost':
        return `
          bg-transparent hover:bg-gray-100 text-gray-700
          disabled:text-gray-400 disabled:cursor-not-allowed
        `;
      case 'disabled':
        return `
          bg-gray-400 text-white cursor-not-allowed
        `;
      default:
        return `
          bg-blue-600 hover:bg-blue-700 text-white
          disabled:bg-gray-400 disabled:cursor-not-allowed
        `;
    }
  };

  const baseStyles = `
    px-4 py-2 rounded-lg font-medium text-sm
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
    active:scale-95
  `;

  return (
    <button
      onClick={onClick}
      disabled={disabled || variant === 'disabled'}
      className={`${baseStyles} ${getVariantStyles()} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;