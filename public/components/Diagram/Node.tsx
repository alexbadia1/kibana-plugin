import React from 'react';
import { NodeProps } from 'react-flow-renderer';
import { IGraphNodeData } from '../../../common/model';

export function Node({ id, data }: NodeProps<IGraphNodeData>) {

  const onClick = () => {
    throw Error("Not Implemented: Please set focused node");
  };

  return (
    <div onClick={onClick}>
      <div className='p-1'>
        {"TODO: Put Content Here"}
      </div>
    </div>
  );
}
