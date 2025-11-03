import { VideoData, QuizQuestion, SCORMSettings } from '../types';

declare const JSZip: any;

interface ScormPackageData {
  videoData: VideoData;
  learningObjectives: string[];
  quizBank: QuizQuestion[];
  settings: SCORMSettings;
}

// ---- SCORM File Templates ----

const getImsmanifestXML = (data: ScormPackageData): string => {
    const { settings } = data;
    const courseIdentifier = `com.v-scorm.course.${Date.now()}`;
    const escapedTitle = settings.courseTitle.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    if (settings.scormVersion === '1.2') {
        return `<?xml version="1.0" standalone="no" ?>
<manifest identifier="${courseIdentifier}" version="1.1" 
          xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2" 
          xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2" 
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
          xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd http://www.imsglobal.org/xsd/imsmd_rootv1p2p1 imsmd_rootv1p2p1.xsd http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>
  <organizations default="org_1">
    <organization identifier="org_1">
      <title>${escapedTitle}</title>
      <item identifier="item_1" identifierref="res_1" isvisible="true">
        <title>${escapedTitle}</title>
      </item>
    </organization>
  </organizations>
  <resources>
    <resource identifier="res_1" type="webcontent" adlcp:scormtype="sco" href="index.html">
      <file href="index.html"/>
      <file href="video.mp4"/>
    </resource>
  </resources>
</manifest>`;
    } else { // SCORM 2004 3rd Ed.
        return `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="${courseIdentifier}" version="1.0" 
          xmlns="http://www.imsglobal.org/xsd/imscp_v1p1" 
          xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_v1p3" 
          xmlns:imsss="http://www.imsglobal.org/xsd/imsss"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.imsglobal.org/xsd/imscp_v1p1 imscp_v1p1.xsd http://www.adlnet.org/xsd/adlcp_v1p3 adlcp_v1p3.xsd http://www.imsglobal.org/xsd/imsss imsss_v1p0.xsd">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>2004 3rd Edition</schemaversion>
  </metadata>
  <organizations default="org_1">
    <organization identifier="org_1">
      <title>${escapedTitle}</title>
      <item identifier="item_1" identifierref="res_1">
        <title>${escapedTitle}</title>
      </item>
    </organization>
  </organizations>
  <resources>
    <resource identifier="res_1" type="webcontent" adlcp:scormType="sco" href="index.html">
      <file href="index.html"/>
      <file href="video.mp4"/>
    </resource>
  </resources>
</manifest>`;
    }
};

const getIndexHTML = (data: ScormPackageData, isTestMode = false): string => {
    const { videoData, learningObjectives, quizBank, settings } = data;
    const finalQuiz = quizBank.slice(0, settings.numQuestions);

    return `
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${settings.courseTitle}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      body { font-family: sans-serif; }
      .quiz-choice:hover { background-color: #f0f0f0; }
      .quiz-choice.selected { background-color: #dbeafe; border-color: #3b82f6; }
      .quiz-choice.correct { background-color: #dcfce7; border-color: #22c55e; }
      .quiz-choice.incorrect { background-color: #fee2e2; border-color: #ef4444; }
    </style>
</head>
<body class="bg-gray-100">

    <!-- SCORM API Wrapper -->
    <script type="text/javascript">
      // Standard SCORM API Wrapper - simplified for brevity
      var API = null;
      function findAPI(win) {
        let findAPITries = 0;
        while ((win.API == null) && (win.parent != null) && (win.parent != win)) {
          findAPITries++;
          if (findAPITries > 7) {
            console.warn("Error finding API -- too deeply nested.");
            return null;
          }
          win = win.parent;
        }
        return win.API;
      }

      function init() {
        if ((window.parent) && (window.parent != window)) {
          API = findAPI(window.parent);
        }
        if ((API == null) && (window.opener)) {
          API = findAPI(window.opener);
        }
        if (API == null) {
          console.warn("SCORM API not found.");
          ${isTestMode ? `API = new MockAPI(); console.log("Using Mock API for testing.")` : ''}
        } else {
          ${settings.scormVersion === '1.2' ? 'API.LMSInitialize("");' : 'API.Initialize("");'}
        }
      }

      ${isTestMode ? `
      class MockAPI {
        constructor() { this.data = {}; console.log("Mock LMS Initialized."); }
        LMSInitialize() { console.log('LMSInitialize("")'); return "true"; }
        Initialize() { console.log('Initialize("")'); return "true"; }
        LMSGetValue(key) { console.log('LMSGetValue("' + key + '") ->', this.data[key] || ""); return this.data[key] || ""; }
        GetValue(key) { return this.LMSGetValue(key); }
        LMSSetValue(key, value) { console.log('LMSSetValue("' + key + '", "' + value + '")'); this.data[key] = value; return "true"; }
        SetValue(key, value) { return this.LMSSetValue(key, value); }
        LMSCommit() { console.log('LMSCommit("")'); return "true"; }
        Commit() { return this.LMSCommit(); }
        LMSFinish() { console.log('LMSFinish("")'); return "true"; }
        Terminate() { return this.LMSFinish(); }
      }
      ` : ''}

      window.addEventListener('load', init);
      window.addEventListener('beforeunload', function() {
        if (API) { ${settings.scormVersion === '1.2' ? 'API.LMSFinish("");' : 'API.Terminate("");'} }
      });
    </script>

    <div id="app" class="max-w-4xl mx-auto p-4 sm:p-8"></div>

    <script type="text/javascript">
      const courseData = {
        title: "${settings.courseTitle.replace(/"/g, '\\"')}",
        objectives: ${JSON.stringify(learningObjectives)},
        quiz: ${JSON.stringify(finalQuiz)},
        settings: ${JSON.stringify(settings)},
        duration: ${videoData.duration}
      };
      
      const app = document.getElementById('app');
      let currentPage = 'start';
      let currentQuestionIndex = 0;
      let userAnswers = {};
      let quizStartTime;

      function render() {
        if (currentPage === 'start') renderStartPage();
        else if (currentPage === 'video') renderVideoPage();
        else if (currentPage === 'quiz') renderQuizPage();
        else if (currentPage === 'results') renderResultsPage();
      }

      function setLocation(page) {
        currentPage = page;
        if(API) {
          const key = courseData.settings.scormVersion === '1.2' ? 'cmi.core.lesson_location' : 'cmi.location';
          API.${settings.scormVersion === '1.2' ? 'LMSSetValue' : 'SetValue'}(key, page);
        }
        render();
      }
      
      function renderStartPage() {
        app.innerHTML = \`
          <div class="bg-white p-8 rounded-lg shadow-lg text-center">
            <h1 class="text-3xl font-bold mb-2">\${courseData.title}</h1>
            <img src="${videoData.thumbnail}" alt="Course thumbnail" class="mx-auto my-4 rounded-md w-1/2"/>
            <p class="text-gray-600 mb-4">Durata: \${Math.ceil(courseData.duration/60)} minuti</p>
            <h2 class="text-xl font-semibold mb-2">Obiettivi di Apprendimento</h2>
            <ul class="text-left list-disc list-inside mb-6">
              \${courseData.objectives.map(o => \`<li>\${o}</li>\`).join('')}
            </ul>
            <button onclick="setLocation('video')" class="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700">Inizia Corso</button>
          </div>
        \`;
      }

      function renderVideoPage() {
        app.innerHTML = \`
          <div class="bg-white p-8 rounded-lg shadow-lg">
            <h1 class="text-3xl font-bold mb-4">\${courseData.title}</h1>
            <video controls src="video.mp4" class="w-full rounded-md mb-6"></video>
            <div class="flex justify-end">
              <button onclick="startQuiz()" class="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700">Inizia Quiz</button>
            </div>
          </div>
        \`;
      }

      function startQuiz() {
          if (courseData.settings.randomizeOrder) {
            courseData.quiz.sort(() => Math.random() - 0.5);
          }
          quizStartTime = new Date();
          setLocation('quiz');
      }

      function renderQuizPage() {
          const q = courseData.quiz[currentQuestionIndex];
          let choicesHTML = '';
          if (q.type === 'mcq') {
            choicesHTML = Object.entries(q.choices[0]).map(([key, value]) => \`
              <div onclick="selectAnswer('\${key}')" class="quiz-choice border-2 border-gray-300 p-4 rounded-md cursor-pointer" data-choice="\${key}">
                <strong>\${key}.</strong> \${value}
              </div>
            \`).join('');
          } else if (q.type === 'true_false') {
            choicesHTML = ['True', 'False'].map(val => \`
              <div onclick="selectAnswer('\${val}')" class="quiz-choice border-2 border-gray-300 p-4 rounded-md cursor-pointer" data-choice="\${val}">\${val}</div>
            \`).join('');
          }

          app.innerHTML = \`
          <div class="bg-white p-8 rounded-lg shadow-lg">
            <p class="text-gray-600 mb-2">Domanda \${currentQuestionIndex + 1} di \${courseData.quiz.length}</p>
            <p class="text-xl font-semibold mb-6">\${q.stem}</p>
            <div class="space-y-4">\${choicesHTML}</div>
            <div class="mt-8 flex justify-between">
              <button \${currentQuestionIndex === 0 ? 'disabled' : ''} onclick="prevQuestion()" class="bg-gray-200 px-6 py-2 rounded-md disabled:opacity-50">Indietro</button>
              <button onclick="nextQuestion()" class="bg-blue-600 text-white px-6 py-2 rounded-md">\${currentQuestionIndex === courseData.quiz.length - 1 ? 'Invia Risposte' : 'Avanti'}</button>
            </div>
          </div>
        \`;

        // Reselect answer if exists
        if(userAnswers[currentQuestionIndex]) {
          const selected = app.querySelector('[data-choice="' + userAnswers[currentQuestionIndex] + '"]');
          if(selected) selected.classList.add('selected');
        }
      }

      function selectAnswer(answer) {
        userAnswers[currentQuestionIndex] = answer;
        document.querySelectorAll('.quiz-choice').forEach(el => el.classList.remove('selected'));
        const selectedEl = document.querySelector('[data-choice="' + answer + '"]');
        if (selectedEl) selectedEl.classList.add('selected');
      }
      
      function nextQuestion() {
        if (currentQuestionIndex < courseData.quiz.length - 1) {
          currentQuestionIndex++;
          renderQuizPage();
        } else {
          finishQuiz();
        }
      }

      function prevQuestion() {
        if (currentQuestionIndex > 0) {
          currentQuestionIndex--;
          renderQuizPage();
        }
      }

      function finishQuiz() {
          let score = 0;
          courseData.quiz.forEach((q, i) => {
              if (userAnswers[i] === q.correct_answer) {
                  score++;
              }
          });
          
          const rawScore = score;
          const maxScore = courseData.quiz.length;
          const scaledScore = (rawScore / maxScore) * 100;
          const passed = scaledScore >= courseData.settings.passingScore;
          
          if(API) {
            if(courseData.settings.scormVersion === '1.2') {
              API.LMSSetValue('cmi.core.score.raw', rawScore);
              API.LMSSetValue('cmi.core.score.max', maxScore);
              API.LMSSetValue('cmi.core.score.min', 0);
              API.LMSSetValue('cmi.core.lesson_status', passed ? 'passed' : 'failed');
              API.LMSCommit('');
              API.LMSSetValue('cmi.core.exit', 'suspend');
            } else { // 2004
              API.SetValue('cmi.score.raw', rawScore);
              API.SetValue('cmi.score.max', maxScore);
              API.SetValue('cmi.score.min', 0);
              API.SetValue('cmi.score.scaled', scaledScore / 100);
              API.SetValue('cmi.success_status', passed ? 'passed' : 'failed');
              API.SetValue('cmi.completion_status', 'completed');
              API.Commit('');
              API.SetValue('cmi.exit', 'suspend');
            }
          }
          
          setLocation('results');
      }

      function renderResultsPage() {
        let score = 0;
        courseData.quiz.forEach((q, i) => {
            if (userAnswers[i] === q.correct_answer) score++;
        });

        const percentage = Math.round((score / courseData.quiz.length) * 100);
        const passed = percentage >= courseData.settings.passingScore;

        app.innerHTML = \`
          <div class="bg-white p-8 rounded-lg shadow-lg text-center">
            <h1 class="text-3xl font-bold mb-4">Quiz Completato!</h1>
            <p class="text-5xl font-bold \${passed ? 'text-green-600' : 'text-red-600'}">\${percentage}%</p>
            <p class="text-gray-600 mb-6">Hai ottenuto un punteggio di \${score} su \${courseData.quiz.length}</p>
            <div class="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div class="\${passed ? 'bg-green-500' : 'bg-red-500'} h-4 rounded-full" style="width: \${percentage}%"></div>
            </div>
            \${passed 
              ? '<p class="text-lg text-green-700">Congratulazioni, hai superato il test!</p>' 
              : '<p class="text-lg text-red-700">Non hai raggiunto il punteggio di superamento del ' + courseData.settings.passingScore + '%.</p>'}
          </div>
        \`;
      }

      // Initial render
      if (API) {
        const location = API.${settings.scormVersion === '1.2' ? 'LMSGetValue' : 'GetValue'}(courseData.settings.scormVersion === '1.2' ? 'cmi.core.lesson_location' : 'cmi.location');
        if (location && ['start', 'video', 'quiz'].includes(location)) {
          currentPage = location;
        }
      }
      render();
    </script>
</body>
</html>
    `;
};


export const createScormPackage = async (data: ScormPackageData) => {
    const zip = new JSZip();

    // 1. Add imsmanifest.xml
    zip.file("imsmanifest.xml", getImsmanifestXML(data));

    // 2. Add index.html (the SCO)
    zip.file("index.html", getIndexHTML(data));
    
    // 3. Add video file
    zip.file("video.mp4", data.videoData.file);

    // 4. Generate and download zip
    const content = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    const safeTitle = data.settings.courseTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    link.download = `${safeTitle}_scorm_${data.settings.scormVersion}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const testInBrowser = async (data: ScormPackageData) => {
    const htmlContent = getIndexHTML(data, true);
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const videoBlob = new Blob([data.videoData.file], { type: data.videoData.file.type });
    const videoUrl = URL.createObjectURL(videoBlob);
    
    // As we can't directly link to the video blob from another blob URL due to security,
    // we open the content in a new window and inject the video URL.
    const newWindow = window.open(url, '_blank');

    if (newWindow) {
        newWindow.onload = () => {
            const videoElement = newWindow.document.querySelector('video');
            if (videoElement) {
                videoElement.src = videoUrl;
            }
        };
    } else {
      alert("Popup bloccato. Per favore, consenti i popup per questo sito per testare il corso.");
    }
};