import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface ThemedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

const ThemedButton: React.FC<ThemedButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}) => {
  const { theme } = useTheme();

  const getButtonStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      borderRadius: `var(--theme-button-radius)`,
      transition: 'all 0.2s ease',
    };

    if (variant === 'secondary') {
      return {
        ...baseStyle,
        border: '2px solid',
        borderColor: 'currentColor',
      };
    }

    if (variant === 'outline') {
      return {
        ...baseStyle,
        border: '2px solid',
        borderColor: theme.primaryColor,
        color: theme.primaryColor,
        backgroundColor: 'transparent',
      };
    }

    // Primary variant
    if (theme.buttonStyle === 'filled') {
      return {
        ...baseStyle,
        backgroundColor: theme.primaryColor,
        color: 'white',
      };
    } else if (theme.buttonStyle === 'outline') {
      return {
        ...baseStyle,
        border: `2px solid ${theme.primaryColor}`,
        color: theme.primaryColor,
        backgroundColor: 'transparent',
      };
    } else {
      // gradient
      return {
        ...baseStyle,
        background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.primaryColor}dd)`,
        color: 'white',
      };
    }
  };

  return (
    <button
      style={getButtonStyle()}
      className={`px-6 py-2 font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default ThemedButton;
