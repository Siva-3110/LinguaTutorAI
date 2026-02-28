const fs = require('fs');
const path = require('path');

const dirs = [
  'frontend/public',
  'frontend/src/assets',
  'frontend/src/components',
  'frontend/src/pages',
  'frontend/src/layouts',
  'frontend/src/services',
  'frontend/src/hooks',
  'frontend/src/utils',
  'backend/src/config',
  'backend/src/controllers',
  'backend/src/routes',
  'backend/src/models',
  'backend/src/middleware',
  'backend/src/services',
  'backend/src/utils'
];

dirs.forEach(dir => fs.mkdirSync(path.join(__dirname, dir), { recursive: true }));

const files = {
  '.gitignore': `node_modules
.env
dist
.DS_Store
`,
  'README.md': `# LinguaTutor AI

Your AI Multilingual Learning Companion.

## Folder Structure

\`\`\`text
LinguaTutorAI/
├── frontend/        # React, Vite, Tailwind web app
└── backend/         # Express, Node.js backend
\`\`\`

## Getting Started

### Backend
1. \`cd backend\`
2. \`npm install\`
3. \`npm run dev\`

### Frontend
1. \`cd frontend\`
2. \`npm install\`
3. \`npm run dev\`
`,
  'frontend/package.json': `{
  "name": "linguatutor-ai-frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  }
}`,
  'frontend/vite.config.js': `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
`,
  'frontend/tailwind.config.js': `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
`,
  'frontend/postcss.config.js': `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`,
  'frontend/index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>LinguaTutor AI</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`,
  'frontend/src/index.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-gray-50 text-gray-900 font-sans antialiased;
  }
}
`,
  'frontend/src/main.jsx': `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
`,
  'frontend/src/App.jsx': `import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
`,
  'frontend/src/routes.jsx': `import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Tutor from './pages/Tutor';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="tutor" element={<Tutor />} />
        {/* Dashboard will be added later */}
        <Route path="dashboard" element={<div className="p-8 text-center text-gray-500">Dashboard UI coming soon</div>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
`,
  'frontend/src/layouts/MainLayout.jsx': `import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
`,
  'frontend/src/components/Navbar.jsx': `import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const getLinkClass = (path) => {
    return \`px-3 py-2 rounded-md text-sm font-medium transition-colors \${
      location.pathname === path 
        ? 'bg-blue-600 text-white' 
        : 'text-gray-700 hover:bg-gray-100'
    }\`;
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600">LinguaTutor AI</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className={getLinkClass('/')}>Home</Link>
            <Link to="/tutor" className={getLinkClass('/tutor')}>Tutor</Link>
            <Link to="/dashboard" className={getLinkClass('/dashboard')}>Dashboard</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
`,
  'frontend/src/pages/Home.jsx': `import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex-grow flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8 text-center bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            Your AI Multilingual <span className="text-blue-600">Learning Companion</span>
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Learn anything in your language with AI
          </p>
        </div>
        <div className="mt-8 flex justify-center">
          <Link
            to="/tutor"
            className="group relative w-full sm:w-auto flex justify-center py-3 px-8 border border-transparent text-lg font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-md hover:shadow-lg"
          >
            Start Learning
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
`,
  'frontend/src/pages/Tutor.jsx': `import React, { useState } from 'react';

const Tutor = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hello! I am LinguaTutor AI. What would you like to learn today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages([...messages, { role: 'user', text: input }]);
    const currentInput = input;
    setInput('');

    // Simulate AI thinking and responding
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: \`This is a simulated response to "\${currentInput}". AI integration is coming in future steps!\`
      }]);
    }, 1000);
  };

  return (
    <div className="flex flex-row flex-grow h-[calc(100vh-64px)] overflow-hidden bg-gray-50">
      {/* Optional Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Chat History</h2>
        <div className="text-sm text-gray-500">No previous chats.</div>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-col flex-grow w-full relative">
        <div className="flex-grow p-4 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={\`flex \${msg.role === 'user' ? 'justify-end' : 'justify-start'}\`}>
              <div 
                className={\`max-w-[75%] px-4 py-3 rounded-2xl \${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-none'
                }\`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="p-4 bg-white border-t border-gray-200">
          <form onSubmit={handleSend} className="max-w-4xl mx-auto flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Tutor;
`,
  'backend/package.json': `{
  "name": "linguatutor-ai-backend",
  "version": "1.0.0",
  "description": "Backend for LinguaTutor AI",
  "main": "src/server.js",
  "type": "module",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  }
}`,
  'backend/.env': `PORT=5000
NODE_ENV=development
# MONGODB_URI=your_mongodb_connection_string_here (for future use)
`,
  'backend/src/server.js': `import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(\`Server is running on port \${PORT}\`);
});
`,
  'backend/src/app.js': `import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Base route
app.get('/', (req, res) => {
  res.send('LinguaTutor AI API is running...');
});

// Error handling middleware (basic)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

export default app;
`,
  'backend/src/routes/index.js': `import express from 'express';
import { testRoute } from '../controllers/testController.js';

const router = express.Router();

// Define routes
router.get('/test', testRoute);

export default router;
`,
  'backend/src/controllers/testController.js': `// Basic controller to test backend connectivity
export const testRoute = (req, res) => {
  res.json({
    message: "Backend is working"
  });
};
`
};

for (const [filepath, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(__dirname, filepath), content);
}
console.log('Project scaffold generated successfully.');
