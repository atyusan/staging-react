import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import NewPost from './pages/NewPost';
import EditPost from './pages/EditPost';

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:id" element={<PostPage />} />
            <Route path="/posts/:id/edit" element={<EditPost />} />
            <Route path="/new" element={<NewPost />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
