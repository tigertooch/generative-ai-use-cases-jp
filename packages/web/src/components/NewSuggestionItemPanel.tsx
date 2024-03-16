import * as React from 'react';
import { useState ,useContext} from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import styles from './NewSuggestionItemPanel.module.css'; // 引入样式文件
import {SugguestionItem } from '../hooks/useModel';
import {AppStateContext } from "../state/AppProvider";

export interface NewSuggestionItemPanelProps {
  onSave: (newItem: SugguestionItem) => void;
}
const modelProps = {
  isBlocking: false,
  styles: { main: { maxWidth: 600 } },
};
const dialogContentProps = {
  type: DialogType.largeHeader,
  title: 'プロンプト登録',
};

export const NewSuggestionItemPanel: React.FunctionComponent<NewSuggestionItemPanelProps> = ({ onSave }) => {
    const appStateContext = useContext(AppStateContext) 
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const saveDialog = () => {
      if (title.trim() !== '' && content.trim() !== '') {
        const newItem: SugguestionItem = {
            id: Date.now(), // 使用时间戳作为唯一ID
            title: title,
            content: content
          };

          onSave(newItem);
        }else{
          alert('Title and content cannot be empty.');
        }
    };
    const toggleHideDialog = () => {
      appStateContext?.dispatch({ type: 'TOGGLE_CHAT_NEW_SUGGESTION' })
    };
    return (
    <>
      <Dialog
        hidden={!appStateContext?.state.isNewSuggestionOpen}
        // onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modelProps}
      >
        <div className={styles.divClass} >
            <input
                type="text"
                id="prompt_title"
                className={styles.inputClass}
                placeholder="タイトルを入力してください。"
                value={title} // 将input的值绑定到title状态
                onChange={(e) => setTitle(e.target.value)} // 当用户输入时更新title状态
            />
            <textarea
                    id="prompt_content"
                    className={styles.textareaClass}
                    placeholder="プロンプトを入力してください。\n\n～例～\n以下の文章を要約してください。\n\n#内容\n[$$content$$]"
                    rows={10}
                    value={content} // 将textarea的值绑定到content状态
                    onChange={(e) => setContent(e.target.value)} // 当用户输入时更新content状态
            />
            <div className="">
            </div>
            <p className={styles.pClass}>※[$$content$$] を記載するとプロンプト欄に入力された文字が[$$content$$]に置き換えられます。</p>
            <p id="prompt_sample_exp"  className={styles.pClass}>下記が[$$content$$]のサンプルです。</p>
            <textarea id="prompt_sample"   className={styles.textareaClass} 
                placeholder="サテライトオフィスは、Google Workspace(G Suite) / Microsoft 365(Office365) / LINE WORKS / Workplace by Facebook / Dropbox Business の アドオンサービスを提供中です。導入検討段階の支援も可能です。未体験&amp;導入後拡張希望の方もお気軽にご連絡下さい。" rows={5}/>
        </div>
        <DialogFooter>
          <PrimaryButton onClick={saveDialog} text="Save" />
          <DefaultButton onClick={toggleHideDialog} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </>
  );
};
