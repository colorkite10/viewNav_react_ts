import { Page } from "../../../types";
import styled from "@emotion/styled";

const ViewerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
`;

const Contents = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  padding: 5rem;
  font-size: 17px;
`;

const NextButton = styled.button`
  position: absolute;
  bottom: 20px;
  width: 20rem;
  height: 6rem;
  border: solid 1px black;
  border-radius: 50px;
  background: linear-gradient(to top, #b8ff3e, white);
  font-size: 16px;
  box-shadow: 5px 5px 5px #d289ff;
  cursor: pointer;
  transition: transform 250ms;

  &:hover {
    transform: scale(0.975);
  }
`;

interface ViewerProps<T> {
  contents: T;
  toNextPage: () => void;
}

const Viewer = ({ contents, toNextPage }: ViewerProps<Page>) => {
  return (
    <ViewerContainer>
      <Contents>{`${contents.contents}`}</Contents>
      <NextButton onClick={() => toNextPage()}> ▶️NEXT</NextButton>
    </ViewerContainer>
  );
};

export default Viewer;
