import React, { useCallback, useMemo, useState } from 'react';
import ReactFlow, { 
  Background, 
  BackgroundVariant, 
  applyEdgeChanges, 
  applyNodeChanges 
} from 'react-flow-renderer';

import { Node } from './Node';

const reactflowwrapper_css_style = {
  width: "100%",
  height: "100%",
  minHeight: 300,
  maxHeight: "50vh",
  zIndex: 99999999
};

const initialNodes = [
  {
    id: '1',
    type: 'input', // input node
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 },
  },
  // default node
  {
    id: '2',
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: 'output', // output node
    data: { label: 'Output Node' },
    position: { x: 250, y: 250 },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3' },
];

export function Graph() {
  const [nodes, setNodes] = useState<any>(initialNodes);
  const [edges, setEdges] = useState<any>(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds: any) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds: any) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const nodeTypes = useMemo(() => ({ special: Node }), []);

  return (
    <div style={reactflowwrapper_css_style}>
      <ReactFlow 
        nodes={nodes} 
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
      >
        <Background
          variant={BackgroundVariant.Lines}
          gap={16}
          size={1}
        />
      </ReactFlow>
    </div>
  );
} 
