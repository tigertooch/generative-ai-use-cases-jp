import * as React from 'react';
import { useState ,useContext,useEffect} from 'react';
import { Dialog, DialogType} from '@fluentui/react';
import { AppStateContext } from "../state/AppProvider";
import { Radio, RadioGroupField, TextAreaField, TextField } from '@aws-amplify/ui-react';
import style from './UpdateSuggestionItemPanel.module.css'
import Button from './Button';
import {
  RecordedPrompt,
  
} from 'generative-ai-use-cases-jp';
export interface UpdateSuggestionItemPanelProps {
  updatePromptItem:RecordedPrompt;
  onUpdatePromptChange: (newItem: RecordedPrompt) => void;
}
const dialogContentProps = {
  type: DialogType.normal,
  title: 'プロンプト登録',
};
export const UpdateSuggestionItemPanel: React.FunctionComponent<UpdateSuggestionItemPanelProps> = ({ updatePromptItem,onUpdatePromptChange}) => {
    const appStateContext = useContext(AppStateContext) 
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [type, setType] = useState('sugguestionItem.');

    useEffect(() => {
      if (updatePromptItem){
        setTitle(updatePromptItem.title);
        setContent(updatePromptItem.content);
        setType(updatePromptItem.type);
      }
    }, [title, type,updatePromptItem]);

    const saveDialog = () => {
      if (content.trim() !== '') {
        const recordedPrompt: RecordedPrompt = {
            id:updatePromptItem.id,
            createdDate:updatePromptItem.createdDate,
            uuid:updatePromptItem.uuid,
            title: updatePromptItem.title.trim(),
            content: content.trim(),
            type: updatePromptItem.type,
            userId: updatePromptItem.userId,
            updatedDate: updatePromptItem.updatedDate,
          };
          onUpdatePromptChange(recordedPrompt);
        toggleHideDialog();
        }else{
          alert('Title and content cannot be empty.');
        }
    };
    const toggleHideDialog = () => {
      appStateContext?.dispatch({ type: 'TOGGLE_CHAT_UPDATE_SUGGESTION'})
    };
    return (
    <>
        <Dialog
        styles={style}
        hidden={!appStateContext?.state.isUpdateSuggestionOpen}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        >
          <div className={"flex flex-col"} >
            <TextField
              readOnly={true}
              className={"m-1"}
              placeholder="タイトルを入力してください。"
              label="タイトル"
              value={title}
            />
            
            <TextAreaField
              className={"m-1"}
              label="内容"
              value={content}
              placeholder={"プロンプトを入力してください。\n\n～例～\n以下の文章を要約してください。\n\n#内容\n[$$content$$]"}
              rows={10}
              onChange={(e) => setContent(e.target.value)} />
              
            <RadioGroupField
              disabled={true}
              value={type}
              onChange={ (e) => setType(e.target.value) }
              label name="row" direction="row">
              <Radio value="sugguestionItem.">個人利用</Radio>
              <Radio value="0">共通利用</Radio>
            </RadioGroupField>
        </div>
          <div
            className={"w-full flex justify-between"}>
            {/* <Button className="w-full m-2 bg-black text-white rounded-lg" disabled onClick={toggleHideDialog}>削除</Button> */}
            <Button className="w-full m-2 bg-black text-white rounded-lg" onClick={toggleHideDialog} >キャンセル</Button>
            <Button className="w-full m-2 bg-black text-white rounded-lg" onClick={saveDialog} >保存</Button>
          </div>
      </Dialog>
    </>
  );
};
