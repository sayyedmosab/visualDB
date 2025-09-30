import React from 'react';
import { type CustomNode } from '../types';
import { SlidersHorizontal, Info } from 'lucide-react';

interface InspectorProps {
  selectedNode: CustomNode | null;
  onUpdateNode: (id: string, data: CustomNode['data']) => void;
}

const InputField: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string }> = ({ label, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-400 mb-1">{label}</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
    />
  </div>
);


const Inspector: React.FC<InspectorProps> = ({ selectedNode, onUpdateNode }) => {
  if (!selectedNode) {
    return (
      <aside className="w-80 bg-gray-800 p-4 border-l border-gray-700 flex flex-col items-center justify-center text-gray-500">
        <Info className="w-10 h-10 mb-2" />
        <p className="text-center font-medium">Select a component to see its properties.</p>
      </aside>
    );
  }

  const { data, id } = selectedNode;

  const handleInputChange = (field: keyof Omit<CustomNode['data'], 'l1' | 'l2' | 'l3'>, value: string) => {
    onUpdateNode(id, { ...data, [field]: value });
  };

  const handleLevelChange = (level: 'l1' | 'l2' | 'l3', value: string) => {
    onUpdateNode(id, { ...data, [level]: { name: value } });
  };

  return (
    <aside className="w-80 bg-gray-800 p-4 border-l border-gray-700 h-full overflow-y-auto">
      <div className="flex items-center mb-4">
        <SlidersHorizontal className="w-6 h-6 mr-3 text-gray-400" />
        <h2 className="text-lg font-semibold text-gray-300">Properties</h2>
      </div>
      <div className="space-y-4">
        <InputField 
          label="Component Name" 
          value={data.name} 
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder="e.g., Customer Management"
        />
        
        <div className="border-t border-gray-700 pt-4">
          <h3 className="text-md font-semibold text-gray-400 mb-2">Granularity Levels</h3>
          <InputField 
            label="Level 1 (Highest)" 
            value={data.l1.name} 
            onChange={(e) => handleLevelChange('l1', e.target.value)}
            placeholder="e.g., Customer"
          />
          <InputField 
            label="Level 2" 
            value={data.l2.name} 
            onChange={(e) => handleLevelChange('l2', e.target.value)}
            placeholder="e.g., Order"
          />
          <InputField 
            label="Level 3 (Lowest)" 
            value={data.l3.name} 
            onChange={(e) => handleLevelChange('l3', e.target.value)}
            placeholder="e.g., Order Item"
          />
        </div>

        <div className="border-t border-gray-700 pt-4">
          <h3 className="text-md font-semibold text-gray-400 mb-2">Data Characteristics</h3>
          <InputField 
            label="Data Volume" 
            value={data.dataAmount} 
            onChange={(e) => handleInputChange('dataAmount', e.target.value)}
            placeholder="e.g., 10M records/year"
          />
          <InputField 
            label="Frequency" 
            value={data.frequency} 
            onChange={(e) => handleInputChange('frequency', e.target.value)}
            placeholder="e.g., 100 writes/sec"
          />
        </div>
      </div>
    </aside>
  );
};

export default Inspector;