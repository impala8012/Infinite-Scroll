import React from "react";
import styled from "styled-components";
import { MEDIA_QUERY_MD } from "../../constants/style";
import { Link, useLocation,useHistory } from "react-router-dom";

const HeaderContainer = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0 0 0 32px;

  ${MEDIA_QUERY_MD} {
    flex-direction: column;
    align-items: center;
    height: 106px;
  }
`;
const Brand = styled.div`
  font-size: 32px;
  font-weight: bold;
  display: flex;
  align-items: center;
  cursor: pointer;

  ${MEDIA_QUERY_MD} {
    font-size: 24px;
    margin-top:10px;
  }
`;
const Navbarlist = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
  width: 300px;
`;

const Nav = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
  width: 150px;
  cursor: pointer;
  color: black;
  text-decoration: none;

  ${(props) =>
    props.$active &&
    `
  background: rgba(0,0,0,0.1)
  `}
`;

const Header = () => {
  const location = useLocation();
  const history = useHistory();
    return (
      <HeaderContainer>
        <Brand onClick={() => history.push("/")}>Dylan's Github Repositories</Brand>
        <Navbarlist>
          <Nav $active={location.pathname === "/"} to="/">
            我的 Repos
          </Nav>
          <Nav $active={location.pathname === "/aboutMe"} to="/aboutMe">
            關於我
          </Nav>
        </Navbarlist>
      </HeaderContainer>
    );
}

export default Header