import React, { useContext, useState } from 'react';
import { MenuMenu, MenuItem, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';


import {AuthContext} from "../context/auth";

function MenuBar() {
  const { user, logout } = useContext(AuthContext);

  const pathname = window.location.pathname;
  //about 
  const path = pathname === "/" ? 'home' : pathname.substr(1);

  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);


  const menuBar = user ? (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item name={user.username} active as={Link} to="/" />

      <Menu.Menu position="right">
        <Menu.Item name="logout" onClick={logout} />
      </Menu.Menu>
    </Menu>
  ) : (
        <Menu pointing secondary size='massive' color='teal'>

          <MenuItem
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={ Link }
            to ="/"
          />
          <MenuMenu position='right'>
            <MenuItem
              name='login'
              active={activeItem === 'login'}
              onClick={handleItemClick}
              as={ Link }
              to ="/login"
            />
            <MenuItem
              name='register'
              active={activeItem === 'register'}
              onClick={handleItemClick}
              as={ Link }
              to ="/register"
            />
            <MenuItem
              name='aboutme'
              active={activeItem === 'aboutme'}
              onClick={handleItemClick}
              as={ Link }
              to ="/aboutme"
            />
          </MenuMenu>
        </Menu>
    );

    return menuBar;
}


export default MenuBar;