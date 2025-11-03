import React, { useState } from 'react';
import { useTheme, ButtonStyle, ButtonRadius, FontStack, FontScale } from '../contexts/ThemeContext';

interface ThemeCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({ isOpen, onClose }) => {
  const { theme, updateTheme, resetTheme, savePreset, loadPreset, deletePreset, presets } = useTheme();
  const [presetName, setPresetName] = useState('');
  const [showPresetInput, setShowPresetInput] = useState(false);

  if (!isOpen) return null;

  const colorPresets = [
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Green', value: '#10b981' },
    { name: 'Orange', value: '#f59e0b' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Red', value: '#ef4444' },
  ];

  const handleSavePreset = () => {
    if (presetName.trim()) {
      savePreset(presetName.trim());
      setPresetName('');
      setShowPresetInput(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Personalizza Tema</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Primary Color */}
          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-900 dark:text-white">
              Colore Primario
            </label>
            <div className="flex items-center gap-4 mb-3">
              <input
                type="color"
                value={theme.primaryColor}
                onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                className="h-12 w-20 rounded cursor-pointer border-2 border-gray-300 dark:border-gray-600"
              />
              <input
                type="text"
                value={theme.primaryColor}
                onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="#3b82f6"
              />
            </div>
            <div className="grid grid-cols-6 gap-2">
              {colorPresets.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => updateTheme({ primaryColor: preset.value })}
                  className="h-10 rounded border-2 transition-all hover:scale-105"
                  style={{ 
                    backgroundColor: preset.value,
                    borderColor: theme.primaryColor === preset.value ? '#000' : 'transparent'
                  }}
                  title={preset.name}
                />
              ))}
            </div>
          </div>

          {/* Button Style */}
          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-900 dark:text-white">
              Stile Pulsanti
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['filled', 'outline', 'gradient'] as ButtonStyle[]).map((style) => (
                <button
                  key={style}
                  onClick={() => updateTheme({ buttonStyle: style })}
                  className={`px-4 py-3 rounded-md font-medium transition-all ${
                    theme.buttonStyle === style
                      ? 'ring-2 ring-offset-2 ring-gray-900 dark:ring-white'
                      : ''
                  }`}
                  style={
                    style === 'filled'
                      ? { backgroundColor: theme.primaryColor, color: 'white' }
                      : style === 'outline'
                      ? { border: `2px solid ${theme.primaryColor}`, color: theme.primaryColor }
                      : { background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.primaryColor}dd)`, color: 'white' }
                  }
                >
                  {style === 'filled' ? 'Riempito' : style === 'outline' ? 'Contorno' : 'Sfumato'}
                </button>
              ))}
            </div>
          </div>

          {/* Button Radius */}
          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-900 dark:text-white">
              Raggio Angoli
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['square', 'medium', 'pill'] as ButtonRadius[]).map((radius) => (
                <button
                  key={radius}
                  onClick={() => updateTheme({ buttonRadius: radius })}
                  className={`px-4 py-3 font-medium transition-all ${
                    theme.buttonRadius === radius
                      ? 'ring-2 ring-offset-2 ring-gray-900 dark:ring-white'
                      : ''
                  }`}
                  style={{
                    backgroundColor: theme.primaryColor,
                    color: 'white',
                    borderRadius: radius === 'square' ? '0' : radius === 'medium' ? '0.375rem' : '9999px'
                  }}
                >
                  {radius === 'square' ? 'Squadrato' : radius === 'medium' ? 'Medio' : 'Pill'}
                </button>
              ))}
            </div>
          </div>

          {/* Font Stack */}
          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-900 dark:text-white">
              Famiglia Font
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['system', 'serif', 'mono'] as FontStack[]).map((font) => (
                <button
                  key={font}
                  onClick={() => updateTheme({ fontStack: font })}
                  className={`px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-md transition-all ${
                    theme.fontStack === font
                      ? 'ring-2 ring-offset-2 ring-gray-900 dark:ring-white bg-gray-100 dark:bg-gray-700'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  style={{
                    fontFamily: font === 'system' 
                      ? '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                      : font === 'serif'
                      ? 'Georgia, Cambria, "Times New Roman", Times, serif'
                      : '"SF Mono", Monaco, Consolas, "Courier New", monospace'
                  }}
                >
                  {font === 'system' ? 'System' : font === 'serif' ? 'Serif' : 'Mono'}
                </button>
              ))}
            </div>
          </div>

          {/* Font Scale */}
          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-900 dark:text-white">
              Dimensione Testo
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['small', 'medium', 'large'] as FontScale[]).map((scale) => (
                <button
                  key={scale}
                  onClick={() => updateTheme({ fontScale: scale })}
                  className={`px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-md transition-all ${
                    theme.fontScale === scale
                      ? 'ring-2 ring-offset-2 ring-gray-900 dark:ring-white bg-gray-100 dark:bg-gray-700'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  style={{
                    fontSize: scale === 'small' ? '0.875rem' : scale === 'medium' ? '1rem' : '1.125rem'
                  }}
                >
                  {scale === 'small' ? 'Piccolo' : scale === 'medium' ? 'Medio' : 'Grande'}
                </button>
              ))}
            </div>
          </div>

          {/* Presets */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                Temi Salvati
              </label>
              <button
                onClick={() => setShowPresetInput(!showPresetInput)}
                className="text-sm px-3 py-1 rounded-md"
                style={{ backgroundColor: theme.primaryColor, color: 'white' }}
              >
                Salva Tema Corrente
              </button>
            </div>

            {showPresetInput && (
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={presetName}
                  onChange={(e) => setPresetName(e.target.value)}
                  placeholder="Nome del tema..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  onKeyDown={(e) => e.key === 'Enter' && handleSavePreset()}
                />
                <button
                  onClick={handleSavePreset}
                  className="px-4 py-2 rounded-md text-white"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  Salva
                </button>
              </div>
            )}

            <div className="space-y-2">
              {presets.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">Nessun tema salvato</p>
              ) : (
                presets.map((preset) => (
                  <div
                    key={preset.name}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md"
                  >
                    <span className="font-medium text-gray-900 dark:text-white">{preset.name}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => loadPreset(preset.name)}
                        className="px-3 py-1 text-sm rounded-md bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-500"
                      >
                        Carica
                      </button>
                      <button
                        onClick={() => deletePreset(preset.name)}
                        className="px-3 py-1 text-sm rounded-md bg-red-500 text-white hover:bg-red-600"
                      >
                        Elimina
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Reset */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <button
              onClick={resetTheme}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-md font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Ripristina Tema Predefinito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeCustomizer;
