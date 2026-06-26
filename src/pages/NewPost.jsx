import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import PostForm from '../components/PostForm';

export default function NewPost() {
  const navigate = useNavigate();

  async function handleSubmit(values) {
    const post = await api.createPost(values);
    navigate(`/posts/${post.id}`);
  }

  return (
    <section>
      <h1 className="page-title">Create a post</h1>
      <p className="page-subtitle">Share something new with your readers.</p>
      <PostForm onSubmit={handleSubmit} submitLabel="Publish post" />
    </section>
  );
}
