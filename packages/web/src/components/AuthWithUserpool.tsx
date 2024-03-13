import { Amplify, I18n } from 'aws-amplify';
import { Authenticator, translations } from '@aws-amplify/ui-react';
import './AuthWithUserpool.css'; // 调整路径以匹配实际文件位置
import App from '../App.tsx';

const selfSignUpEnabled: boolean =
  import.meta.env.VITE_APP_SELF_SIGN_UP_ENABLED === 'true';

const AuthWithUserpool: React.FC = () => {
  Amplify.configure({
    Auth: {
      userPoolId: "us-west-2_u0R9SBegd",
      userPoolWebClientId: "u806j4mlioraqki4i9j8nstkv",
      identityPoolId: "us-west-2:3428c34e-2ea4-4fe1-a9f9-7a91058cc244",
      authenticationFlowType: 'USER_SRP_AUTH',
    },
  });

  I18n.putVocabularies(translations);
  I18n.setLanguage('ja');

  return (
    // <ThemeProvider theme={myTheme}>
      <>
      <div className="black-bar"></div>
      <Authenticator
        hideSignUp={!selfSignUpEnabled}
        components={{
          Header: () => (
            <div className="text-aws-font-color mb-5 mt-10 flex justify-center text-3xl" style={{marginTop: '180px'}}>
              <div ></div>
              <span style={{ fontSize: '24px' }}>Generative AI on</span><span style={{ marginLeft: '100px',fontSize: '24px' }}>Systems</span>
            </div>
          ),
        }}>
        <App />
      </Authenticator>
      </>
   // </ThemeProvider>
  );
};

export default AuthWithUserpool;
