import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import EmailConfirmed from './public/email-confirmed/EmailConfirmed';
import "./i18n";
import QuizzList from './pages/QuizzList/QuizzList';
import Quizz from './pages/Quizz/Quizz';
import Account from './pages/Account/Account';

const Main = () => {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<Home />} /> {/* TODO: change to 404 page */}
                <Route path="/" element={<Home />} />
                <Route path="/email-confirmed" element={<EmailConfirmed />} />
                <Route path="/quizz-list/:genre" element={<QuizzList />} />
                <Route path="/quizz/:id" element={<Quizz />} />
                <Route path="/profile" element={<Account />} />
            </Routes>
        </Router>
        
    );
}

export default Main;