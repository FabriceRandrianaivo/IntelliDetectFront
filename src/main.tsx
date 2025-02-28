import { StrictMode } from 'react';;
import App from './App';
import { createRoot } from "react-dom/client";
// import { store } from './store/store';

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error("Élément root non trouvé dans le DOM !");
}