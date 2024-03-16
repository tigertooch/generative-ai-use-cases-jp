import {useState ,useContext, useCallback  } from 'react';
import styles from './SuggestionPanel.module.css'; // 引入样式文件
import {SugguestionItem } from '../hooks/useModel';
import { BaseProps } from '../@types/common';
import {AppStateContext } from "../state/AppProvider";

import { useNavigate } from 'react-router-dom';

type Props = BaseProps & {
  sugguestionItems?: SugguestionItem[];
};
export const SuggestionPanel: React.FC<Props>= (props) => {

  const appStateContext = useContext(AppStateContext)
  const [expandedId, setExpandedId] = useState(0);
  const [isRight, setIsRight] = useState(false);

  const addNewSuggestionItem = () => {
    appStateContext?.dispatch({ type: 'TOGGLE_CHAT_NEW_SUGGESTION' })
  };

  const showPrompt = (event:React.MouseEvent, id:number) => {
    event.preventDefault(); // 防止默认行为，根据需要添加
    setIsRight(!isRight);
    setExpandedId(id);
  };
  // 编辑提示内容的方法
  const handlePromptEdit = (e:React.MouseEvent) => {
    e.preventDefault();
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
    <div className={styles.suggestionContainer}>
      <span className="flex items-center text-black dark:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bulb mr-2 w-5 h-5" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7"></path>
          <path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3">
          </path>
          <line x1="9.7" y1="17" x2="14.3" y2="17"></line>
      </svg>プロンプト</span>
      <button onClick={addNewSuggestionItem} className={styles.addButtonItem}>新しいプロンプト</button>
      {props.sugguestionItems?.map((sugguestionItem) => (
        <div key={sugguestionItem.id} className={styles.listItem}>
              <div className="" key={sugguestionItem.id} > 
                  <div className={styles.relativebutton} > 
                      <button onClick={(e) =>showPrompt(e, sugguestionItem.id)}  className={styles.showButton}> 
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"  className={styles.tablerIcon}> 
                              {sugguestionItem.id === expandedId && isRight ? (
                                <path d="M10 18l6 -6l-6 -6v12"></path> 
                                ) : (
                                <path d="M6 10l6 6l6 -6h-12"></path>
                                )
                              }
                          </svg> 
                          <div data-content="改改" className={styles.namePrompt}>
                            {sugguestionItem.title} 
                          </div> 
                      </button>
                      <div className={styles.actionPrompt}> 
                          <button onClick={() =>handlePromptAddContent(sugguestionItem)} className={styles.addButton}> 
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="tabler-icon tabler-icon-plus"> 
                                  <path d="M12 5l0 14"></path> 
                                  <path d="M5 12l14 0"></path> 
                              </svg> 
                          </button>
                      </div>  
                  </div> 
                  {sugguestionItem.id === expandedId && isRight ? (
                    <div className={styles.promptContent}> 
                      <div className={styles.relativeContent}> 
                          <button className={styles.aButton} draggable="true"> 
                            <textarea  rows={10} className={styles.atextarea} value={sugguestionItem.content} readOnly>
                            {/* {sugguestionItem.content}  */}
                            </textarea> 
                          </button> 
                          <div className={styles.bdiv}> 
                            <button onClick={(e) => handlePromptEdit(e)} className={styles.bbutton}> 
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"  className="tabler-icon tabler-icon-pencil"> 
                              <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path> 
                              <path d="M13.5 6.5l4 4"></path> 
                            </svg>
                            </button> 
                          </div> 
                          <input type="hidden"  value="on" /> 
                      </div> 
                    </div>
                    ) : ("")
                  }
              </div> 
        </div>
      ))}
    </div>
  );
}

export default SuggestionPanel;
