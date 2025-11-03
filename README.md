<div align="center">
</div>

# mediaToScorm - Media to SCORM Conversion Tool

Automated SCORM package generation from video content with AI-powered interactive quiz creation using Google Gemini.

## Core Features

### Theme Customization
- **Custom Colors**: Configure primary colors with color picker or hex codes
- **Button Styles**: Select from filled, outline, and gradient variants
- **Border Radius**: Choose between sharp, medium, and pill-shaped corners
- **Typography**: System, serif, or monospace fonts with configurable sizing
- **Theme Presets**: Save and reuse custom theme configurations

### Quiz Content Management
- **Selective Question Inclusion**: Choose which questions to include or exclude
- **Drag-and-Drop Reordering**: Arrange questions by priority and importance
- **Inline Editing**: Modify question text and learning objectives directly
- **Advanced Filtering**: Filter by difficulty level and question type
- **Video Timestamp References**: Link questions to specific video segments

### Productivity Features
- **Progress Tracking**: Multi-step progress bar with section navigation
- **Auto-Save**: Automatic session persistence
- **Generation History**: Restore and revisit previous quiz versions
- **Real-time Notifications**: Immediate feedback on all actions


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

## Workflow

1. **Upload Video**: Import your video content (MP4 format)
2. **Generate Quiz**: AI analyzes video content and generates questions
   - Review and select relevant questions
   - Reorder questions by priority
   - Edit question text and objectives as needed
3. **Export SCORM**: Configure and generate SCORM package for LMS deployment

## Technology Stack

- **React 19** + TypeScript for robust UI development
- **Vite** for optimized build performance
- **Tailwind CSS** for responsive styling
- **Google Gemini API** for AI-powered content generation
- **SCORM 1.2/2004** for LMS compatibility

## Documentation

- [`docs/piano-personalizzazione-ux.md`](docs/piano-personalizzazione-ux.md) - UX customization planning
- [`docs/implementazione-completata.md`](docs/implementazione-completata.md) - Technical implementation details
- [`docs/guida-rapida-nuove-funzionalita.md`](docs/guida-rapida-nuove-funzionalita.md) - User guide

## Features

- ✅ Automatic quiz generation from video content
- ✅ Audio transcription support
- ✅ Multiple question types (multiple-choice, true/false, short-answer)
- ✅ Difficulty and cognitive level classification
- ✅ SCORM 1.2 and 2004 export
- ✅ Comprehensive theme customization
- ✅ Fine-grained content control
- ✅ Auto-save and generation history
- ✅ Dark mode support

## 📄 License

MIT
