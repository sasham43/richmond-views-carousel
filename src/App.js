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
      <header>
        <h1 className="header">Views of Richmond</h1>
      </header>
      <main>
        <Carousel 
          slides={slides}
        />
      </main>
    </div>
  );
}

export default App;
