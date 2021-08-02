import './App.css';
import Header from './components/Header';
import LoadApi from './components/LoadApi';
import Footer from './components/Footer';
function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <LoadApi />
      </div>
      <Footer />

    </div >
  );
}

export default App;
