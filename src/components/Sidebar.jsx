import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const items = ['posts', 'comments', 'albums', 'todos', 'users'];

  return (
    <aside className="sidebar">
      <h2>JSON App</h2>
      {items.map((item) => (
        <NavLink
          key={item}
          to={`/${item}`}
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </NavLink>
      ))}
    </aside>
  );
};

export default Sidebar;
