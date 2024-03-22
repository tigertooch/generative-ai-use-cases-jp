import { Amplify, I18n } from 'aws-amplify';
import { Authenticator, translations } from '@aws-amplify/ui-react';
import './AuthWithUserpool.css';
import App from '../App.tsx';
import { AppStateProvider } from "../state/AppProvider";

const selfSignUpEnabled: boolean =
  import.meta.env.VITE_APP_SELF_SIGN_UP_ENABLED === 'true';

const AuthWithUserpool: React.FC = () => {
  Amplify.configure({
    Auth: {
      userPoolId: "ap-northeast-1_vCrTTUOB9",
      userPoolWebClientId: "4dsgb871gcfp4sp1tlrlnj018o",
      identityPoolId: "ap-northeast-1:e3d205a6-032f-4bf8-a9e1-c75a11961884",
      authenticationFlowType: 'USER_SRP_AUTH',
    },
  });

  I18n.putVocabularies(translations);
  I18n.setLanguage('ja');

  return (
    // <ThemeProvider theme={myTheme}>
      <>
      <Authenticator
        hideSignUp={!selfSignUpEnabled}
        components={{
          Header: () => (
            <div>
              <div className="text-aws-font-color mb-5 mt-10 flex justify-center text-3xl" style={{marginTop: '180px'}}>
              <span style={{ fontSize: '24px' }}>Generative AI on</span><span style={{ marginLeft: '100px',fontSize: '24px' }}>Systems</span>
              </div>
            </div>
          ),
        }}>
        <AppStateProvider>
          <App />
        </AppStateProvider>
        
      </Authenticator>
      </>
   // </ThemeProvider>
  );
};

export default AuthWithUserpool;
