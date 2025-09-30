import React from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';
import { type ComponentData } from '../types';

const CustomNode: React.FC<NodeProps<ComponentData>> = ({ data, selected }) => {
  const levelStyle = "p-2 text-sm text-left flex justify-between items-center relative";
  const handleStyle = {
    width: 10,
    height: 10,
  };

  return (
    <div className={`w-64 bg-gray-800 rounded-lg shadow-lg border-2 ${selected ? 'border-cyan-500' : 'border-gray-600'}`}>
      <div className="bg-gray-700 p-3 rounded-t-lg">
        <p className="text-white font-bold text-center">{data.name}</p>
      </div>
      <div className="text-gray-300">
        <div className={`${levelStyle} border-t border-gray-600`}>
          <span>L1: {data.l1.name}</span>
          <Handle type="source" position={Position.Right} id="l1-source" style={{...handleStyle, background: '#38bdf8' }} />
          <Handle type="target" position={Position.Left} id="l1-target" style={{...handleStyle, background: '#38bdf8' }} />
        </div>
        <div className={`${levelStyle} border-t border-gray-600`}>
          <span>L2: {data.l2.name}</span>
           <Handle type="source" position={Position.Right} id="l2-source" style={{...handleStyle, background: '#a78bfa' }} />
           <Handle type="target" position={Position.Left} id="l2-target" style={{...handleStyle, background: '#a78bfa' }} />
        </div>
        <div className={`${levelStyle} border-t border-gray-600 rounded-b-lg`}>
          <span>L3: {data.l3.name}</span>
          <Handle type="source" position={Position.Right} id="l3-source" style={{...handleStyle, background: '#22c55e' }} />
          <Handle type="target" position={Position.Left} id="l3-target" style={{...handleStyle, background: '#22c55e' }} />
        </div>
      </div>
    </div>
  );
};

export default CustomNode;
