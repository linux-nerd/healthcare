import './App.css';
import { AddService } from "./pages/add-service";
import { AddServiceProvider } from "./providers/add-service-provider";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      <div className="app__container">
        <AddServiceProvider>
          <AddService />
        </AddServiceProvider>
      </div>
      {/* </header> */}
    </div>
  );
}

export default App;
