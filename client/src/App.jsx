import "./App.css";
import { LoginForm } from "./LoginForm";
import { UserContext } from "./UserContext";
import { useState, useCallback, useMemo } from "react";
import { User } from "./User.jsx";
import { Something } from "./Something";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const [user, setUser] = useState(null);
  const login = useCallback((u) => setUser(u), []);
  const logout = useCallback(() => setUser(null), []);
  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={value}>
        <div className="app">
          <LoginForm />
          <header>
            <h1>Albert stock watch</h1>
            <User />
          </header>
          {user && <Something />}
        </div>
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
