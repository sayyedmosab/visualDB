import React, { useState, useMemo } from 'react';
import ReactFlow, {
  Controls,
  Background,
  ReactFlowProvider,
  BackgroundVariant,
} from 'reactflow';

import { type CustomNode, type CustomEdge, Status } from './types';
import { generateDbModel } from './services/geminiService';
import { useBusinessModelGraph } from './hooks/useBusinessModelGraph';

import Sidebar from './components/Sidebar';
import Inspector from './components/Inspector';
import Header from './components/Header';
import Modal from './components/Modal';
import CustomNodeComponent from './components/CustomNode';

const nodeTypes = { custom: CustomNodeComponent };

// The core application UI and logic are now in this component.
// It will be rendered as a child of ReactFlowProvider, so all hooks will have the correct context.
const BusinessModelEditor: React.FC = () => {
  const {
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
  } = useBusinessModelGraph();

  const [generationStatus, setGenerationStatus] = useState<Status>(Status.Idle);
  const [generatedSchema, setGeneratedSchema] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedNode = useMemo(() => nodes.find(node => node.selected) || null, [nodes]);

  const handleGenerate = async () => {
    setGenerationStatus(Status.Loading);
    setIsModalOpen(true);
    try {
      const schema = await generateDbModel(nodes, edges);
      setGeneratedSchema(schema);
      setGenerationStatus(Status.Success);
    } catch (error) {
      console.error("Generation failed", error);
      setGeneratedSchema("/* An unexpected error occurred. See console for details. */");
      setGenerationStatus(Status.Error);
    }
  };

  return (
    <div className="flex h-screen w-screen font-sans bg-gray-900 text-white">
      <Header onGenerate={handleGenerate} isLoading={generationStatus === Status.Loading} />
      <div className="flex flex-grow pt-[65px] h-full">
        <Sidebar />
        <main className="flex-grow h-full" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
            proOptions={{ hideAttribution: true }}
          >
            <Controls />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} color="#4b5563" />
          </ReactFlow>
        </main>
        <Inspector selectedNode={selectedNode} onUpdateNode={onUpdateNode} />
      </div>
      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Generated Database Schema"
        content={generatedSchema}
      />
    </div>
  );
};


// The main App component now correctly sets up the Provider context *before* rendering the editor.
const App: React.FC = () => {
  return (
    <ReactFlowProvider>
      <BusinessModelEditor />
    </ReactFlowProvider>
  );
};

export default App;