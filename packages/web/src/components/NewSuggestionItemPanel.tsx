import * as React from 'react';
import { useState ,useContext} from 'react';
import { Dialog, DialogType} from '@fluentui/react';
import {SugguestionItem } from '../hooks/useModel';
import { AppStateContext } from "../state/AppProvider";
import { Radio, RadioGroupField, TextAreaField, TextField } from '@aws-amplify/ui-react';
import style from './NewSuggestionItemPanel.module.css'
import Button from './Button';

export interface NewSuggestionItemPanelProps {
  onSave: (newItem: SugguestionItem) => void;
}

const dialogContentProps = {
  type: DialogType.normal,
  title: 'プロンプト登録',
};


export const NewSuggestionItemPanel: React.FunctionComponent<NewSuggestionItemPanelProps> = ({ onSave }) => {
    const appStateContext = useContext(AppStateContext) 
    const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [use, setUse] = useState('1');
    const saveDialog = () => {
      if (title.trim() !== '' && content.trim() !== '') {
        const newItem: SugguestionItem = {
            id: Date.now(), // 使用时间戳作为唯一ID
            title: title,
            content: content,
            use: use
          };
        onSave(newItem);
        toggleHideDialog();
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
        styles={style}
        hidden={!appStateContext?.state.isNewSuggestionOpen}
        onDismiss={toggleHideDialog}
          dialogContentProps={dialogContentProps}
        >
          <div className={"flex flex-col"} >
            <TextField
              className={"m-1"}
              placeholder="タイトルを入力してください。"
              label="タイトル"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            
            <TextAreaField
              className={"m-1"}
              label="内容"
              value={content}
              placeholder={"プロンプトを入力してください。\n\n～例～\n以下の文章を要約してください。\n\n#内容\n[$$content$$]"}
              rows={10}
              onChange={(e) => setContent(e.target.value)} />
            
            <RadioGroupField
              value={use}
              onChange={ (e) => setUse(e.target.value) }
              label name="row" direction="row">
              <Radio value="1">個人利用</Radio>
              <Radio value="0">共通利用</Radio>
            </RadioGroupField>
        </div>
          <div
            className={"w-full flex justify-between"}>
            <Button className="w-full m-2 bg-black text-white rounded-lg" disabled onClick={toggleHideDialog}>削除</Button>
            <Button className="w-full m-2 bg-black text-white rounded-lg" disabled onClick={toggleHideDialog}>コピ-新規</Button>
            <Button className="w-full m-2 bg-black text-white rounded-lg" onClick={toggleHideDialog} >キャンセル</Button>
            <Button className="w-full m-2 bg-black text-white rounded-lg" onClick={saveDialog} >保存</Button>
          </div>
      </Dialog>
    </>
  );
};
