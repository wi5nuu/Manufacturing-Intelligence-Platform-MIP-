import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Layout } from './layout.tsx';
import { ExecutiveDashboard } from './pages/ExecutiveDashboard.tsx';
import { ProductionFloor } from './pages/ProductionFloor.tsx';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<ExecutiveDashboard />} />
          <Route path="/production" element={<ProductionFloor />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
