import { Alert, Checkbox } from 'antd';
import React, { useState } from 'react';
import { Link, connect, Dispatch } from 'umi';
import { StateType } from '@/models/login';
import { LoginParamsType } from '@/services/login';
import { ConnectState } from '@/models/connect';
import LoginForm from './components/Login';

import styles from './style.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginForm;
interface LoginProps {
  dispatch: Dispatch;
  userLogin: StateType;
  submitting?: boolean;
}

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC<LoginProps> = (props) => {
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState<string>('account');

  const handleSubmit = (values: LoginParamsType) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values, type },
    });
  };
  return (
    <div className={styles.main}>
      <LoginForm activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        <Tab key="account" tab="Login com senha da conta">
          {status === 'error' && loginType === 'account' && !submitting && (
            <LoginMessage content="Conta ou senha incorreta" />
          )}

          <UserName
            name="userName"
            placeholder="Login"
            rules={[
              {
                required: true,
                message: 'Por favor insira o login de usuário!',
              },
            ]}
          />
          <Password
            name="password"
            placeholder="Senha"
            rules={[
              {
                required: true,
                message: 'Por favor insira a senha!',
              },
            ]}
          />
        </Tab>
        {/* <Tab key="mobile" tab="Login do número do celular">
          {status === 'error' && loginType === 'mobile' && !submitting && (
            <LoginMessage content="Erro de código de verificação" />
          )}
          <Mobile
            name="mobile"
            placeholder="Número de telefone"
            rules={[
              {
                required: true,
                message: 'Por favor, insira o número do telefone!',
              },
              {
                pattern: /^1\d{10}$/,
                message: 'Número de telefone incorreto!',
              },
            ]}
          />
          <Captcha
            name="captcha"
            placeholder="Código de verificação"
            countDown={120}
            getCaptchaButtonText=""
            getCaptchaSecondText="segundo"
            rules={[
              {
                required: true,
                message: 'Por favor, insira o código de verificação!',
              },
            ]}
          />
        </Tab> */}
        <div>
          <Checkbox checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)}>
            Login Automático
          </Checkbox>
          <a
            style={{
              float: 'right',
            }}
          >
            Esqueceu a senha
          </a>
        </div>
        <Submit loading={submitting}>Conecte-se</Submit>
        <div className={styles.other}>
          <Link className={styles.register} to="/user/register">
            Registrar conta
          </Link>
        </div>
      </LoginForm>
    </div>
  );
};

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
