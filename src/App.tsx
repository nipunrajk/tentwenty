import Header from './components/Header';
import HeroBanner from './sections/HeroBanner';
import ProductsAndClients from './sections/ProductsAndClients';

function App() {
  return (
    <div>
      <Header />
      <main>
        <HeroBanner />
        <ProductsAndClients />
      </main>
    </div>
  );
}

export default App;
