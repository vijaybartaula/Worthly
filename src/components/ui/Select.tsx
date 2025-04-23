import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label: string;
  id: string;
  options: Option[];
  error?: string;
  helperText?: string;
  onChange: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({
  label,
  id,
  options,
  error,
  helperText,
  onChange,
  value,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={handleChange}
        className={`
          w-full px-3 py-2 bg-white dark:bg-gray-700 border ${
            error 
              ? 'border-red-500 dark:border-red-400' 
              : 'border-gray-300 dark:border-gray-600'
          } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent
          text-gray-900 dark:text-white transition-colors duration-200
        `}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {(error || helperText) && (
        <p className={`mt-1 text-sm ${
          error 
            ? 'text-red-600 dark:text-red-400' 
            : 'text-gray-500 dark:text-gray-400'
        }`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default Select;