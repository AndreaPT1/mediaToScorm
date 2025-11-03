<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Video→SCORM Quiz Generator

Genera automaticamente quiz interattivi SCORM da video utilizzando l'IA di Google Gemini.

View your app in AI Studio: https://ai.studio/apps/drive/1Vp6BoDNYrKm6GNQIrONIOoxFr4QFl7Un

## ✨ Nuove Funzionalità UX

L'applicazione è stata potenziata con funzionalità avanzate di personalizzazione e controllo:

### 🎨 Personalizzazione Tema
- **Colori personalizzati**: scegli il colore primario con color picker o codice esadecimale
- **Stili pulsanti**: riempito, contorno o sfumato
- **Raggio angoli**: squadrato, medio o pill
- **Tipografia**: system, serif o mono con scala dimensioni
- **Preset salvabili**: crea e salva temi personalizzati

### ✏️ Controllo Quiz Generati
- **Selezione domande**: checkbox per includere/escludere domande specifiche
- **Riordinamento drag & drop**: riordina domande per importanza
- **Editor in-line**: modifica testi di domande e obiettivi
- **Filtri avanzati**: filtra per difficoltà e tipo di domanda
- **Visualizzazione timestamp**: riferimenti al video sorgente

### 💾 Produttività
- **Barra di avanzamento**: visualizza e naviga tra gli step
- **Auto-salvataggio**: sessione salvata automaticamente
- **Cronologia generazioni**: ripristina quiz precedenti
- **Notifiche toast**: feedback immediato su ogni azione

📖 **Guida completa**: vedi [`docs/guida-rapida-nuove-funzionalita.md`](docs/guida-rapida-nuove-funzionalita.md)

## 🚀 Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key

3. Run the app:
   ```bash
   npm run dev
   ```

4. Open http://localhost:5173 in your browser

## 📋 Workflow

1. **Upload Video** (📤): Carica il tuo video MP4
2. **Genera Quiz** (🤖): L'IA analizza il video e genera domande
   - Seleziona le domande desiderate
   - Riordina con drag & drop
   - Modifica testi se necessario
3. **Pacchetto SCORM** (📦): Configura ed esporta il pacchetto SCORM

## 🛠️ Tecnologie

- **React 19** + TypeScript
- **Vite** per build veloce
- **Tailwind CSS** per styling
- **Google Gemini AI** per generazione contenuti
- **SCORM 1.2/2004** per compatibilità LMS

## 📚 Documentazione

- [`docs/piano-personalizzazione-ux.md`](docs/piano-personalizzazione-ux.md) - Piano originale delle funzionalità
- [`docs/implementazione-completata.md`](docs/implementazione-completata.md) - Dettagli tecnici implementazione
- [`docs/guida-rapida-nuove-funzionalita.md`](docs/guida-rapida-nuove-funzionalita.md) - Guida utente

## 🎯 Features

- ✅ Generazione automatica quiz da video
- ✅ Supporto trascrizioni audio
- ✅ Domande multiple-choice, vero/falso, risposta breve
- ✅ Classificazione difficoltà e livello cognitivo
- ✅ Export SCORM 1.2 e 2004
- ✅ Personalizzazione tema completa
- ✅ Controllo granulare contenuti
- ✅ Auto-salvataggio e cronologia
- ✅ Dark mode support

## 📄 License

MIT
