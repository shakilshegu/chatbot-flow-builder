import React from 'react';
import { MessageCircle } from 'lucide-react';

/**
 * Nodes Panel component that displays available node types
 * Users can drag nodes from here to the canvas to create new nodes
 * 
 * Features:
 * - Drag and drop functionality
 * - Visual indicators for different node types
 * - Extensible design for future node types
 */
const NodesPanel = () => {
  /**
   * Handle drag start event
   * Sets the node type in the data transfer for drop handling
   */
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  /**
   * Available node types configuration
   * Easy to extend with new node types
   */
  const nodeTypes = [
    {
      type: 'textNode',
      label: 'Message',
      icon: MessageCircle,
      description: 'Send a text message',
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
      iconColor: 'text-blue-600'
    }
    // Future node types can be added here:
    // {
    //   type: 'imageNode',
    //   label: 'Image',
    //   icon: Image,
    //   description: 'Send an image',
    //   color: 'bg-green-50 border-green-200 hover:bg-green-100',
    //   iconColor: 'text-green-600'
    // }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Panel Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Nodes Panel</h2>
        <p className="text-sm text-gray-600 mt-1">
          Drag and drop nodes to create your flow
        </p>
      </div>

      {/* Node Types List */}
      <div className="flex-1 p-4 space-y-3">
        {nodeTypes.map((nodeType) => {
          const IconComponent = nodeType.icon;
          
          return (
            <div
              key={nodeType.type}
              className={`
                p-4 rounded-lg border-2 cursor-grab transition-all duration-200
                ${nodeType.color}
                active:cursor-grabbing active:scale-95
              `}
              draggable
              onDragStart={(event) => onDragStart(event, nodeType.type)}
            >
              <div className="flex items-center gap-3">
                <div className={`
                  p-2 rounded-lg bg-white border
                  ${nodeType.iconColor}
                `}>
                  <IconComponent size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">
                    {nodeType.label}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                    {nodeType.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Help Text */}
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <div className="text-xs text-gray-500 space-y-1">
          <p>💡 <strong>Tip:</strong> Drag nodes to the canvas to add them</p>
          <p>🔗 Connect nodes by dragging from output to input</p>
          <p>⚙️ Click any node to edit its settings</p>
        </div>
      </div>
    </div>
  );
};

export default NodesPanel;