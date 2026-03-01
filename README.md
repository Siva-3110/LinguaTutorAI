# 🌍 LinguaTutor AI

<div align="center">

[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=flat-square)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express-000000?logo=express&style=flat-square)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black&style=flat-square)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white&style=flat-square)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwind-css&logoColor=white&style=flat-square)](https://tailwindcss.com/)
[![Google Gemini AI](https://img.shields.io/badge/Google%20Gemini-4285F4?logo=google&logoColor=white&style=flat-square)](https://ai.google.dev/)
[![WebSocket](https://img.shields.io/badge/WebSocket-00D4B5?logo=socket.io&style=flat-square)](https://socket.io/)

**Your AI-Powered Multilingual Learning Companion - Real-time Interaction, Voice Recognition & Intelligent Tutoring**

[Features](#-key-features) • [Tech Stack](#-tech-stack) • [Installation](#-quick-start) • [Usage](#-usage-guide) • [Contributing](#-contributing)

</div>

---

## 📋 Overview

**LinguaTutor AI** is a revolutionary AI-powered language learning platform that combines cutting-edge technologies to create an immersive, personalized learning experience. Powered by **Google Gemini AI** and featuring **real-time voice interaction**, **collaborative learning spaces**, and **intelligent quiz generation**, LinguaTutor transforms how people learn languages.

### Why LinguaTutor AI?
✅ **AI-Powered Tutoring** - Intelligent responses powered by Google Gemini  
✅ **Real-Time Voice** - Speak naturally and get instant feedback  
✅ **Collaborative Learning** - Learn together in real-time chat rooms  
✅ **Adaptive Quizzes** - AI-generated quizzes tailored to your level  
✅ **Personalized Recommendations** - Smart course suggestions based on progress  
✅ **Plagiarism Detection** - Ensure academic integrity  
✅ **Mobile-Ready** - Learn anywhere, anytime on any device  

---

## ✨ Key Features

<table>
<tr>
<td width="50%">

### 🤖 AI Tutoring Engine
- Powered by Google Gemini AI
- Context-aware language assistance
- Grammar & syntax correction
- Real-time explanation generation
- Pronunciation guidance

</td>
<td width="50%">

### 🎤 Voice Recognition
- Speech-to-text conversion
- Speaker identification
- Audio recording & playback
- Voice quality enhancement
- Multi-language support

</td>
</tr>
<tr>
<td width="50%">

### 💬 Real-Time Chat
- WebSocket-based instant messaging
- Global collaborative rooms
- User-friendly chat interface
- Message history & archiving
- Typing indicators & status

</td>
<td width="50%">

### 📝 Smart Quizzes
- AI-generated questions
- Multiple difficulty levels
- Instant grading & feedback
- Performance analytics
- Progress tracking

</td>
</tr>
<tr>
<td width="50%">

### 📊 Analytics Dashboard
- Track learning progress
- Vocabulary growth charts
- Quiz performance metrics
- Time spent learning
- Achievement badges

</td>
<td width="50%">

### 🎓 Personalization
- Custom learning paths
- Adaptive difficulty scaling
- Smart recommendations
- Learning preferences
- Goal-setting tools

</td>
</tr>
<tr>
<td width="50%">

### 👥 Collaborative Spaces
- Private & public rooms
- Group learning sessions
- Peer feedback system
- Discussion forums
- Shared resources

</td>
<td width="50%">

### 🔐 Admin Controls
- User management
- Content moderation
- Analytics dashboard
- Platform monitoring
- Report generation

</td>
</tr>
</table>

---

## 👥 User Roles & Capabilities

### 🎓 Student Dashboard
| Feature | Description |
|---------|-----------|
| AI Chat Tutor | Get instant help from Gemini AI |
| Voice Practice | Speak and receive pronunciation feedback |
| Quiz Generation | Auto-generated quizzes on any topic |
| Room Chat | Join collaborative learning rooms |
| Progress Tracking | Monitor your learning journey |
| Recommendations | Personalized course suggestions |
| Leaderboard | Compete with peers globally |

### 👨‍🏫 Instructor Dashboard
| Feature | Description |
|---------|-----------|
| Create Rooms | Set up collaborative learning spaces |
| Manage Users | Monitor student progress |
| Generate Reports | Export analytics & performance data |
| Create Quizzes | Design custom quiz content |
| Monitor Chat | Oversee room discussions |
| Provide Feedback | Give detailed performance reviews |

### 🛡️ Admin Dashboard
| Feature | Description |
|---------|-----------|
| User Management | Approve/reject registrations |
| Content Moderation | Review chat & quiz content |
| Platform Analytics | Monitor system health |
| Reports | Generate usage statistics |
| System Configuration | Manage API settings |
| Plagiarism Detection | Monitor content integrity |

---

## 🛠 Tech Stack

<div align="center">

### Frontend
```
React 18 • Vite • Tailwind CSS • Axios • Socket.io-client
React Router • Web Audio API • Responsive Design
```

### Backend
```
Node.js • Express.js • Google Gemini API • Socket.io
Text-to-Speech • Voice Processing • Caching Layer
Plagiarism Detection • JWT Authentication
```

### Architecture
```
RESTful API • WebSocket Real-time Communication
Microservices • Service-oriented Design
Environment-based Configuration
```

</div>

---

## 📦 Project Structure

```
LinguaTutorAI/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── chatController.js      # Chat message handling
│   │   │   ├── voiceController.js     # Voice processing
│   │   │   ├── testController.js      # Test/quiz logic
│   │   │   └── (more controllers...)
│   │   ├── models/
│   │   │   ├── User.js                # User schema
│   │   │   ├── Quiz.js                # Quiz schema
│   │   │   ├── Admin.js               # Admin schema
│   │   │   └── (more models...)
│   │   ├── routes/
│   │   │   ├── chatRoutes.js          # Chat endpoints
│   │   │   ├── voiceRoutes.js         # Voice endpoints
│   │   │   ├── quizRoutes.js          # Quiz endpoints
│   │   │   ├── collabRoutes.js        # Collaboration endpoints
│   │   │   └── (more routes...)
│   │   ├── services/
│   │   │   ├── aiService.js           # Gemini AI integration
│   │   │   ├── chatService.js         # Chat logic
│   │   │   ├── voiceService.js        # Voice processing
│   │   │   ├── plagiarismService.js   # Plagiarism detection
│   │   │   ├── quizService.js         # Quiz generation
│   │   │   ├── recommendationService.js
│   │   │   └── (more services...)
│   │   ├── socket/
│   │   │   └── socketServer.js        # WebSocket configuration
│   │   ├── utils/
│   │   │   ├── cache.js               # Caching utility
│   │   │   └── (more utilities...)
│   │   ├── app.js                     # Express setup
│   │   └── server.js                  # Server entry point
│   ├── package.json
│   └── test_gemini.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatBox.jsx            # Main chat interface
│   │   │   ├── MessageBubble.jsx      # Message component
│   │   │   ├── Navbar.jsx             # Top navigation
│   │   │   ├── Sidebar.jsx            # Side navigation
│   │   │   └── (more components...)
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx          # User dashboard
│   │   │   ├── Tutor.jsx              # AI tutor page
│   │   │   ├── RoomChat.jsx           # Collaborative chat rooms
│   │   │   ├── Quiz.jsx               # Quiz page
│   │   │   ├── Admin.jsx              # Admin panel
│   │   │   ├── Home.jsx               # Landing page
│   │   │   └── (more pages...)
│   │   ├── hooks/
│   │   │   ├── useChat.js             # Chat logic hook
│   │   │   ├── useSpeech.js           # Voice recognition hook
│   │   │   ├── useVoiceRecorder.js    # Voice recording hook
│   │   │   └── useNetworkStatus.js    # Network status hook
│   │   ├── services/
│   │   │   ├── api.js                 # API client
│   │   │   ├── socket.js              # WebSocket client
│   │   │   └── notifications.js       # Notification service
│   │   ├── layouts/
│   │   │   └── MainLayout.jsx         # Main layout wrapper
│   │   ├── routes.jsx                 # Route configuration
│   │   ├── App.jsx                    # Root component
│   │   ├── main.jsx                   # React entry point
│   │   └── index.css                  # Global styles
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── README.md
├── setup.js
└── package.json (root)
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** v16+ ([Download](https://nodejs.org/))
- **npm** v7+ or **yarn** v1.22+
- **Google Gemini API Key** ([Get free key](https://ai.google.dev/))
- Optional: **MongoDB** for data persistence

### Installation

#### 1️⃣ Clone & Initial Setup
```bash
# Clone repository
git clone https://github.com/yourusername/LinguaTutorAI.git
cd LinguaTutorAI

# Install all dependencies
npm install
```

#### 2️⃣ Environment Configuration

**Backend** - Create `.env` in `/backend`:
```env
# Server
PORT=5000
NODE_ENV=development

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here

# Database (Optional)
MONGODB_URI=mongodb://localhost:27017/linguatutor

# JWT
JWT_SECRET=your_jwt_secret_key_here

# Voice Processing
SPEECH_RECOGNITION_API_KEY=your_key_here

# Email (For notifications)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

**Frontend** - Create `.env` in `/frontend`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_APP_NAME=LinguaTutor AI
VITE_APP_VERSION=1.0.0
```

#### 3️⃣ Start Services

```bash
# Option A: Run both simultaneously from root
npm run dev

# Option B: Run separately in different terminals

# Terminal 1 - Backend (with nodemon for auto-reload)
cd backend
npm run dev

# Terminal 2 - Frontend (Vite dev server)
cd frontend
npm run dev
```

#### 4️⃣ Access Application

```
🌐 Frontend:      http://localhost:5173
🔧 Backend API:   http://localhost:5000
📡 WebSocket:     http://localhost:5000
```

---

## 📖 Usage Guide

### 🎓 For Students

1. **Register & Login**
   - Create account with email/password
   - Complete profile setup

2. **Start Learning**
   - **AI Tutor**: Ask questions anytime, get instant answers
   - **Voice Practice**: Click 🎤 to practice pronunciation
   - **Take Quizzes**: Test your knowledge with AI-generated questions
   - **Join Rooms**: Collaborate with friends in real-time chat

3. **Track Progress**
   - View dashboard for learning stats
   - Check quiz scores and improvements
   - Earn badges and climb leaderboard

4. **Get Recommendations**
   - Receive personalized course suggestions
   - Adaptive difficulty based on performance
   - Goal-based learning paths

### 👨‍🏫 For Instructors

1. **Create Learning Spaces**
   - Set up collaborative rooms
   - Define room rules and goals

2. **Monitor Students**
   - Track individual progress
   - View quiz performance
   - Provide feedback in chat

3. **Generate Insights**
   - Export performance reports
   - Analyze class trends
   - Identify struggling students

### 🛡️ For Admins

1. **Dashboard Access**
   - Login with admin credentials
   - Monitor platform metrics

2. **User Management**
   - Approve/reject registrations
   - Manage user roles
   - Handle reports

3. **Content Moderation**
   - Review chat messages
   - Monitor quiz content
   - Enforce community guidelines

---

## 🔐 Authentication & Security

- **JWT Tokens**: Secure session management
- **Password Hashing**: Bcrypt encryption
- **Role-Based Access Control**: Fine-grained permissions
- **API Rate Limiting**: Prevent abuse
- **Plagiarism Detection**: Content integrity checks
- **Data Validation**: Input sanitization

---

## 🧠 AI Features Deep Dive

### Gemini AI Integration
```javascript
// Example: Getting AI assistance
const response = await aiService.getResponse({
  message: "How do I say hello in Spanish?",
  context: "language_learning",
  level: "beginner"
});
```

### Voice Processing
- **Recording**: Capture voice input
- **Transcription**: Convert speech to text
- **Analysis**: Check grammar & pronunciation
- **Feedback**: Personalized suggestions

### Quiz Generation
- Dynamic question creation
- Multiple difficulty levels
- Instant feedback & explanations
- Progress-adaptive questions

---

## 📊 API Endpoints

### Chat
```
GET    /api/chat/messages          # Get chat history
POST   /api/chat/send              # Send message
PUT    /api/chat/:id               # Edit message
DELETE /api/chat/:id               # Delete message
```

### AI Tutoring
```
POST   /api/ai/chat                # Chat with AI tutor
POST   /api/ai/explain             # Get explanation
POST   /api/ai/practice            # Start practice session
```

### Voice
```
POST   /api/voice/transcribe       # Convert speech to text
POST   /api/voice/synthesize       # Convert text to speech
POST   /api/voice/analyze          # Analyze pronunciation
```

### Quizzes
```
GET    /api/quiz/generate          # Generate new quiz
POST   /api/quiz/submit            # Submit answers
GET    /api/quiz/results/:id       # Get quiz results
GET    /api/quiz/history           # Get past quizzes
```

### Rooms
```
GET    /api/rooms                  # List all rooms
POST   /api/rooms                  # Create new room
GET    /api/rooms/:id              # Get room details
PUT    /api/rooms/:id              # Update room
DELETE /api/rooms/:id              # Delete room
```

### Recommendations
```
GET    /api/recommendations        # Get suggestions
POST   /api/recommendations/track  # Log activity
```

### Admin
```
GET    /api/admin/users            # List all users
PUT    /api/admin/users/:id        # Update user role
DELETE /api/admin/users/:id        # Delete user
GET    /api/admin/analytics        # Platform analytics
```

---

## 🧪 Testing

### Test Credentials (Demo Mode)

```
Student Account:
Email: student@linguatutor.com
Password: student123

Instructor Account:
Email: instructor@linguatutor.com
Password: instructor123

Admin Account:
Email: admin@linguatutor.com
Password: admin123
```

### Testing Voice Features
1. Click 🎤 icon in chat
2. Speak clearly (English, Spanish, French supported)
3. Wait for transcription
4. AI will respond to your input

### Testing AI Features
1. Type a language question
2. AI analyzes and responds contextually
3. Get explanations with examples
4. Practice with interactive exercises

---

## 🌟 Highlights

### 🚀 Performance
- **Instant Response Times**: Optimized API calls
- **Real-time Updates**: WebSocket latency < 100ms
- **Efficient Caching**: Reduced database calls
- **Mobile Optimization**: Lightweight bundle

### 🎨 User Experience
- **Intuitive Interface**: Easy navigation
- **Dark Mode Support**: Eye-friendly at night
- **Responsive Design**: Works on all devices
- **Smooth Animations**: Polished interactions

### 🔒 Reliability
- **Error Handling**: Graceful failure messages
- **Data Validation**: Input sanitation
- **Session Management**: Automatic timeout
- **Backup Systems**: Redundant architecture

### 📈 Scalability
- **Microservices**: Independent services
- **Load Balancing**: Handle traffic spikes
- **Database Indexing**: Fast queries
- **API Rate Limiting**: Fair usage

---

## 🤝 Contributing

We welcome contributions! Help us improve LinguaTutor AI:

### Getting Started
1. **Fork** the repository
2. **Create** feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** changes: `git commit -m 'Add amazing feature'`
4. **Push** branch: `git push origin feature/amazing-feature`
5. **Open** Pull Request

### Contribution Guidelines
- Follow existing code style
- Add descriptive commit messages
- Test changes thoroughly
- Update documentation
- Include comments for complex logic
- Ensure no console errors/warnings

### Areas for Contribution
- 🐛 Bug fixes and improvements
- ✨ New language support
- 🎨 UI/UX enhancements
- 📚 Documentation updates
- 🧪 Test coverage
- 🚀 Performance optimization

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support & Contact

**Project Repository**: [LinguaTutorAI](https://github.com/yourusername/LinguaTutorAI)

### Get Help
- 🐛 [Report Issues](https://github.com/yourusername/LinguaTutorAI/issues)
- 💬 [Start Discussions](https://github.com/yourusername/LinguaTutorAI/discussions)
- 📧 Email: support@linguatutor.ai

### Connect With Us
- 🌐 Website: [linguatutor.ai](https://linguatutor.ai)
- 🐙 GitHub: [@yourusername](https://github.com/yourusername)
- 🐦 Twitter: [@LinguaTutorAI](https://twitter.com/linguatutorai)

---

## 🙏 Acknowledgments

Built with amazing open-source technologies:

- **React & Vite** - Fast, modern development
- **Tailwind CSS** - Beautiful styling
- **Google Gemini** - Intelligent AI responses
- **Socket.io** - Real-time communication
- **Express.js** - Robust backend framework
- **Web Audio API** - Voice processing capabilities

---

<div align="center">

### ⭐ Found LinguaTutor AI helpful? Please star the repository!

**Learning Languages Has Never Been Easier**

---

Built with ❤️ for Language Learners Worldwide

**[⬆ Back to Top](#-linguatutor-ai)**

</div>
