import React, { ChangeEvent, FC, useState } from "react";
import { Button } from "../../elements/Button/Button";
import { FlexBox } from "../../elements/FlexBox";
import { Header } from "../../elements/Header";
import { Input } from "../../elements/Input/Input";
import { useUserActions } from "../../hooks/useActions";
import { useLogin } from "../../hooks/useLogin";
import { saveLocalLogin } from "../../localStorage";
import { useRouter } from "next/router";
import { ROUTE } from "../../constants";

const FormLogin: FC = () => {
  const [value, setValue] = useState("");
  const { login } = useUserActions();
  const router = useRouter();

  useLogin();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.trim());
  };

  const onStartClick = () => {
    login(value);
    setValue("");
    router.push(ROUTE.ROOT);
    saveLocalLogin(value);
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
