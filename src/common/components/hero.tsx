import { FC } from "react";
import styled from "@emotion/styled";
import { MENUBAR_HEIGHT } from "../config";

const HeroBox = styled("div")`
  min-height: 330px;
  padding-top: calc(${MENUBAR_HEIGHT} + 14px);
  height: 330px;
  border-bottom: 1px solid black;
  font-family: "Acumin Pro Semicondensed", Arial, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #d4f9e3;
`;

const HeroHeaderTag = styled("h1")`
  font-size: 40px;
  text-align: center;
  color: #3b7d7a;
`;

const Hero: FC = () => (
  <HeroBox>
    <HeroHeaderTag>Your Account</HeroHeaderTag>
  </HeroBox>
);

export default Hero;
