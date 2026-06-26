const API_BASE = '/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (response.status === 204) {
    return null;
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }

  return data;
}

export const api = {
  getPosts: () => request('/posts'),
  getPost: (id) => request(`/posts/${id}`),
  createPost: (post) =>
    request('/posts', {
      method: 'POST',
      body: JSON.stringify(post),
    }),
  updatePost: (id, post) =>
    request(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(post),
    }),
  deletePost: (id) =>
    request(`/posts/${id}`, {
      method: 'DELETE',
    }),
};
