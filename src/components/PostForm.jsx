import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PostForm({ initialValues, onSubmit, submitLabel }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(initialValues?.title || '');
  const [content, setContent] = useState(initialValues?.content || '');
  const [published, setPublished] = useState(initialValues?.published ?? true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setTitle(initialValues?.title || '');
    setContent(initialValues?.content || '');
    setPublished(initialValues?.published ?? true);
  }, [initialValues]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSaving(true);

    try {
      await onSubmit({ title, content, published });
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      {error && <div className="status-message error">{error}</div>}

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Post title"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Write your post..."
          required
        />
      </div>

      <div className="form-group checkbox-row">
        <input
          id="published"
          type="checkbox"
          checked={published}
          onChange={(event) => setPublished(event.target.checked)}
        />
        <label htmlFor="published">Published</label>
      </div>

      <div className="form-actions">
        <button className="btn btn-primary" type="submit" disabled={saving}>
          {saving ? 'Saving...' : submitLabel}
        </button>
        <button className="btn btn-secondary" type="button" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </div>
    </form>
  );
}
