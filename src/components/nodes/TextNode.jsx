import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { MessageCircle, Send } from 'lucide-react';

/**
 * Custom Text Node component for the chatbot flow
 * Represents a message node that can send text to users
 * 
 * Features:
 * - Visual indicator for message type
 * - Source handle (right) for outgoing connections
 * - Target handle (left) for incoming connections
 * - Text content display
 * - Selection highlighting
 */
const TextNode = ({ data, selected }) => {
  return (
    <div className={`
      bg-white rounded-lg shadow-md border-2 transition-all duration-200
      ${selected 
        ? 'border-blue-500 shadow-lg' 
        : 'border-gray-200 hover:border-gray-300'
      }
      min-w-[200px] max-w-[250px]
    `}>
      {/* Target Handle - Left side for incoming connections */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-gray-400 border-2 border-white"
        style={{ left: -6 }}
      />

      {/* Node Header */}
      <div className="bg-teal-100 px-3 py-2 rounded-t-lg flex items-center gap-2">
        <Send size={14} className="text-gray-600" />
        <span className="text-sm font-medium text-gray-700">
          {data.label || 'Send Message'}
        </span>
        <MessageCircle size={14} className="text-gray-500 ml-auto" />
      </div>

      {/* Node Content */}
      <div className="px-3 py-3">
        <div className="text-sm text-gray-800 break-words">
          {data.text || 'Enter your message...'}
        </div>
      </div>

      {/* Source Handle - Right side for outgoing connections */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-gray-400 border-2 border-white"
        style={{ right: -6 }}
      />
    </div>
  );
};

export default TextNode;