import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { THEMES, ThemeId } from '../types/theme';
import { Palette, Check } from 'lucide-react';

export const ThemeSwitcher: React.FC = () => {
  const { currentTheme, setTheme, themeConfig } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-stone-200 bg-white/90 hover:bg-stone-50 transition-all text-xs font-medium text-stone-700 shadow-sm"
        title="Change Website Color Palette"
      >
        <span 
          className="w-3.5 h-3.5 rounded-full shadow-inner ring-1 ring-black/10 shrink-0" 
          style={{ backgroundColor: themeConfig.previewColor }}
        />
        <span className="hidden xl:inline">{themeConfig.name}</span>
        <Palette className="w-3.5 h-3.5 text-stone-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 p-2 bg-white rounded-2xl shadow-xl border border-stone-200 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="px-2.5 py-1.5 border-b border-stone-100 mb-1">
            <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider block">
              Color Schemes
            </span>
          </div>

          <div className="space-y-1">
            {(Object.keys(THEMES) as ThemeId[]).map((id) => {
              const th = THEMES[id];
              const isSelected = currentTheme === id;
              return (
                <button
                  key={id}
                  onClick={() => {
                    setTheme(id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-all text-left ${
                    isSelected
                      ? 'bg-stone-100 text-stone-900 font-semibold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-4 h-4 rounded-full ring-2 ring-white shadow-sm shrink-0"
                      style={{ backgroundColor: th.previewColor }}
                    />
                    <div>
                      <span className="block leading-tight">{th.name}</span>
                    </div>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-stone-800" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
