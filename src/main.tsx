import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// Import de la configuration i18n
import './i18n'; 

createRoot(document.getElementById("root")!).render(<App />);
