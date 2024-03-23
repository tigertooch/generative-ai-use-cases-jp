import React, { useMemo ,useState,useContext,useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  PiList,
  // PiHouse,
  PiChatCircleText,
  // PiPencil,
  // PiNote,
  // PiChatsCircle,
  // PiPenNib,
  // PiMagnifyingGlass,
  // PiTranslate,
  // PiImages,
  // PiSpeakerHighBold,
  // PiGear,
  // PiGlobe,
  PiX,
  PiGear,
  // PiRobot,
  // PiUploadSimple,
} from 'react-icons/pi';
import { Outlet } from 'react-router-dom';
import Drawer, { ItemProps } from './components/Drawer';
import ButtonIcon from './components/ButtonIcon';
import '@aws-amplify/ui-react/styles.css';
import useDrawer from './hooks/useDrawer';
import useVersion from './hooks/useVersion';
import useConversation from './hooks/useConversation';
import PopupInterUseCasesDemo from './components/PopupInterUseCasesDemo';
import useInterUseCases from './hooks/useInterUseCases';
import {SuggestionPanel} from './components/SuggestionPanel';
import {NewSuggestionItemPanel} from './components/NewSuggestionItemPanel';
import {AppStateContext } from "./state/AppProvider";
import {SugguestionItem } from './hooks/useModel';
import IconWithDot from './components/IconWithDot';
import useSWR from 'swr';
import { Auth } from 'aws-amplify';

// const ragEnabled: boolean = import.meta.env.VITE_APP_RAG_ENABLED === 'true';
// const agentEnabled: boolean = import.meta.env.VITE_APP_AGENT_ENABLED === 'true';
// const recognizeFileEnabled: boolean =
//   import.meta.env.VITE_APP_RECOGNIZE_FILE_ENABLED === 'true';
 
const items: ItemProps[] = [
  // {
  //   label: 'ホーム',
  //   to: '/',
  //   icon: <PiChatCircleText />,
  //   display: 'usecase' as const,
  //   name:'home',
  // },
  // {
  //   label: '設定情報',
  //   to: '/setting',
  //   icon: <PiGear />,
  //   display: 'none' as const,
  // },
  // {
  //   label: 'チャット',
  //   to: '/chat',
  //   icon: <PiChatsCircle />,
  //   display: 'usecase' as const,
  //   name:'chat',
  // },
  {
    label: 'RAG チャット',
    to: '/rag',
    icon: <PiChatCircleText />,
    display: 'usecase' as const,
    name:'ragchat',
  },
  // agentEnabled
  //   ? {
  //       label: 'Agent チャット',
  //       to: '/agent',
  //       icon: <PiRobot />,
  //       display: 'usecase' as const,
  //     }
  //   : null,
  // {
  //   label: '文章生成',
  //   to: '/generate',
  //   icon: <PiPencil />,
  //   display: 'usecase' as const,
  // },
  // {
  //   label: '要約',
  //   to: '/summarize',
  //   icon: <PiNote />,
  //   display: 'usecase' as const,
  // },
  // {
  //   label: '校正',
  //   to: '/editorial',
  //   icon: <PiPenNib />,
  //   display: 'usecase' as const,
  // },
  // {
  //   label: '翻訳',
  //   to: '/translate',
  //   icon: <PiTranslate />,
  //   display: 'usecase' as const,
  // },
  // {
  //   label: 'Web コンテンツ抽出',
  //   to: '/web-content',
  //   icon: <PiGlobe />,
  //   display: 'usecase' as const,
  // },
  // {
  //   label: '画像生成',
  //   to: '/image',
  //   icon: <PiImages />,
  //   display: 'usecase' as const,
  // },
  // {
  //   label: '音声認識',
  //   to: '/transcribe',
  //   icon: <PiSpeakerHighBold />,
  //   display: 'tool' as const,
  // },
  // recognizeFileEnabled
  //   ? {
  //       label: 'ファイルアップロード',
  //       to: '/file',
  //       icon: <PiUploadSimple />,
  //       display: 'tool' as const,
  //     }
  //   : null,
  // ragEnabled
  //   ? {
  //       label: 'Kendra 検索',
  //       to: '/kendra',
  //       icon: <PiMagnifyingGlass />,
  //       display: 'tool' as const,
  //     }
  //   : null,
].flatMap((i) => (i !== null ? [i] : []));

// /chat/:chatId の形式から :chatId を返す
// path が別の形式の場合は null を返す
const extractChatId = (path: string): string | null => {
  const pattern = /\/chat\/(.+)/;
  const match = path.match(pattern);

  return match ? match[1] : null;
};

const App: React.FC = () => {
  const { getHasUpdate } = useVersion();

  // 第一引数は不要だが、ないとリクエストされないため 'user' 文字列を入れる
  const { data } = useSWR('user', async () => {
    return await Auth.currentAuthenticatedUser();
  });

  const email = useMemo(() => {
    return data?.signInUserSession?.idToken?.payload?.email ?? '';
  }, [data]);

  const hasUpdate = getHasUpdate();

  const { switchOpen: switchDrawer, opened: isOpenDrawer } = useDrawer();
  const { pathname } = useLocation();
  const { getConversationTitle } = useConversation();
  const { isShow } = useInterUseCases();

  const label = useMemo(() => {
    const chatId = extractChatId(pathname);

    if (chatId) {
      return getConversationTitle(chatId) || '';
    } else {
      return items.find((i) => i.to === pathname)?.label || '';
    }
  }, [pathname, getConversationTitle]);


  const appStateContext = useContext(AppStateContext)
   // 处理点击事件的函数
  //  const handleItemClick = (item) => {
  //   // 假设 item 有一个属性可以用来判断是否为聊天页面，比如 id 或 name
  //   if (item.name === 'chat') {
  //     setIsOpenChat(true);
  //   } else {
  //     setIsOpenChat(false);
  //   }
  // };
  useEffect(() => {
    const messages = JSON.parse(localStorage.getItem("newSugguestionItems") || '[]');
    setSugguestionItems(messages);
  }, []);
  

  const [sugguestionItems, setSugguestionItems] = useState<SugguestionItem[]>([]);

  const onSave = (sugguestionItem: SugguestionItem) => {

    const newSugguestionItems = [...sugguestionItems, sugguestionItem];
    setSugguestionItems(newSugguestionItems);
    localStorage.setItem('newSugguestionItems', JSON.stringify(newSugguestionItems));
  };

  return (
    <div className="screen:w-screen screen:h-screen overflow-x-hidden">
      <main className="flex-1">
        <div className='bg-aws-smile h-10 rounded-lg'>
          <div className="flex text-white items-center justify-end border-t border-gray-400 px-3 py-2">
            <Link to="/setting" className='px-3'>
              <IconWithDot showDot={hasUpdate}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 ">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </IconWithDot>
            </Link>
            <Link
              to="/setting"
              className="mr-2 overflow-x-hidden hover:brightness-75">
              <span className="text-sm">{email}</span>
            </Link>
          </div>
        </div>
        <header className="bg-aws-squid-ink visible flex h-12 w-full items-center justify-between text-lg text-white lg:invisible lg:h-0 print:hidden">
          <div className="flex w-10 items-center justify-start">
            <button
              className="focus:ring-aws-sky mr-2 rounded-full  p-2 hover:opacity-50 focus:outline-none focus:ring-1"
              onClick={() => {
                switchDrawer();
              }}>
              <PiList />
            </button>
          </div>
          {label}
          {/* label を真ん中にするためのダミーのブロック */}
          <div className="w-10" />
        </header>

        <div
          className={`fixed -left-64 top-10 z-50 transition-all lg:left-0 lg:z-0 ${isOpenDrawer ? 'left-0' : '-left-64'}`}>
          <Drawer items={items} />
        </div>
        <SuggestionPanel sugguestionItems={sugguestionItems}/>
        {appStateContext?.state.isNewSuggestionOpen && <NewSuggestionItemPanel onSave={onSave}/>}
        <div
          id="smallDrawerFiller"
          className={`${isOpenDrawer ? 'visible' : 'invisible'} lg:invisible`}>
          <div
            className="screen:h-screen fixed top-0 z-40 w-screen bg-gray-900/90"
            onClick={switchDrawer}></div>
          <ButtonIcon
            className="fixed left-64 top-0 z-40 text-white"
            onClick={switchDrawer}>
            <PiX />
          </ButtonIcon>
        </div>
        <div className="text-aws-font-color lg:ml-64 lg:mr-64" id="main">
          {/* ユースケース間連携時に表示 */}
          {isShow && <PopupInterUseCasesDemo />}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default App;
