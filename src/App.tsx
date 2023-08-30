import React, { useRef } from "react";
import axios from "axios";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { Header, Viewer } from "./components/main";
import { useAsync, useStorage } from "./hooks";
import { StoredPagesInfo } from "./types";

import styled from "@emotion/styled";

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(to bottom, #ffb9f0, #ffffff, #ffffff);
  box-sizing: border-box;
`;

const App = () => {
  const TRANSITION_DELAY = 500;

  const initialState: StoredPagesInfo = {
    currentPage: { id: 0, name: "❤️", contents: "ฅʕ•̫͡•ʔฅ" },
    storedPreviousPages: [],
  };

  const [state, setState] = useStorage(localStorage, "pages", initialState);
  const transitionAction = useRef("");
  const posts = useAsync(async () => {
    return await axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then((response) => response.data);
  }, []);

  const toHomePage = () => {
    transitionAction.current = "slide";
    setState(initialState);
  };

  const toPrevPage = () => {
    transitionAction.current = "slide";
    const pages = state.storedPreviousPages;

    if (pages.length > 0) {
      setState({
        currentPage: pages[pages.length - 1],
        storedPreviousPages: pages.slice(0, -1),
      });
    }
  };

  const toNextPage = () => {
    transitionAction.current = "fade";
    setState({
      currentPage: {
        id: state.currentPage.id + 1,
        //@ts-expect-error:배포중 오류
        name: posts.value[state.currentPage.id + 1].email,
        //@ts-expect-error:배포중 오류
        contents: posts.value[state.currentPage.id + 1].body,
      },
      storedPreviousPages: [...state.storedPreviousPages, state.currentPage],
    });
  };

  return (
    <AppContainer>
      <Header
        id={state.currentPage.id}
        title={state.currentPage.name}
        toPrevPage={toPrevPage}
        toHomePage={toHomePage}
      />
      <TransitionGroup
        component={"div"}
        childFactory={(child) => {
          return React.cloneElement(child, {
            classNames: transitionAction.current,
          });
        }}
      >
        <CSSTransition key={state.currentPage.id} timeout={TRANSITION_DELAY}>
          <Viewer contents={state.currentPage} toNextPage={toNextPage} />
        </CSSTransition>
      </TransitionGroup>
    </AppContainer>
  );
};

export default App;
