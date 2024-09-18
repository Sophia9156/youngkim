import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "hooks/useStore";
import { loginRequest, logoutRequest } from "store/Login";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Button from "components/items/Button";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoggingIn, user } = useAppSelector((state) => state.login);

  const handleLogin = () => dispatch(loginRequest());

  useEffect(() => {
    if (isLoggingIn) {
      if (user === "suhyun9156@gmail.com" || user === "coolzox@gmail.com") {
        navigate("/admin-home");
      } else {
        toast.dismiss();
        toast.error("인증되지 않은 사용자 입니다.");
        dispatch(logoutRequest());
      }
    }
  }, [isLoggingIn, user, navigate, dispatch]);

  return (
    <Container>
      <Button
        color="black"
        size="big"
        onClick={handleLogin}>
        로그인
      </Button>
    </Container>
  );
};

export default Login;

const Container = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
