import React, { useState } from 'react';

// External libraries
import { Handle, HandleType, NodeProps, Position } from 'react-flow-renderer';

// My libraries
import { GraphNodeData } from '../../../common/model';

interface FancyHandleProps {
  id: string;
  position: Position;
  handleType: HandleType;
  isHidden: boolean;
}


function FancyHandle({
  id,
  position,
  handleType,
  isHidden = true,
}: FancyHandleProps) {
  const hiddenStyle = isHidden ? {opacity: 0} : undefined;
  return (
    <Handle
      style={hiddenStyle}
      type={handleType}
      position={position}
      id={id}
    />
  );
}

export function Node({ id, data }: NodeProps<GraphNodeData>) {
  const [hideHandles, setHideHandles] = useState(true);

  const onClick = () => {
    // throw Error("Not Implemented: Please set focused node");
    return;
  };

  return (
    <div 
      onClick={onClick}
      // Read Only
      // onMouseEnter={() => setHideHandles(false)}
      // onMouseLeave={() => setHideHandles(true)}
    >
      <div className='node' style={data.styles}>
        {data.label}
      </div>
      <FancyHandle
        handleType="target"
        position={Position.Left}
        id="left"
        isHidden={hideHandles}
      />
      <FancyHandle
        handleType="target"
        position={Position.Bottom}
        id="bottom"
        isHidden={hideHandles}
      />
      <FancyHandle
        handleType="source"
        position={Position.Right}
        id="right"
        isHidden={hideHandles}
      />
      <FancyHandle
        handleType="source"
        position={Position.Top}
        id="top"
        isHidden={hideHandles}
      />
    </div>
  );
}
