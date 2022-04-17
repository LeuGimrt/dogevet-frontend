import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import Logo from "../../assets/dogevet-logo-color.png";
import { AuthContext } from "../../context/AuthContext";
import { LinkButton } from "../../elements/Button";

import {
  NavContainer,
  ResponsiveMenu,
  AvatarImg,
  Container,
  HamburgerButton,
  Icon,
  Logo as LogoComp,
  NavLink,
  NavList,
  UsernameText,
  UserButton,
  UserMenu,
} from "./styles";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { logout, status, user } = useContext(AuthContext);

  return (
    <Container>
      <Link to='/'>
        <LogoComp src={Logo} />
      </Link>
      <NavContainer>
        {status === "checking" ? (
          <></>
        ) : status === "authenticated" ? (
          <>
            <NavList>
              <li>
                <NavLink to='/home'>Inicio</NavLink>
              </li>
              <li>
                <NavLink to='/register-dog'>Registro</NavLink>
              </li>
              <li>
                <NavLink to='/view-dogs'>Consultas</NavLink>
              </li>
            </NavList>

            <UserButton onClick={() => setShowUserMenu((value) => !value)}>
              <AvatarImg
                src='https://cdn-icons-png.flaticon.com/512/147/147144.png'
                alt='Usuario'
                size={40}
              />
              <UsernameText>{user?.firstname}</UsernameText>
              <UserMenu className={showUserMenu ? "visible" : ""}>
                <ul>
                  <li>
                    <NavLink to='/profile'>Mi perfil</NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={() => {
                        logout();
                      }}
                      to='/login'
                    >
                      Salir
                    </NavLink>
                  </li>
                </ul>
              </UserMenu>
            </UserButton>
          </>
        ) : (
          <>
            <div>
              <LinkButton to='/login' size='sm' bgcolor='primary'>
                Iniciar Sesión
              </LinkButton>
              <LinkButton to='/register' size='sm' bgcolor='secondary'>
                Registro
              </LinkButton>
            </div>
          </>
        )}
      </NavContainer>
      <HamburgerButton
        className='hamburger'
        onClick={() => setShowMenu((value) => !value)}
      >
        <Icon>☰</Icon>
      </HamburgerButton>
      {status === "checking" ? (
        <></>
      ) : status === "authenticated" ? (
        <>
          <ResponsiveMenu className={showMenu ? "visible" : ""}>
            <ul>
              <li>
                <NavLink to='/home'>Inicio</NavLink>
              </li>
              <li>
                <NavLink to='/register-dog'>Registro</NavLink>
              </li>
              <li>
                <NavLink to='/view-dogs'>Consultar</NavLink>
              </li>
              <li>
                <NavLink to='/profile'>Ir a mi perfil</NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => {
                    logout();
                  }}
                  to='/login'
                >
                  Cerrar Sesión
                </NavLink>
              </li>
            </ul>
          </ResponsiveMenu>
        </>
      ) : (
        <ResponsiveMenu
          className={`responsive-menu ${showMenu ? "visible" : ""}`}
        >
          <ul>
            <li>
              <NavLink to='/login'>Iniciar Sesión</NavLink>
            </li>
            <li>
              <NavLink to='/new-dog'>Registro</NavLink>
            </li>
          </ul>
        </ResponsiveMenu>
      )}
    </Container>
  );
};

export default Navbar;
