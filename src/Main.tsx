import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import EmailConfirmed from './public/email-confirmed/EmailConfirmed';

const Main = () => {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<Home />} /> {/* TODO: change to 404 page */}
                <Route path="/" element={<Home />} />
                <Route path="/email-confirmed" element={<EmailConfirmed />} 
                />
            </Routes>
        </Router>
        
    );
}

export default Main;