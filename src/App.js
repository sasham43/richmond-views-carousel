import logo from './logo.svg';
import './App.css';

import Carousel from './components/Carousel'

function App() {
  const slides = [
    {
      image_url: 'https://dougashphotography.com/wp-content/gallery/around-rva/Libby-Hill-Silhouette.jpg',
      aria_label: 'Libby Hill silhouette during sunset',
      link_url: 'https://dougashphotography.com/sunsets-richmond-va/',
    },
    {
      image_url: 'https://dougashphotography.com/wp-content/gallery/around-rva/untitled-6346.jpg',
      aria_label: 'Sunset from Libby Hill',
      link_url: 'https://dougashphotography.com/sunsets-richmond-va/',
    },
    {
      image_url: 'https://dougashphotography.com/wp-content/gallery/around-rva/Richmonds-Purple-Reflection.jpg',
      link_url: 'https://dougashphotography.com/sunsets-richmond-va/',
      aria_label: `Richmond's Purple Reflections`,
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
