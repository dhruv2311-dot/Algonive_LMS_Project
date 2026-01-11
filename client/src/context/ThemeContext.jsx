import { createContext, useContext } from 'react';

// Monochrome theme - no theme toggle needed, always black and white
const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Monochrome theme - always black and white
  return (
    <ThemeContext.Provider value={{ theme: 'monochrome' }}>
      {children}
    </ThemeContext.Provider>
  );
};
