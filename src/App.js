import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoadApi from './components/LoadApi';
function App() {

  return (
    <div className="App">
      <div className="container">
        <h1>Top 20 Articles Today</h1>
        <LoadApi />
      </div>
    </div>
  );
}

export default App;
