import type { CSSProperties } from 'react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

interface PhoneFieldProps {
  value: string;
  onChange: (phone: string) => void;
  placeholder?: string;
  hasError?: boolean;
  dark?: boolean;
  height?: number;
}

export default function PhoneField({ value, onChange, placeholder, hasError, dark, height = 44 }: PhoneFieldProps) {
  const style = {
    '--react-international-phone-height': `${height}px`,
    '--react-international-phone-border-radius': '8px',
    '--react-international-phone-font-size': '14px',
    '--react-international-phone-border-color': hasError
      ? '#ef4444'
      : dark ? 'rgba(255,255,255,0.1)' : '#e5e7eb',
    '--react-international-phone-background-color': dark ? 'rgba(255,255,255,0.05)' : '#ffffff',
    '--react-international-phone-text-color': dark ? '#ffffff' : 'var(--color-neutral-charcoal)',
    '--react-international-phone-selected-dropdown-item-background-color': '#f3f4f6',
  } as CSSProperties;

  return (
    <PhoneInput
      defaultCountry="tr"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={style}
      className={`w-full rounded-lg transition-all duration-200 focus-within:ring-2 ${
        hasError ? 'focus-within:ring-red-100' : 'focus-within:ring-primary-blue/10'
      }`}
      inputClassName={`flex-1 min-w-0 ${dark ? 'placeholder:text-gray-500' : 'placeholder:text-gray-400'}`}
    />
  );
}
