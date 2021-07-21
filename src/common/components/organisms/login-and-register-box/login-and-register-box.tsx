import { FC } from "react"
import { TabBox, Tab, Box } from "@common/components/containers"
import styled from "@emotion/styled"
import LoginBox from "./login-box"
import RegisterBox from "./register-box"

const Padding = styled.div`
  padding: 1.5rem 5rem 3rem 5rem;
`

const LoginAndRegisterBox: FC = () => (
  <Box>
    <TabBox>
      <Tab tabTitle="Login">
        <Padding>
          <LoginBox />
        </Padding>
      </Tab>
      <Tab tabTitle="Register">
        <Padding>
          <RegisterBox />
        </Padding>
      </Tab>
    </TabBox>
  </Box>
)

export default LoginAndRegisterBox
