import { GoogleGenAI, Type } from '@google/genai';
import { QuizQuestion, VideoData } from '../types';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    // This is a fallback for development. In a real environment, the key should be set.
    console.warn("API_KEY environment variable not set. Using a placeholder. AI features will not work.");
}
const ai = new GoogleGenAI({ apiKey: API_KEY || "YOUR_API_KEY_HERE" });

const quizGenerationSchema = {
    type: Type.OBJECT,
    properties: {
        learningObjectives: {
            type: Type.ARRAY,
            description: "Un elenco di 5-8 obiettivi di apprendimento in punti derivati dal video.",
            items: { type: Type.STRING }
        },
        quizBank: {
            type: Type.ARRAY,
            description: "Un elenco di domande del quiz basate sul video e sugli obiettivi.",
            items: {
                type: Type.OBJECT,
                properties: {
                    type: { type: Type.STRING, description: "Tipo di domanda. Deve essere uno tra: 'mcq', 'true_false', 'short_answer'." },
                    difficulty: { type: Type.STRING, description: "Difficoltà della domanda. Deve essere uno tra: 'easy', 'medium', 'hard'." },
                    cognitive_level: { type: Type.STRING, description: "Livello cognitivo della domanda. Deve essere uno tra: 'recall', 'understand', 'apply'." },
                    stem: { type: Type.STRING, description: "Il testo della domanda." },
                    choices: {
                        type: Type.ARRAY,
                        description: "Per le domande 'mcq', deve essere un array contenente un singolo oggetto con chiavi 'A', 'B', 'C', e 'D' per le quattro opzioni. Può essere omesso per altri tipi di domanda.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                A: { type: Type.STRING },
                                B: { type: Type.STRING },
                                C: { type: Type.STRING },
                                D: { type: Type.STRING }
                            },
                        }
                    },
                    correct_answer: { type: Type.STRING, description: "La risposta corretta. Per MCQ, la lettera (es. 'B'). Per vero/falso, 'True' o 'False'. Per risposta breve, una risposta concisa." },
                    rationale_correct: { type: Type.STRING, description: "Spiegazione del perché la risposta corretta è giusta." },
                    rationale_incorrect: {
                        type: Type.OBJECT,
                        description: "Per mcq, spiegazioni del perché ogni distrattore è sbagliato (es. {'A': '...', 'C': '...', 'D': '...'}).",
                        properties: {
                          A: { type: Type.STRING },
                          B: { type: Type.STRING },
                          C: { type: Type.STRING },
                          D: { type: Type.STRING }
                        }
                    },
                    source_timestamps: {
                        type: Type.ARRAY,
                        description: "Array di coppie [inizio, fine] in secondi dal video che supportano la domanda.",
                        items: {
                            type: Type.ARRAY,
                            items: { type: Type.NUMBER }
                        }
                    },
                    tags: {
                        type: Type.ARRAY,
                        description: "Un array di parole chiave pertinenti.",
                        items: { type: Type.STRING }
                    }
                },
                required: ["type", "difficulty", "cognitive_level", "stem", "correct_answer", "rationale_correct", "source_timestamps", "tags"]
            }
        }
    },
    required: ["learningObjectives", "quizBank"]
};

export async function generateQuizAndObjectives(videoData: VideoData, transcript: string | null): Promise<{ learningObjectives: string[], quizBank: QuizQuestion[] } | null> {
    if (!API_KEY) {
        throw new Error("Gemini API key is not configured.");
    }
    
    let prompt: string;

    if (transcript) {
        prompt = `
        Sei un esperto progettista didattico. Un utente ha fornito una trascrizione di un video.
        Nome del file video originale: "${videoData.file.name}"
        Durata del video: ${Math.round(videoData.duration)} secondi
        Trascrizione:
        ---
        ${transcript}
        ---

        Il tuo compito è analizzare la trascrizione fornita e:
        1.  Creare 5-8 obiettivi di apprendimento chiari, concisi e misurabili, basati sul contenuto della trascrizione.
        2.  Generare una banca di 20 domande del quiz basate ESCLUSIVAMENTE sulla trascrizione.
        3.  Il quiz deve rispettare la seguente distribuzione di difficoltà: 50% facile (10), 35% medio (7), 15% difficile (3).
        4.  Le domande devono coprire un mix di livelli cognitivi: rievocazione, comprensione e applicazione.
        5.  Per ogni domanda, identifica i timestamp di origine plausibili all'interno della durata del video (da 0 a ${Math.round(videoData.duration)} secondi) che giustifichino la domanda. Poiché non hai i timestamp esatti dalla trascrizione, stima una posizione temporale realistica per dove l'informazione potrebbe apparire nel video.
        6.  Per le domande a scelta multipla (MCQ), crea una risposta inequivocabilmente corretta e tre distrattori plausibili ma errati. Fornisci motivazioni sia per le risposte corrette che per quelle errate.

        Restituisci un singolo oggetto JSON che segua lo schema fornito. Non includere alcuna formattazione markdown.
        TUTTO L'OUTPUT TESTUALE (obiettivi, domande, scelte, motivazioni) DEVE ESSERE IN ITALIANO.
        `;
    } else {
        prompt = `
        Sei un esperto progettista didattico. Un utente ha caricato un file video.
        Nome del file video: "${videoData.file.name}"
        Durata del video: ${Math.round(videoData.duration)} secondi

        Dato che non puoi guardare il video, devi dedurre il suo probabile contenuto basandoti sul titolo e sulla durata. Immagina una trascrizione plausibile per questo video.

        Basandoti sul contenuto dedotto del video, il tuo compito è:
        1.  Creare 5-8 obiettivi di apprendimento chiari, concisi e misurabili, appropriati per questo video.
        2.  Generare una banca di 20 domande del quiz basate ESCLUSIVAMENTE sul contenuto dedotto.
        3.  Il quiz deve rispettare la seguente distribuzione di difficoltà: 50% facile (10), 35% medio (7), 15% difficile (3).
        4.  Le domande devono coprire un mix di livelli cognitivi: rievocazione, comprensione e applicazione.
        5.  Per ogni domanda, inventa dei timestamp di origine plausibili all'interno della durata del video (da 0 a ${Math.round(videoData.duration)} secondi) che giustifichino la domanda e le risposte. I timestamp dovrebbero essere realistici per il flusso di un video educativo.
        6.  Per le domande a scelta multipla (MCQ), crea una risposta inequivocabilmente corretta e tre distrattori plausibili ma errati. Fornisci motivazioni sia per le risposte corrette che per quelle errate.

        Restituisci un singolo oggetto JSON che segua lo schema fornito. Non includere alcuna formattazione markdown.
        TUTTO L'OUTPUT TESTUALE (obiettivi, domande, scelte, motivazioni) DEVE ESSERE IN ITALIANO.
        `;
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: quizGenerationSchema,
            }
        });

        const jsonString = response.text.trim();
        const parsedJson = JSON.parse(jsonString);

        // Basic validation
        if (!parsedJson.learningObjectives || !parsedJson.quizBank) {
            throw new Error("AI response is missing required fields.");
        }
        
        return {
            learningObjectives: parsedJson.learningObjectives,
            quizBank: parsedJson.quizBank as QuizQuestion[],
        };

    } catch (error) {
        console.error("Error generating quiz with Gemini:", error);
        throw error;
    }
}