import React, { useCallback, useState, useMemo } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { TextNode } from './nodes';
import { NodesPanel, SettingsPanel } from './panels';
import { Button } from './ui';
import { useFlowValidation } from '../hooks/useFlowValidation';
import { validateFlow } from '../utils/flowValidation';

/**
 * Main FlowBuilder component that orchestrates the entire chatbot flow builder
 * Manages nodes, edges, panels, and flow validation
 */
const FlowBuilder = () => {
  // State for nodes and edges using React Flow hooks
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  
  // UI state management
  const [selectedNode, setSelectedNode] = useState(null);
  const [showError, setShowError] = useState(false);
  
  // Custom hook for flow validation
  const { isValid, errorMessage } = useFlowValidation(nodes, edges);

  // Define custom node types for React Flow
  const nodeTypes = useMemo(() => ({
    textNode: TextNode,
  }), []);

  /**
   * Handle new edge connections between nodes
   * Validates that source handles can only have one outgoing edge
   */
  const onConnect = useCallback((params) => {
    // Check if source handle already has an edge
    const sourceHasEdge = edges.some(edge => 
      edge.source === params.source && edge.sourceHandle === params.sourceHandle
    );
    
    if (sourceHasEdge) {
      console.warn('Source handle can only have one outgoing edge');
      return;
    }

    setEdges((eds) => addEdge(params, eds));
  }, [edges, setEdges]);

  /**
   * Handle node selection for settings panel
   */
  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  /**
   * Handle clicks on empty canvas to deselect nodes
   */
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  /**
   * Handle drag over events for node dropping
   */
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  /**
   * Handle node drop from the nodes panel
   * Creates a new node at the drop position
   */
  const onDrop = useCallback((event) => {
    event.preventDefault();

    const type = event.dataTransfer.getData('application/reactflow');
    
    if (typeof type === 'undefined' || !type) {
      return;
    }

    // Get the drop position relative to the React Flow canvas
    const reactFlowBounds = event.target.getBoundingClientRect();
    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };

    // Create new node with unique ID
    const newNode = {
      id: `${type}_${Date.now()}`,
      type: 'textNode',
      position,
      data: { 
        label: type === 'textNode' ? 'Send Message' : 'New Node',
        text: type === 'textNode' ? 'test message' : 'Default text'
      },
    };

    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  /**
   * Update selected node's text content
   */
  const updateNodeText = useCallback((nodeId, newText) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              text: newText,
            },
          };
        }
        return node;
      })
    );
  }, [setNodes]);

  /**
   * Handle flow save with validation
   */
  const handleSave = useCallback(() => {
    const validation = validateFlow(nodes, edges);
    
    if (validation.isValid) {
      console.log('Flow saved successfully!', { nodes, edges });
      setShowError(false);
      // Here you would typically send the flow to your backend
      alert('Flow saved successfully!');
    } else {
      setShowError(true);
      console.error('Validation failed:', validation.message);
    }
  }, [nodes, edges]);

  return (
    <ReactFlowProvider>
      <div className="h-screen w-full flex">
        {/* Main Flow Canvas */}
        <div className="flex-1 relative">
          {/* Header with Save Button */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-4">
            {showError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
                Cannot save Flow
              </div>
            )}
            <Button 
              onClick={handleSave} 
              variant={isValid ? 'primary' : 'disabled'}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save Changes
            </Button>
          </div>

          {/* React Flow Canvas */}
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            className="bg-gray-50"
            defaultViewport={{ x: 0, y: 0, zoom: 1 }}
            minZoom={0.1}
            maxZoom={2}
          >
            <Background color="#e5e7eb" gap={20} />
            <Controls className="bg-white border border-gray-200" />
            <MiniMap
              className="bg-white border border-gray-200"
              nodeColor="#3b82f6"
              maskColor="rgba(0, 0, 0, 0.1)"
            />
          </ReactFlow>
        </div>

        {/* Right Sidebar - Nodes Panel or Settings Panel */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
          {selectedNode ? (
            <SettingsPanel
              selectedNode={selectedNode}
              onUpdateNode={updateNodeText}
              onBack={() => setSelectedNode(null)}
            />
          ) : (
            <NodesPanel />
          )}
        </div>
      </div>
    </ReactFlowProvider>
  );
};

export default FlowBuilder;