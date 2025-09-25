import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./store";
import TablePasien from "../pages/TablePasien.jsx";
import FormPasien from "../pages/FormPasien.jsx";
import Navbar from "../components/Navbar.jsx";
import TopTicker from "./components/TopTicker.jsx";
import Footer from "./components/Footer.jsx";
import Sidebar from "./components/Sidebar.jsx";
import "./App.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-sm text-red-700">
          <div className="font-semibold mb-2">Something went wrong.</div>
          <pre className="whitespace-pre-wrap text-xs bg-red-50 p-3 rounded border border-red-200">
            {String(this.state.error)}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <TopTicker />
        <Navbar />
        <Sidebar />

        <main className="pl-0 sm:pl-16 pt-[72px]">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<TablePasien />} />
              <Route path="/form-pasien" element={<FormPasien />} />
            </Routes>
          </ErrorBoundary>
        </main>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
