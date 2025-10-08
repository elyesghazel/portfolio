import { useRoutes } from "react-router";
import routes from "./routes/app.routes";

// Main page
function App() {
  const routing = useRoutes(routes);
  return <>{routing}</>;
}

export default App;
