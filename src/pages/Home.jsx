import { useEffect, useState } from 'react';
import { api } from '../api';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .getPosts()
      .then(setPosts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="status-message loading">Loading posts...</div>;
  }

  if (error) {
    return <div className="status-message error">{error}</div>;
  }

  return (
    <section>
      <h1 className="page-title">Stories and updates</h1>
      <p className="page-subtitle">
        A simple full-stack blog built with Node.js, Prisma, and React.
      </p>

      {posts.length === 0 ? (
        <div className="empty-state">No posts yet. Create your first one.</div>
      ) : (
        <div className="post-grid">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
