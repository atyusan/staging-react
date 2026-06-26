import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../api';

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    api
      .getPost(id)
      .then(setPost)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleDelete() {
    if (!window.confirm('Delete this post?')) return;

    setDeleting(true);
    try {
      await api.deletePost(id);
      navigate('/');
    } catch (err) {
      setError(err.message);
      setDeleting(false);
    }
  }

  if (loading) {
    return <div className="status-message loading">Loading post...</div>;
  }

  if (error) {
    return <div className="status-message error">{error}</div>;
  }

  return (
    <article className="post-detail">
      <p className="post-meta">
        {formatDate(post.createdAt)}
        {!post.published && ' · Draft'}
      </p>
      <h1>{post.title}</h1>
      <div className="post-content">{post.content}</div>

      <div className="post-actions">
        <Link to={`/posts/${post.id}/edit`} className="btn btn-secondary">
          Edit
        </Link>
        <button className="btn btn-danger" onClick={handleDelete} disabled={deleting}>
          {deleting ? 'Deleting...' : 'Delete'}
        </button>
        <Link to="/" className="btn btn-secondary">
          Back to home
        </Link>
      </div>
    </article>
  );
}
