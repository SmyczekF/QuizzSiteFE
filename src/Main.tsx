import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import EmailConfirmed from './public/email-confirmed/EmailConfirmed';
import "./i18n";
import QuizzList from './pages/QuizzList/QuizzList';
import Quizz from './pages/Quizz/Quizz';

const Main = () => {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<Home />} /> {/* TODO: change to 404 page */}
                <Route path="/" element={<Home />} />
                <Route path="/email-confirmed" element={<EmailConfirmed />} />
                <Route path="/quizz-list/popular" element={<QuizzList title={'Popular Quizzes'} />} />
                <Route path="/quizz-list/tv-shows" element={<QuizzList title={'TV Shows'} />} />
                <Route path="/quizz-list/music" element={<QuizzList title={'Music'} />} />
                <Route path="/quizz-list/movies" element={<QuizzList title={'Movies'} />} />
                <Route path="/quizz-list/games" element={<QuizzList title={'Games'} />} />
                <Route path="/quizz-list/trivia" element={<QuizzList title={'Trivia'} />} />
                <Route path="/quizz-list/books" element={<QuizzList title={'Books'} />} />
                <Route path="/quizz-list/other" element={<QuizzList title={'Other'} />} />
                <Route path="/quizz/:id" element={<Quizz />} />
            </Routes>
        </Router>
        
    );
}

export default Main;