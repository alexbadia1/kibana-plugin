import React, { useCallback, useMemo, useState } from 'react';
import ReactFlow, { 
  Background, 
  BackgroundVariant, 
  applyEdgeChanges, 
  applyNodeChanges 
} from 'react-flow-renderer';

import { Node } from './Node';
import { GraphNodeData } from '../../../common/model';

const reactflowwrapper_css_style = {
  width: "100%",
  height: "100%",
  minHeight: 300,
  maxHeight: "42vh",
  zIndex: 99999999
};

const initialNodes = [
  {
    id: '1',
    type: 'special',
    data: { 
      label: 'Process 1',
      styles: {
        backgroundColor: "var(--kibana-red)"
      }
    } as GraphNodeData,
    position: { x: 250, y: 25 },
  },
  // default node
  {
    id: '2',
    type: 'special',
    data: { 
      label: 'Process 2',
      styles: {
        backgroundColor: "var(--kibana-green)"
      }
    } as GraphNodeData,
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: 'special',
    data: { 
      label: 'Process 3',
      styles: {
        backgroundColor: "var(--kibana-blue)"
      }
    } as GraphNodeData,
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
