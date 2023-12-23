import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';

const Main = () => {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<Home />} /> {/* TODO: change to 404 page */}
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
        
    );
}

export default Main;