import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Input, Button } from '../ui';

/**
 * Settings Panel component for editing selected node properties
 * Replaces the Nodes Panel when a node is selected
 * 
 * Features:
 * - Text editing for message nodes
 * - Real-time updates
 * - Back navigation to nodes panel
 * - Extensible for different node types
 */
const SettingsPanel = ({ selectedNode, onUpdateNode, onBack }) => {
  // Local state for text editing with debounced updates
  const [text, setText] = useState('');

  // Initialize text from selected node
  useEffect(() => {
    if (selectedNode?.data?.text) {
      setText(selectedNode.data.text);
    }
  }, [selectedNode]);

  /**
   * Handle text input changes
   * Updates local state immediately for responsive UI
   */
  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    
    // Update the node immediately for real-time preview
    if (selectedNode?.id) {
      onUpdateNode(selectedNode.id, newText);
    }
  };

  /**
   * Get settings content based on node type
   * Extensible for different node types in the future
   */
  const renderNodeSettings = () => {
    if (!selectedNode) return null;

    switch (selectedNode.type) {
      case 'textNode':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text
              </label>
              <textarea
                value={text}
                onChange={handleTextChange}
                placeholder="Enter your message..."
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
              />
              <p className="text-xs text-gray-500 mt-1">
                This text will be sent to the user
              </p>
            </div>
          </div>
        );
      
      // Future node types can be handled here:
      // case 'imageNode':
      //   return <ImageNodeSettings node={selectedNode} onUpdate={onUpdateNode} />;
      
      default:
        return (
          <div className="text-center text-gray-500 py-8">
            <p>No settings available for this node type</p>
          </div>
        );
    }
  };

  if (!selectedNode) {
    return null;
  }

  return (
    <div className="h-full flex flex-col">
      {/* Panel Header with Back Button */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Button
            onClick={onBack}
            variant="ghost"
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ArrowLeft size={18} className="text-gray-600" />
          </Button>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-800">Message</h2>
            <p className="text-sm text-gray-600">
              Node ID: {selectedNode.id}
            </p>
          </div>
        </div>
      </div>

      {/* Settings Content */}
      <div className="flex-1 p-4">
        {renderNodeSettings()}
      </div>

      {/* Node Information */}
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <div className="text-xs text-gray-500 space-y-1">
          <p><strong>Type:</strong> {selectedNode.type}</p>
          <p><strong>Position:</strong> ({Math.round(selectedNode.position.x)}, {Math.round(selectedNode.position.y)})</p>
          <p className="text-gray-400 mt-2">
            💡 Changes are saved automatically
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;