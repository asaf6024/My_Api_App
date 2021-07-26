import './App.css';
import LoadApi from './components/LoadApi';
function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>Top 20 Articles in last 24 hours</h1>
        <LoadApi />
      </div>
    </div>
  );
}

export default App;
