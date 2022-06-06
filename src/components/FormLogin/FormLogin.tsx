import React, { ChangeEvent, FC, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../elements/Button/Button";
import { FlexBox } from "../../elements/FlexBox";
import { Header } from "../../elements/Header";
import { Input } from "../../elements/Input/Input";
import { LocationState } from "../../types";
import { UserLoginContext } from "../UserLoginProvider/UserLoginProvider";

const FormLogin: FC = () => {
  const { onLogin } = useContext(UserLoginContext);
  const [value, setValue] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  const locationState = location.state as LocationState;
  const from = locationState?.from?.pathname || "/";

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onStartClick = () => {
    onLogin(value);
    setValue("");
    navigate(from, { replace: true });
  };

  return (
    <FlexBox
      flexDirection="vertical"
      justifyContent="center"
      alignItems="center"
      margin="18% auto"
    >
      <Header>Игра «Жизнь»</Header>
      <FlexBox flexDirection="vertical" width="250px" data-testid="formLogin">
        <Input
          type="text"
          id="login"
          data-testid="inputUserName"
          placeholder="Введите ваше имя"
          value={value}
          onChange={onChange}
        />
        <Button onClick={onStartClick} data-testid="l-btn-login">
          Старт
        </Button>
      </FlexBox>
    </FlexBox>
  );
};

export default FormLogin;
