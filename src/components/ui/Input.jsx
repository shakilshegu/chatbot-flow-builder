import React from 'react';

/**
 * Reusable Input component with consistent styling
 * Used for text inputs throughout the application
 */
const Input = ({ 
  label,
  placeholder = '',
  value = '',
  onChange,
  error = '',
  helperText = '',
  disabled = false,
  className = '',
  ...props 
}) => {
  const inputId = `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`space-y-1 ${className}`}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      {/* Input Field */}
      <input
        id={inputId}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full px-3 py-2 border rounded-lg text-sm
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${error 
            ? 'border-red-300 focus:ring-red-500' 
            : 'border-gray-300 hover:border-gray-400'
          }
        `}
        {...props}
      />

      {/* Error Message */}
      {error && (
        <p className="text-xs text-red-600">
          {error}
        </p>
      )}

      {/* Helper Text */}  
      {helperText && !error && (
        <p className="text-xs text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;