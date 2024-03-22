import {useState ,useContext, useCallback  } from 'react';
// import styles from './SuggestionPanel.module.css'; // 引入样式文件
import {SugguestionItem } from '../hooks/useModel';
import { BaseProps } from '../@types/common';
import {AppStateContext } from "../state/AppProvider";

import { useNavigate } from 'react-router-dom';
import Button from './Button';

type Props = BaseProps & {
  sugguestionItems?: SugguestionItem[];
};
export const SuggestionPanel: React.FC<Props>= (props) => {

  const appStateContext = useContext(AppStateContext)
  const [expandedId, setExpandedId] = useState(0);

  const addNewSuggestionItem = () => {
    appStateContext?.dispatch({ type: 'TOGGLE_CHAT_NEW_SUGGESTION' })
  };

  const showPrompt = (event:React.MouseEvent, id:number) => {
    event.preventDefault(); // 防止默认行为，根据需要添加
    if (expandedId === id) {
      setExpandedId(0)
      return
    }
    setExpandedId(id);
  };
  // 编辑提示内容的方法
  const handlePromptEdit = () => {
    console.log(1)
  };

  const navigate = useNavigate();
  const handlePromptAddContent = useCallback((sugguestionItem:SugguestionItem) => {
    navigate('/chat', {
      state: {
        systemContext: sugguestionItem.title,
        content: sugguestionItem.content,
      },
      replace: true,
    });
  }, [props, navigate]);

  return (
    <nav className='custom-gray absolute right-0 bg-aws-squid-ink flex h-screen w-64 flex-col text-sm text-black  print:hidden'>
      <div className='flex justify-center p-2'>
        <Button className="w-11/12" onClick={addNewSuggestionItem}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="fill-current w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>&nbsp;New Prompt
        </Button>
      </div>
      {props.sugguestionItems?.map((sugguestionItem) => (
        <div key={sugguestionItem.id} className={''}>
              <div key={sugguestionItem.id} > 
                  <div className='flex p-2 pl-5 pr-5' > 
                      <button onClick={(e) =>showPrompt(e, sugguestionItem.id)}  className={"flex m-auto  min-w-full"}> 
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 pr-1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                          </svg>
                          <div data-content="改改" >
                            {sugguestionItem.title} 
                          </div>
                      </button>
                      <button onClick={() =>handlePromptAddContent(sugguestionItem)} className={""}> 
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="tabler-icon tabler-icon-plus"> 
                              <path d="M12 5l0 14"></path> 
                              <path d="M5 12l14 0"></path> 
                          </svg> 
                      </button>
                  </div> 
                  {sugguestionItem.id === expandedId ? (
                    <div className={"bg-gray-50 ml-5 mr-3"}> 
                      <div> 
                          <pre className="whitespace-pre-wrap relative text-left rounded-lg pl-2 ">
                            {sugguestionItem.content}
                            <button onClick={() => handlePromptEdit()} className={"absolute right-0 "}> 
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"  className="tabler-icon tabler-icon-pencil w-5 h-5"> 
                              <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path> 
                              <path d="M13.5 6.5l4 4"></path> 
                            </svg>
                            </button> 
                          </pre>
                          {/* <input type="hidden"  value="on" />  */}
                      </div> 
                    </div>
                    ) : ("")
                  }
              </div> 
        </div>
      ))}
    </nav>
  );
}

export default SuggestionPanel;
