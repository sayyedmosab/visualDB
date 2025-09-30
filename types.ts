import { type Node, type Edge } from 'reactflow';

export interface GranularityLevel {
  name: string;
}

export interface ComponentData {
  name: string;
  l1: GranularityLevel;
  l2: GranularityLevel;
  l3: GranularityLevel;
  dataAmount: string;
  frequency: string;
}

export type CustomNode = Node<ComponentData>;
export type CustomEdge = Edge<{ level: 'l1' | 'l2' | 'l3' }>;

export enum Status {
  Idle,
  Loading,
  Success,
  Error
}