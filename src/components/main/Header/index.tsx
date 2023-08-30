import Navigation from "../../base/Navigation";
import styled from "@emotion/styled";

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 5rem;
  margin-top: 2rem;
  border: solid 1px black;
  border-radius: 20px;
  z-index: 1;
  background: linear-gradient(to top, #abe8fb, #fef8f8);
  box-shadow: 5px 5px 5px hotpink;
  box-sizing: border-box;
`;

const PrevButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 40px;
  height: 40px;
  padding: 0;
  padding-left: 30px;
  border: none;
  background-color: transparent;
  font-size: 35px;
  text-shadow: 4px 2px 2px grey;
  cursor: pointer;
`;

const Title = styled.div`
  flex-grow: 1;
  padding: 1px;
  margin: auto;
  text-align: center;
`;

const HomeButton = styled.button`
  position: absolute;
  top: 10px;
  right: 30px;
  width: 40px;
  height: 40px;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 35px;
  text-shadow: 4px 2px 2px grey;

  cursor: pointer;
`;

interface HeaderProps {
  id: number;
  title: string;
  toPrevPage: () => void;
  toHomePage: () => void;
}

const Header = ({ id, title, toPrevPage, toHomePage }: HeaderProps) => {
  const NAV_SIZE = 20;

  return (
    <HeaderContainer>
      {id !== 0 && <PrevButton onClick={() => toPrevPage()}>⏮️</PrevButton>}
      <Title>
        <Navigation size={NAV_SIZE} strong>
          {`${title}`}
        </Navigation>
      </Title>
      {id !== 0 && <HomeButton onClick={() => toHomePage()}>🏠</HomeButton>}
    </HeaderContainer>
  );
};

export default Header;
