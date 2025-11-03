---
title: "Guida Rapida - Nuove Funzionalità UX"
created: 2025-11-02
---

# 🎨 Guida Rapida alle Nuove Funzionalità

## Panoramica

L'applicazione Video→SCORM Quiz Generator è stata potenziata con nuove funzionalità per personalizzazione, controllo e produttività. Questa guida ti mostra come utilizzarle.

---

## 🎨 Personalizzazione Tema

### Come Accedere
- Clicca sul pulsante **🎨 (pennello)** in basso a destra

### Cosa Puoi Personalizzare

#### 1. Colore Primario
- Usa il **color picker** per scegliere visivamente
- Oppure inserisci un **codice esadecimale** (es. `#3b82f6`)
- Clicca sui **6 preset** per colori predefiniti

#### 2. Stile Pulsanti
- **Riempito**: pulsanti con sfondo colorato
- **Contorno**: pulsanti con bordo colorato
- **Sfumato**: pulsanti con gradiente

#### 3. Raggio Angoli
- **Squadrato**: angoli retti (stile moderno/minimalista)
- **Medio**: arrotondamento standard
- **Pill**: completamente arrotondato

#### 4. Font
- **System**: font nativi del sistema (veloce, familiare)
- **Serif**: stile classico/editoriale
- **Mono**: stile tecnico/codice

#### 5. Dimensione Testo
- **Piccolo**: testo compatto
- **Medio**: dimensione standard
- **Grande**: testo più leggibile

### Salvare un Tema Personalizzato
1. Personalizza il tema come desideri
2. Clicca **"Salva Tema Corrente"**
3. Inserisci un nome (es. "Tema Aziendale")
4. Clicca **"Salva"**

### Caricare un Tema Salvato
1. Apri il customizer tema
2. Scorri fino a **"Temi Salvati"**
3. Clicca **"Carica"** sul tema desiderato

### Ripristinare il Tema Predefinito
- Clicca **"Ripristina Tema Predefinito"** in fondo al customizer

---

## ✏️ Controllo Quiz Generati

### Selezionare Domande

Dopo la generazione del quiz, puoi:

#### Selezionare/Deselezionare Singole Domande
- Usa la **checkbox** a sinistra di ogni domanda
- Solo le domande selezionate saranno incluse nel pacchetto SCORM

#### Selezionare/Deselezionare Tutte
- Clicca il pulsante **"Seleziona Tutto"** / **"Deseleziona Tutto"**
- Utile per ripartire da zero nella selezione

#### Contatore
- In alto vedi **"X di Y selezionate"**
- Il pulsante "Procedi" mostra il numero finale

### Filtrare Domande

#### Per Difficoltà
- Menu dropdown: **Tutte / Facile / Media / Difficile**
- Badge colorati: 🟢 Facile | 🟡 Media | 🔴 Difficile

#### Per Tipo
- Menu dropdown: **Tutti / Scelta Multipla / Vero-Falso / Risposta Breve**
- Badge blu indica il tipo

### Riordinare Domande

#### Drag & Drop
1. **Clicca e tieni premuto** su una domanda
2. **Trascina** nella posizione desiderata
3. **Rilascia** per confermare
4. L'ordine sarà mantenuto nel pacchetto SCORM

💡 **Suggerimento**: riordina per mettere domande più importanti all'inizio

### Modificare Contenuti

#### Modificare Obiettivi di Apprendimento
1. Clicca **"Modifica"** accanto all'obiettivo
2. Modifica il testo
3. Clicca **✓** per confermare

#### Modificare Domande
1. Clicca **"Modifica"** accanto alla domanda
2. Modifica il testo nella textarea
3. Clicca **✓** per confermare

💡 **Nota**: puoi modificare solo il testo (stem), non le risposte o opzioni

### Informazioni Aggiuntive

Ogni domanda mostra:
- **Tag**: categorie generate dall'IA
- **Timestamp**: riferimento al video sorgente (se disponibile)
- **Risposta corretta**: per verifica rapida

---

## 💾 Gestione Sessioni

### Auto-Salvataggio
- L'app **salva automaticamente** il tuo lavoro
- Ogni modifica viene persistita in tempo reale
- Nessun rischio di perdere dati

### Ripristino Sessione
- Quando **riapri l'app**, se c'è una sessione salvata:
  - Appare un **prompt di conferma**
  - Clicca **"OK"** per ripristinare
  - Clicca **"Annulla"** per iniziare da zero

### Nuova Sessione
- Clicca il pulsante **➕** (in basso a destra)
- Conferma per **cancellare** la sessione corrente
- Torni allo step di upload

---

## 🕐 Cronologia Generazioni

### Accedere alla Cronologia
- Il pulsante **🕐 (orologio)** appare solo:
  - Quando sei nello **Step 2: Genera Quiz**
  - Se hai **almeno una generazione** in cronologia

### Ripristinare una Generazione Precedente
1. Clicca il pulsante **🕐**
2. Vedi la lista delle ultime **20 generazioni**
3. Ogni voce mostra:
   - Numero di domande
   - Data e ora di generazione
4. Clicca sulla generazione desiderata
5. Quiz e obiettivi vengono **ripristinati**

💡 **Caso d'uso**: hai rigenerato il quiz ma preferivi la versione precedente

---

## 📊 Barra di Avanzamento

### Visualizzazione
- In alto vedi i **3 step** del processo:
  1. 📤 Upload Video
  2. 🤖 Genera Quiz
  3. 📦 Pacchetto SCORM

### Indicatori
- **Grigio**: step non ancora raggiunto
- **Colorato con ✓**: step completato
- **Colorato con glow**: step corrente

### Navigazione
- Puoi **cliccare** su step già completati
- Appare una **conferma** (per evitare perdita dati)
- Utile per tornare indietro e modificare

---

## 🔔 Notifiche Toast

### Tipi di Notifiche

Le notifiche appaiono in **alto a destra** e ti informano su:

- ✅ **Successo** (verde): operazioni completate
  - "Quiz generato con X domande!"
  - "Sessione ripristinata con successo!"
  
- ℹ️ **Info** (blu): informazioni generali
  - "Tornato allo step precedente"
  - "Sessione cancellata"

- ⚠️ **Warning** (giallo): avvisi (futuri)

- ✕ **Errore** (rosso): problemi (futuri)

### Comportamento
- **Auto-dismiss**: scompaiono dopo 3 secondi
- **Chiusura manuale**: clicca la **X** per chiudere subito
- **Stack**: più notifiche si impilano verticalmente

---

## 💡 Suggerimenti & Best Practices

### Workflow Consigliato

1. **Upload Video**
   - Carica il tuo video
   - Attendi l'elaborazione

2. **Genera Quiz**
   - Attendi la generazione AI
   - **Filtra** per difficoltà/tipo desiderati
   - **Deseleziona** domande non pertinenti
   - **Riordina** per importanza
   - **Modifica** testi se necessario
   - Verifica il **contatore** domande selezionate

3. **Pacchetto SCORM**
   - Configura impostazioni SCORM
   - Esporta il pacchetto

### Personalizzazione Tema

- **Crea preset** per progetti diversi:
  - "Aziendale" → colori brand
  - "Educativo" → colori vivaci
  - "Minimalista" → toni neutri

- **Usa font Mono** per contenuti tecnici/codice
- **Usa font Serif** per contenuti formali/accademici

### Gestione Quiz

- **Salva generazioni** interessanti tramite cronologia
- **Sperimenta** con rigenerazioni (puoi sempre tornare indietro)
- **Usa filtri** per focus su specifiche difficoltà
- **Riordina** domande per creare percorsi didattici progressivi

---

## ⌨️ Scorciatoie & Tips

### Scorciatoie Visive
- **Domanda selezionata**: bordo blu + sfondo azzurro
- **Domanda in drag**: opacità ridotta
- **Step corrente**: glow effect sulla barra progresso

### Tips Produttività
- **Checkpoint**: salva preset tema prima di sperimentare
- **Backup**: la cronologia è il tuo backup automatico
- **Filtri**: usa filtri prima di selezionare per velocizzare
- **Batch editing**: deseleziona tutto → filtra → seleziona tutto

---

## 🐛 Risoluzione Problemi

### Il tema non si applica
- Verifica che il browser supporti CSS variables
- Prova a ricaricare la pagina
- Ripristina tema predefinito

### Sessione non si ripristina
- Controlla che localStorage sia abilitato
- Verifica che non sia in modalità incognito
- Cancella cache e riprova

### Drag & drop non funziona
- Assicurati di cliccare e tenere premuto
- Su touch device: funzionalità limitata (usa riordino manuale)

### Cronologia vuota
- Devi generare almeno un quiz
- La cronologia si popola dopo il primo "Procedi"

---

## 📚 Risorse Aggiuntive

- [[piano-personalizzazione-ux]]: piano originale
- [[implementazione-completata]]: dettagli tecnici implementazione
- `README.md`: istruzioni generali applicazione

---

## 🎯 Prossimi Passi

Ora che conosci le nuove funzionalità:

1. **Sperimenta** con la personalizzazione tema
2. **Genera** un quiz e prova i filtri
3. **Riordina** alcune domande con drag & drop
4. **Salva** un preset tema personalizzato
5. **Condividi** feedback per miglioramenti futuri

Buon lavoro! 🚀
