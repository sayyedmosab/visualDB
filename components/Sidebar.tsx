
import React from 'react';
import { Box } from 'lucide-react';

const Sidebar: React.FC = () => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="w-64 bg-gray-800 p-4 border-r border-gray-700 h-full flex flex-col">
      <h2 className="text-lg font-semibold text-gray-300 mb-4">Toolbox</h2>
      <div
        className="p-4 border-2 border-dashed border-gray-500 rounded-md flex flex-col items-center justify-center text-gray-400 cursor-grab hover:bg-gray-700 hover:text-white transition-colors"
        onDragStart={(event) => onDragStart(event, 'custom')}
        draggable
      >
        <Box className="w-8 h-8 mb-2" />
        <span className="font-medium">New Component</span>
      </div>
       <div className="mt-auto text-xs text-gray-500">
        <p>Drag 'New Component' onto the canvas to start building your model.</p>
      </div>
    </aside>
  );
};

export default Sidebar;
