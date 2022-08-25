import React, { useContext, useEffect, Suspense } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { AuthContext } from "./context/AuthContext";
import { ThemeContext } from "./context/ThemeContext";
import jwt_decode from "jwt-decode";

const Home = React.lazy(() => import("./pages/Home/Home"));
const Register = React.lazy(() => import("./pages/Register/Register"));
const Login = React.lazy(() => import("./pages/Login/Login"));
const NotFound = React.lazy(() => import("./pages/NotFound/NotFound"));

const httpLink = createHttpLink({
  uri: "https://kanban-appi.herokuapp.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    const decoded = jwt_decode(token.token);

    if (Date.now() >= decoded.exp * 1000) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  }
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token.token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  const { user } = useContext(AuthContext);
  const { isDarkMode } = useContext(ThemeContext);
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
    }
  }, [isDarkMode]);

  return (
    <ApolloProvider client={client}>
      <ErrorBoundary>
        <Router>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={user ? <Home /> : <Login />} />
              <Route
                path="/register"
                element={user ? <Home /> : <Register />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Router>
      </ErrorBoundary>
    </ApolloProvider>
  );
};

export default App;
