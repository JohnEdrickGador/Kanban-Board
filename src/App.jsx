import React, {createContext, useState} from "react";
import StatusContainer from "./components/StatusContainer";

export const RefreshContext = createContext();

function App() {
  const [refresh, isRefresh] = useState(false);

  return (
    <div className="main-container">
      <div className="tasks-container">
        <RefreshContext.Provider value={[refresh, isRefresh]}>
          <StatusContainer status = "Backlog" />
          <StatusContainer status = "In Progress" />
          <StatusContainer status = "Done" />
        </RefreshContext.Provider>
      </div>
    </div>
  )
}

export default App
