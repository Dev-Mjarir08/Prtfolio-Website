import { FiMoon, FiSun } from 'react-icons/fi';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const current = document.documentElement.dataset.theme || 'dark';
    setTheme(current);
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('jarir-theme', next);
    setTheme(next);
  };

  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label="Toggle theme" data-cursor="magnetic">
      {theme === 'dark' ? <FiSun /> : <FiMoon />}
    </button>
  );
}
