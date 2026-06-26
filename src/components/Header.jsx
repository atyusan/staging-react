import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <Link to="/" className="brand">
          The <span>Journal</span>
        </Link>
        <Link to="/new" className="btn btn-primary">
          New Post
        </Link>
      </div>
    </header>
  );
}
