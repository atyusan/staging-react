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

  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');

  if (!isJson) {
    const text = await response.text();
    throw new Error(
      response.ok
        ? 'Unexpected response from server'
        : text || `Request failed (${response.status})`
    );
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }

  return data;
}

export const api = {
  getPosts: async () => {
    const data = await request('/posts');
    if (!Array.isArray(data)) {
      throw new Error('Invalid response from server');
    }
    return data;
  },
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
