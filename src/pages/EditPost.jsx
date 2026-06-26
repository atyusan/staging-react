import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../api';
import PostForm from '../components/PostForm';

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .getPost(id)
      .then(setPost)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(values) {
    const updated = await api.updatePost(id, values);
    navigate(`/posts/${updated.id}`);
  }

  if (loading) {
    return <div className="status-message loading">Loading post...</div>;
  }

  if (error) {
    return <div className="status-message error">{error}</div>;
  }

  return (
    <section>
      <h1 className="page-title">Edit post</h1>
      <p className="page-subtitle">Update your title, content, or publish status.</p>
      <PostForm initialValues={post} onSubmit={handleSubmit} submitLabel="Save changes" />
    </section>
  );
}
