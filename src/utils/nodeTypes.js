import { MessageCircle, Image, Mouse, GitBranch, Clock, Database } from 'lucide-react';

const createNodeConfig = ({
  type,
  label,
  icon,
  description,
  color,
  iconColor,
  defaultData = {},
  category = 'basic'
}) => ({
  type,
  label,
  icon,
  description,
  color,
  iconColor,
  defaultData,
  category
});

/**
 * Available node type configurations
 * Easy to extend with new node types
 */
export const NODE_TYPES = {
  // Text Message Node
  textNode: createNodeConfig({
    type: 'textNode',
    label: 'Message',
    icon: MessageCircle,
    description: 'Send a text message to the user',
    color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
    iconColor: 'text-blue-600',
    defaultData: {
      label: 'Send Message',
      text: 'Enter your message here...'
    },
    category: 'communication'
  }),

  // Future node types can be added here:
  
  // Image Message Node
  imageNode: createNodeConfig({
    type: 'imageNode',
    label: 'Image',
    icon: Image,
    description: 'Send an image to the user',
    color: 'bg-green-50 border-green-200 hover:bg-green-100',
    iconColor: 'text-green-600',
    defaultData: {
      label: 'Send Image',
      imageUrl: '',
      altText: 'Image'
    },
    category: 'media'
  }),

  // User Input Node
  inputNode: createNodeConfig({
    type: 'inputNode',
    label: 'User Input',
    icon: Mouse,
    description: 'Wait for user input or response',
    color: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
    iconColor: 'text-purple-600',
    defaultData: {
      label: 'Wait for Input',
      inputType: 'text',
      placeholder: 'Type your response...'
    },
    category: 'interaction'
  }),

  // Conditional/Decision Node
  conditionNode: createNodeConfig({
    type: 'conditionNode',
    label: 'Condition',
    icon: GitBranch,
    description: 'Branch the flow based on conditions',
    color: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100',
    iconColor: 'text-yellow-600',
    defaultData: {
      label: 'Decision Point',
      condition: '',
      branches: ['Yes', 'No']
    },
    category: 'logic'
  }),

  // Delay Node
  delayNode: createNodeConfig({
    type: 'delayNode',
    label: 'Delay',
    icon: Clock,
    description: 'Add a delay before the next message',
    color: 'bg-gray-50 border-gray-200 hover:bg-gray-100',
    iconColor: 'text-gray-600',
    defaultData: {
      label: 'Wait',
      duration: 1000,
      unit: 'milliseconds'
    },
    category: 'utility'
  }),

  // API Call Node
  apiNode: createNodeConfig({
    type: 'apiNode',
    label: 'API Call',
    icon: Database,
    description: 'Make an external API call',
    color: 'bg-red-50 border-red-200 hover:bg-red-100',
    iconColor: 'text-red-600',
    defaultData: {
      label: 'API Request',
      method: 'GET',
      url: '',
      headers: {}
    },
    category: 'integration'
  })
};


export const getNodeConfig = (nodeType) => {
  return NODE_TYPES[nodeType] || null;
};

export const getAllNodeTypes = () => {
  return Object.values(NODE_TYPES);
};


export const getNodeTypesByCategory = (category) => {
  return Object.values(NODE_TYPES).filter(nodeType => 
    nodeType.category === category
  );
};


export const getNodeCategories = () => {
  const categories = Object.values(NODE_TYPES).map(nodeType => nodeType.category);
  return [...new Set(categories)];
};

export const createNodeInstance = (nodeType, position, customData = {}) => {
  const config = getNodeConfig(nodeType);
  
  if (!config) {
    throw new Error(`Unknown node type: ${nodeType}`);
  }

  return {
    id: `${nodeType}_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    type: nodeType,
    position,
    data: {
      ...config.defaultData,
      ...customData
    }
  };
};

export const validateNodeData = (node) => {
  const config = getNodeConfig(node.type);
  
  if (!config) {
    return {
      isValid: false,
      message: `Unknown node type: ${node.type}`
    };
  }

  // Basic validation - can be extended per node type
  if (!node.data) {
    return {
      isValid: false,
      message: 'Node data is missing'
    };
  }

  // Type-specific validation can be added here
  switch (node.type) {
    case 'textNode':
      if (!node.data.text || node.data.text.trim().length === 0) {
        return {
          isValid: false,
          message: 'Text node must have content'
        };
      }
      break;
    
    case 'imageNode':
      if (!node.data.imageUrl) {
        return {
          isValid: false,
          message: 'Image node must have an image URL'
        };
      }
      break;
  }

  return {
    isValid: true,
    message: 'Node data is valid'
  };
};