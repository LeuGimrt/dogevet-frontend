import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.header`
  height: 70px;

  display: flex;
  align-items: center;
  padding: 0 3rem;
  background-color: #080601;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.062);
  position: sticky;
  width: 100%;
`;

export const Logo = styled.img`
  height: 4rem;
`;

export const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavList = styled.ul`
  display: flex;
  flex-direction: row;
  margin-right: 1rem;
`;

export const NavLink = styled(Link)`
  font-size: 1rem;
  border-radius: 5px;
  color: #fff;
  display: flex;
  font-family: "Quicksand", sans-serif;
  margin: 0 5px;
  padding: 12px 10px;
  font-weight: 600;
  transition: background-color 150ms ease-in-out;
  position: relative;

  :hover {
    background-color: #444;
  }
`;

export const UserButton = styled.button`
  display: flex;
  padding: 5px 8px;
  align-items: center;
  transition: background-color 150ms ease-in-out;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  background-color: transparent;
  border: none;
  position: relative;
  :hover {
    background-color: #444;
  }
`;

export const UserMenu = styled.div`
  min-width: 130px;
  position: absolute;
  padding: 10px 5px;
  border-radius: 5px;
  top: 55px;
  display: none;
  background-color: #666;
  z-index: 2;
  animation: fade-in-user 0.2s ease-out;
  &.visible {
    display: block;
  }
  @keyframes fade-in-user {
    0% {
      height: 0;
      padding: 0;
    }
    100% {
      height: 110px;
      padding: 10px 5px;
    }
  }
`;

type AvatarImgProps = {
  size?: number;
};

export const AvatarImg = styled.img<AvatarImgProps>`
  height: ${({ size }) => `${size}px` || "60px"};
  width: ${({ size }) => `${size}px` || "60px"};
  border-radius: 100%;
`;

export const UsernameText = styled.span`
  font-size: 0.9rem;
  color: white;
  margin-left: 8px;
  max-width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const HamburgerButton = styled.button`
  background-color: #06061400;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0.4em 1em;
  border-radius: 5px;
  display: none;
  &:hover {
    background-color: #06061425;
  }
  @media (max-width: 768px) {
    display: block;
  }
`;

export const Icon = styled.span`
  color: #fff;
  font-size: 20px;
  position: relative;
  bottom: 2px;
`;

export const ResponsiveMenu = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  z-index: 1;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 20px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  display: none;
  animation: fade-in 0.25s ease-out;
  @media (max-width: 768px) {
    &.visible {
      display: block;
    }
  }

  @keyframes fade-in {
    0% {
      height: 0;
      padding: 0;
    }
    100% {
      height: 250px;
      padding: 20px 0;
    }
  }
`;
