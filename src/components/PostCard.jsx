import { Link } from 'react-router-dom';

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function PostCard({ post }) {
  return (
    <article className="post-card">
      <p className="post-meta">{formatDate(post.createdAt)}</p>
      <Link to={`/posts/${post.id}`}>
        <h2>{post.title}</h2>
      </Link>
      <p className="post-excerpt">{post.excerpt}</p>
    </article>
  );
}
