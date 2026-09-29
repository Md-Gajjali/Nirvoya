import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();

  // ১. URL Path থেকে ফাঁকা অংশগুলো বাদ দিয়ে অ্যারে তৈরি
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav aria-label="breadcrumb">
      <ul style={{ display: 'flex', gap: '8px', listStyle: 'none', padding: 0 }}>
        <li>
          <Link to="/">Home</Link>
        </li>

         {pathnames.map((name, index) => {
           const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={routeTo} style={{ display: 'flex', gap: '8px' }}>
              <span>&gt;</span>
              {isLast ? (
                // শেষের পেজটিতে লিংক হবে না (Active)
                <span style={{ fontWeight: 'bold' }}>{name}</span>
              ) : (
                <Link to={routeTo}>{name}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;