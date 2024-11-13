import React, { forwardRef } from 'react';
import { Autocomplete } from '@react-google-maps/api';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  onAutocompleteLoad?: (autocomplete: google.maps.places.Autocomplete) => void;
  onSelect?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  className = '',
  onAutocompleteLoad,
  onSelect,
  ...props
}, ref) => {
  if (onAutocompleteLoad && onSelect) {
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <Autocomplete
          onLoad={onAutocompleteLoad}
          onPlaceChanged={onSelect}
        >
          <input
            ref={ref}
            className={`
              w-full px-3 py-2 border rounded-lg shadow-sm
              focus:outline-none focus:ring-2 focus:ring-[#f27f0c] focus:border-[#f27f0c]
              ${error ? 'border-red-500' : 'border-gray-300'}
              ${className}
            `}
            {...props}
          />
        </Autocomplete>
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`
          w-full px-3 py-2 border rounded-lg shadow-sm
          focus:outline-none focus:ring-2 focus:ring-[#f27f0c] focus:border-[#f27f0c]
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';