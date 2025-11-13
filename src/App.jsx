import AppRouter from "./routes/router";
import { BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
}

export default App;
