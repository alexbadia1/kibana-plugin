import { XYPosition } from 'react-flow-renderer';

export interface GraphNode {
  id: string;
  type: string;
  position: XYPosition;
  data: GraphNodeData;
}

export interface GraphNodeData {
  label: string;
  styles?: React.CSSProperties;
}

export interface IGraphEdge {
  source: string;
  target: string;
}
