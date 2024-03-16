import React, { ReactNode, useState } from 'react';
import { BaseProps } from '../@types/common';
import { PiCaretRightFill } from 'react-icons/pi';

type Props = BaseProps & {
  title: string;
  subTitle?: string;
  icon?: ReactNode;
  children: React.ReactNode;
  defaultOpened?: boolean;
};

const ExpandableMenu: React.FC<Props> = (props) => {
  const [expanded, setExpanded] = useState(props.defaultOpened ?? true);


  // const openbyname = () => {
  //   abortFuncs.current.forEach(a => a.abort());
  //   setShowLoadingMessage(false);
  //   setIsLoading(false);
  // }

  return (
    <>
      <div
        className={`text-aws-smile flex cursor-pointer items-center ${props.className}`}
        onClick={() => {
          setExpanded(!expanded);
        }}>
        <PiCaretRightFill
          className={`mr-1 ${expanded && 'rotate-90'} transition`}
        />
        {props.icon && <span className="mr-1">{props.icon}</span>}
        <span className="mr-1">{props.title}</span>
        {props.subTitle && (
          <span className="text-gray-400">{props.subTitle}</span>
        )}
      </div>

      {expanded && <>{props.children}</>}
    </>
  );
};

export default ExpandableMenu;
