import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./components/Main";
import RequestForm from "./components/RequestForm";
import StatementsStart from "./components/StatementsStart";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/_wt/new_requests/doc_id/:id" element={<Main />} />
        <Route
          path="/_wt/request_form/:id/doc_id/:docId"
          element={<RequestForm />}
        />
        <Route
          path="/_wt/references_request_new"
          element={<StatementsStart />}
        />
      </Routes>
    </div>
  );
}

export default App;
