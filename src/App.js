import logo from './logo.svg';
import './App.css';

import Carousel from './components/Carousel'

function App() {
  const slides = [
    {
      image_url: '',
      link_url: '',
    },
    {
      image_url: '',
      link_url: '',
    },
    {
      image_url: '',
      link_url: '',
    },
  ]
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Carousel 
        slides={slides}
      />
    </div>
  );
}

export default App;
