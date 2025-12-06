'use client';
import { FC, ChangeEvent, useState } from 'react';
import { LucideIcon, Eye, EyeOff } from 'lucide-react';

interface AuraInputProps {
  id: string;
  label: string;
  type?: string;
  icon: LucideIcon;
  placeholder?: string;
  name: string; // Required for form data submission
  error?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: FC<AuraInputProps> = ({
  id,
  label,
  type = 'text',
  icon: Icon,
  placeholder,
  name,
  error,
  value = '',
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Determine input appearance for date type
  const isDateInput = type === 'date';
  const isPasswordInput = type === 'password';
  const inputClass = isDateInput ? (value ? 'text-gray-800' : 'text-gray-400') : 'text-gray-800';
  const displayType = isPasswordInput && showPassword ? 'text' : type;

  return (
    <div className="relative mb-6">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 sr-only">
        {label}
      </label>
      <div
        className={`flex items-center bg-white rounded-xl shadow-inner transition-colors duration-300 border-2
                ${error ? 'border-red-600' : 'border-clam-shell focus-within:border-wistful'}
                `}
      >
        <span className="p-3 text-gray-400">
          <Icon className="w-5 h-5" />
        </span>
        <input
          id={id}
          name={name} // MUST match the key used in Server Action (formData.get(name))
          type={displayType}
          value={value}
          placeholder={isDateInput ? '' : placeholder || label}
          onChange={onChange}
          className={`w-full p-3 bg-transparent placeholder-gray-400 focus:outline-none rounded-r-xl appearance-none font-sans ${inputClass}`}
          required
        />
        {isPasswordInput && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="p-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {error && <p className="text-red-600 text-xs mt-2 font-medium"> {error} </p>}
    </div>
  );
};

export default FormInput;
