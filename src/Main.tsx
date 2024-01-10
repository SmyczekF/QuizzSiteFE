import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import EmailConfirmed from './public/email-confirmed/EmailConfirmed';
import "./i18n";
import QuizzList from './pages/Quizz/QuizzList';

const Main = () => {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<Home />} /> {/* TODO: change to 404 page */}
                <Route path="/" element={<Home />} />
                <Route path="/email-confirmed" element={<EmailConfirmed />} />
                <Route path="/quizz/popular" element={<QuizzList title={'Popular Quizzes'} />} />
                <Route path="/quizz/tv-shows" element={<QuizzList title={'TV Shows'} />} />
                <Route path="/quizz/music" element={<QuizzList title={'Music'} />} />
                <Route path="/quizz/movies" element={<QuizzList title={'Movies'} />} />
                <Route path="/quizz/games" element={<QuizzList title={'Games'} />} />
                <Route path="/quizz/trivia" element={<QuizzList title={'Trivia'} />} />
                <Route path="/quizz/books" element={<QuizzList title={'Books'} />} />
                <Route path="/quizz/other" element={<QuizzList title={'Other'} />} />
            </Routes>
        </Router>
        
    );
}

export default Main;