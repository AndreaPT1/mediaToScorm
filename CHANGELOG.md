# Changelog

All notable changes to this project will be documented in this file.

## [2.0.0] - 2025-11-02

### 🎨 Added - Personalizzazione Tema

- **ThemeContext**: sistema centralizzato gestione temi con React Context
- **Color Picker**: selettore colore primario con preset e input esadecimale
- **Button Styles**: tre varianti (filled, outline, gradient)
- **Button Radius**: tre opzioni (square, medium, pill)
- **Typography**: tre font stack (system, serif, mono) con scala dimensioni
- **Theme Presets**: salvataggio/caricamento temi personalizzati
- **ThemeCustomizer**: modal completo per personalizzazione
- **ThemedButton**: componente riutilizzabile per pulsanti tematizzati
- **CSS Variables**: sistema dinamico per applicazione tema (`--theme-primary`, `--theme-button-radius`, ecc.)

### ✏️ Added - Controllo Contenuti Generati

- **Question Selection**: checkbox per selezione/deselezione domande
- **Select All/None**: pulsante per selezione batch
- **Question Counter**: contatore domande selezionate
- **Drag & Drop Reordering**: riordinamento domande con feedback visivo
- **Inline Editing**: modifica obiettivi e stem domande
- **Difficulty Filter**: filtro per livello difficoltà (easy/medium/hard)
- **Type Filter**: filtro per tipo domanda (mcq/true_false/short_answer)
- **Tag Display**: visualizzazione tag generati dall'IA
- **Timestamp Display**: riferimenti temporali al video sorgente
- **Enhanced UI**: card domande con stati visivi (selected, editing, dragging)

### 💾 Added - Produttività

- **ProgressBar**: barra avanzamento con navigazione tra step
- **SessionContext**: sistema salvataggio/ripristino sessione
- **Auto-save**: salvataggio automatico stato applicazione
- **Session Restore**: prompt ripristino sessione all'avvio
- **Quiz History**: cronologia ultime 20 generazioni
- **History Restore**: ripristino rapido generazioni precedenti
- **ToastContext**: sistema notifiche toast
- **Toast Types**: success, error, warning, info con icone
- **Floating Action Buttons**: pulsanti rapidi per tema, sessione, cronologia
- **History Menu**: dropdown contestuale per cronologia quiz

### 🎯 Changed

- **App.tsx**: refactoring con provider multipli (Theme, Toast, Session)
- **GenerateStep.tsx**: UI completamente rinnovata con nuove funzionalità
- **index.css**: aggiunta CSS variables e animazioni toast

### 📚 Added - Documentazione

- **docs/piano-personalizzazione-ux.md**: piano originale funzionalità
- **docs/implementazione-completata.md**: riepilogo tecnico implementazione
- **docs/guida-rapida-nuove-funzionalita.md**: guida utente completa
- **README.md**: aggiornato con nuove funzionalità
- **CHANGELOG.md**: questo file

### 🔧 Technical

- **LocalStorage Keys**: 
  - `video-scorm-theme`: tema corrente
  - `video-scorm-theme-presets`: preset salvati
  - `video-scorm-session`: sessione corrente
  - `video-scorm-sessions-list`: storico sessioni
  - `video-scorm-quiz-history`: cronologia quiz

- **New Files**:
  - `contexts/ThemeContext.tsx`
  - `contexts/ToastContext.tsx`
  - `contexts/SessionContext.tsx`
  - `components/ThemeCustomizer.tsx`
  - `components/ThemedButton.tsx`
  - `components/ProgressBar.tsx`

### ✅ Compatibility

- ✅ Nessuna modifica a `scormService.ts` (logica SCORM preservata)
- ✅ Backward compatibility mantenuta
- ✅ Dark mode supportato su tutte le nuove UI
- ✅ Responsive design su tutti i componenti

---

## [1.0.0] - Initial Release

### Added

- Upload video MP4
- Trascrizione audio con Gemini
- Generazione automatica quiz con AI
- Supporto SCORM 1.2 e 2004
- Export pacchetto SCORM
- Dark mode
- Header con theme toggle

### Features

- Generazione obiettivi di apprendimento
- Domande multiple-choice, vero/falso, risposta breve
- Classificazione difficoltà (easy/medium/hard)
- Livelli cognitivi (recall/understand/apply)
- Timestamp sorgente per ogni domanda
- Tag automatici per categorizzazione
