import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Loginpage';
import ResultPage from './pages/ResultPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/result" element={<ResultPage />} />
    </Routes>
  );
}
<h1 className="text-4xl font-bold text-blue-500 text-center mt-10">
  Tailwind is finally working!
</h1>


export default App;
