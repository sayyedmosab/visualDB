// FIX: Import React to provide the React namespace for types like React.DragEvent.
import React, { useState, useCallback, useRef } from 'react';
import {
  addEdge,
  useNodesState,
  useEdgesState,
  type Connection,
  type OnConnect,
} from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import { type CustomNode, type CustomEdge, type ComponentData } from '../types';

const initialNodes: CustomNode[] = [];
const initialEdges: CustomEdge[] = [];

const connectionColors: Record<'l1' | 'l2' | 'l3', string> = {
  l1: '#38bdf8',
  l2: '#a78bfa',
  l3: '#22c55e',
};

export const useBusinessModelGraph = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const onConnect: OnConnect = useCallback(
    (params: Connection) => {
      const sourceHandle = params.sourceHandle;
      const targetHandle = params.targetHandle;
      
      if (!sourceHandle || !targetHandle || sourceHandle.split('-')[0] !== targetHandle.split('-')[0]) {
        return;
      }
      const level = sourceHandle.split('-')[0] as 'l1' | 'l2' | 'l3';
      
      const newEdge: CustomEdge = { 
        ...params, 
        id: `e-${params.source}-${params.target}-${level}-${uuidv4()}`,
        type: 'smoothstep',
        animated: true,
        style: { stroke: connectionColors[level], strokeWidth: 2 },
        data: { level },
        label: `L${level[1]} to L${level[1]}`,
        labelStyle: { fill: '#fff', fontWeight: 'bold' },
        labelBgStyle: { fill: '#27272a', padding: '2px 4px', borderRadius: '2px' },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      
      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode: CustomNode = {
        id: uuidv4(),
        type,
        position,
        data: {
          name: 'New Component',
          l1: { name: 'Level 1' },
          l2: { name: 'Level 2' },
          l3: { name: 'Level 3' },
          dataAmount: '',
          frequency: '',
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const onUpdateNode = useCallback((id: string, data: ComponentData) => {
    setNodes((nds) => 
      nds.map((node) => 
        node.id === id ? { ...node, data } : node
      )
    );
  }, [setNodes]);

  return {
    reactFlowWrapper,
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setReactFlowInstance,
    onDrop,
    onDragOver,
    onUpdateNode,
  };
};
