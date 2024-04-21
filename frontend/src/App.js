import { ThemeProvider } from "./components/ThemeContext";
import HomePage from "./components/Homepage";

function App() {
  return (
    <ThemeProvider>
      <HomePage />
    </ThemeProvider>
  );
}

export default App;
