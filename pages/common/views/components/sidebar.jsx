import React from 'react';

const Sidebar = ({ children }) => (
  <div className="column-one-third sidebar">
    <aside>
      { children }
    </aside>
  </div>
);

export default Sidebar;
