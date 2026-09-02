import { Route, Routes } from 'react-router-dom';
import Overview from './pages/Overview';
import StationDetail from './pages/StationDetail';

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/station/:slug" element={<StationDetail />} />
        </Routes>
    );
}
