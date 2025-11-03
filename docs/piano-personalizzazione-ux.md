---
title: "Piano Personalizzazione UX Video→Quiz SCORM"
created: 2025-11-02
---

# Piano Miglioramenti UX & Personalizzazione

## Contesto attuale
- Il flusso è strutturato in tre step sequenziali (Upload → Generate → Package) orchestrati da `App.tsx` e dai componenti `UploadStep`, `GenerateStep`, `PackageStep`.
- La logica di impacchettamento SCORM funziona e **non deve essere modificata**; gli interventi dovranno concentrarsi sulla layer di presentazione e gestione interattiva.
- L’utente principale è il proprietario del progetto, quindi privilegiamo feature di qualità della vita e controllo sui contenuti generati.

## Obiettivi
1. Offrire opzioni di personalizzazione estetica (colori, stile pulsanti, tipografia) direttamente dall’interfaccia.
2. Migliorare il controllo manuale sui contenuti generati dall’IA senza alterare la logica di packaging SCORM.
3. Introdurre strumenti di produttività per rendere più fluido l’utilizzo personale dell’app.

## Principi guida
- **Stabilità SCORM**: nessuna modifica al comportamento di `services/scormService.ts`; tutte le novità agiscono prima dell’esportazione.
- **Persistenza locale**: utilizzare `localStorage`/IndexedDB per salvare preferenze e sessioni senza backend.
- **Feedback immediato**: ogni personalizzazione deve avere anteprima live e possibilità di annullare.
- **Accessibilità**: nuove opzioni devono mantenere contrasto e usabilità in modalità chiara/scura.

## Roadmap proposta

### Milestone 1 — Tema & Branding personale
- [ ] **Selettore colore primario**: introdurre color picker con preset + input esadecimale per aggiornare una CSS variable (es. `--accent-color`) applicata a pulsanti e link.
- [ ] **Palette pulsanti**: permettere la scelta di combinazioni (riempito, outline, sfumato) e raggio angoli (squadrato, medio, pill). Applicare su componenti CTA/azioni principali.
- [ ] **Tipografia e dimensioni**: opzione per selezionare font stack (es. system, serif, mono) e scala dimensioni per testi di contenuto e titoli.
- [ ] **Salvataggio temi**: consentire di salvare preset personali con nome e richiamarli rapidamente (persistenza via `localStorage`).
- [ ] **Reset rapido**: aggiungere pulsante "Ripristina tema di default".

### Milestone 2 — Controllo contenuti generati
- [ ] **Selezione domande**: aggiungere checkbox per includere/escludere domande specifiche prima del passaggio a PackageStep, mantenendo anteprima conteggio.
- [ ] **Riordinamento drag & drop**: permettere di riordinare domande e obiettivi per importanza (senza cambiare logica SCORM, che continuerà a leggere l’array aggiornato).
- [ ] **Editor in-line**: consentire modifiche testuali rapide su obiettivi, stem e distrattori con validazione minima (es. non vuoto).
- [ ] **Filtri e tag**: introdurre filtri per difficoltà/tipo domanda per facilitare la revisione.
- [ ] **Snapshot trascrizione**: mostrare snippet della trascrizione a supporto della valutazione delle domande.

### Milestone 3 — Qualità della vita & produttività
- [ ] **Barra di avanzamento**: indicare visivamente lo stato (1/3, 2/3, 3/3) e consentire navigazione rapida con conferma se dati non salvati.
- [ ] **Salvataggio sessione**: bottone "Salva sessione" che conserva video metadata, obiettivi, quiz e impostazioni in `localStorage` e permette ripristino.
- [ ] **Cronologia rigenerazioni**: memorizzare versioni precedenti del quiz per confrontare e ripristinare rapidamente.
- [ ] **Notifiche contestuali**: toast/snackbar per successi o errori (es. generazione completata, tema salvato).
- [ ] **Aiuti contestuali**: tooltip o callout che spiegano le nuove opzioni di personalizzazione.

## Considerazioni tecniche
- Centralizzare le nuove preferenze in un contesto React o store leggero per propagare facilmente i valori a tutta l’app.
- Definire un file `theme.ts` per mappare preset → CSS variables e integrare con Tailwind (via `:root` inline styles).
- Per il drag & drop, valutare librerie leggere (es. `@dnd-kit/core`) oppure implementare una soluzione custom per non appesantire il bundle.
- Garantire compatibilità con la modalità dark già presente, aggiornando sia tema chiaro che scuro.
- Prevedere test manuali per verificare che le preferenze applicate non interferiscano con la costruzione del pacchetto SCORM.

## Prossimi passi suggeriti
1. Prototipare il selettore di colore primario e l’applicazione delle CSS variables.
2. Estendere `GenerateStep` con la lista interattiva di domande (checkbox + editing) mantenendo l’API esistente verso `App.tsx`.
3. Implementare persistenza tema/sessione e barra di avanzamento globali.
4. Iterare con test d’uso personali, raccogliendo feedback su ulteriori need.
