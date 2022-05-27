import React, { ChangeEvent, FC, useState } from "react";
import { Button } from "../../elements/Button/Button";
import { FlexBox } from "../../elements/FlexBox";
import { Input } from "../../elements/Input/Input";

interface FormLoginProps {
  login: string;
  onLogin: (value: string) => void;
  onLogout: () => void;
}

const FormLogin: FC<FormLoginProps> = ({ login, onLogin, onLogout }) => {
  const [value, setValue] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onStartClick = () => {
    onLogin(value);
    setValue("");
  };

  return (
    <FlexBox flexDirection={"vertical"} width={"100%"} data-testid="formLogin">
      {!login ? (
        <>
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
        </>
      ) : (
        <>
          <label data-testid="greetingsUser">Здравствуйте, {login}!</label>
          <Button onClick={onLogout} data-testid="l-btn-logout">
            Выйти
          </Button>
        </>
      )}
    </FlexBox>
  );
};

export default FormLogin;
