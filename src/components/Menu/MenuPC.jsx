import { useEffect } from 'react';

import './menuPC.css';

var subMenu = 0,
  listSubmenu = [];

function MenuPC(props) {
  useEffect(() => {
    listSubmenu = document.querySelectorAll('li');
    subMenu = props.subMenu;
    if (!subMenu || subMenu >= listSubmenu.length) subMenu = 0;

    listSubmenu[subMenu].classList.add('active');

    const handleLogOut = () => {
      localStorage.removeItem('role');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('username');
    };

    const logoutMenu = document.querySelector('.logout');
    if (logoutMenu !== null) {
      logoutMenu.addEventListener('click', handleLogOut);
    }

    return () => {
      if (logoutMenu !== null)
        logoutMenu.removeEventListener('click', handleLogOut);
    };
  });

  const handleToggleMenu = () => {
    const navigationBox = document.querySelector('.navigation-box');
    navigationBox.classList.toggle('open');
    navigationBox.classList.toggle('not-open');
  };

  const handleMouseEnterMenu = (e) => {
    listSubmenu.forEach((item) => item.classList.remove('active'));
    e.currentTarget.classList.add('active');
  };

  const handleMouseOutMenu = (e) => {
    e.currentTarget.classList.remove('active');
    listSubmenu[Number(subMenu)].classList.add('active');
  };

  return (
    <div className="navigation-box not-open">
      <div className="menu-toggle" onClick={handleToggleMenu}></div>
      <div className="navigation">
        <ul>
          {props.menu.map((e, index) => (
            <li
              key={index}
              id={index}
              className={e.classname}
              onMouseEnter={handleMouseEnterMenu}
              onMouseLeave={handleMouseOutMenu}
            >
              <a href={e.link}>
                <span className="icon">{e.icon}</span>
                <span className="text">{e.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MenuPC;
