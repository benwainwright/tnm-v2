import { FC, useState, useEffect } from "react";
import { Footer, Header } from "./molecules";
import Hero from "./hero";
import "./layout.css";
import { UserContext, User } from "../user-context";
import { currentUser } from "../aws/authenticate";
import { useAxe } from "../hooks";

import styled from "@emotion/styled";

const MainContainer = styled("main")`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 4rem;
`;

const Layout: FC = (props) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  useAxe();

  useEffect(() => {
    (async () => {
      setUser(await currentUser());
    })();
  }, []);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <Hero />
        <MainContainer>{props.children}</MainContainer>
        <Footer />
      </UserContext.Provider>
    </>
  );
};

export default Layout;
