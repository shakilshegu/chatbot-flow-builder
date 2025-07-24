/**
 * Application-wide constants and configuration
 * Centralized location for all constant values used throughout the app
 */

// Flow Builder Configuration
export const FLOW_CONFIG = {
  // Default viewport settings
  DEFAULT_VIEWPORT: { x: 0, y: 0, zoom: 1 },
  MIN_ZOOM: 0.1,
  MAX_ZOOM: 2,
  
  // Grid and background settings
  GRID_SIZE: 20,
  GRID_COLOR: '#e5e7eb',
  
  // Node constraints
  MIN_NODE_WIDTH: 200,
  MAX_NODE_WIDTH: 350,
  DEFAULT_NODE_WIDTH: 250,
  
  // Animation durations (in milliseconds)
  ANIMATION_DURATION: 200,
  DEBOUNCE_DELAY: 300
};

// Node Handle Configuration
export const HANDLE_CONFIG = {
  // Handle positioning
  SOURCE_POSITION: 'Right',
  TARGET_POSITION: 'Left',
  
  // Handle styling
  DEFAULT_SIZE: 12,
  BORDER_WIDTH: 2,
  COLORS: {
    DEFAULT: '#9ca3af',
    ACTIVE: '#3b82f6',
    ERROR: '#ef4444'
  }
};

// Panel Configuration
export const PANEL_CONFIG = {
  // Panel dimensions
  SIDEBAR_WIDTH: 320,
  MIN_SIDEBAR_WIDTH: 280,
  MAX_SIDEBAR_WIDTH: 400,
  
  // Panel types
  NODES_PANEL: 'nodes',
  SETTINGS_PANEL: 'settings'
};

// Validation Messages
export const VALIDATION_MESSAGES = {
  EMPTY_FLOW: 'Flow is empty but valid',
  SINGLE_NODE: 'Single node flow is valid',
  MULTIPLE_EMPTY_TARGETS: 'Cannot save Flow: More than one node has empty target handles',
  EMPTY_TEXT_NODES: 'Some text nodes have empty content',
  DUPLICATE_SOURCE: 'Source handle has multiple outgoing connections',
  FLOW_VALID: 'Flow is valid',
  UNKNOWN_NODE_TYPE: 'Unknown node type',
  MISSING_NODE_DATA: 'Node data is missing'
};

// UI Messages and Labels
export const UI_LABELS = {
  // Button labels
  SAVE_CHANGES: 'Save Changes',
  CANCEL: 'Cancel',
  DELETE: 'Delete',
  EDIT: 'Edit',
  
  // Panel titles
  NODES_PANEL_TITLE: 'Nodes Panel',
  SETTINGS_PANEL_TITLE: 'Settings Panel',
  MESSAGE_NODE_TITLE: 'Message',
  
  // Placeholders
  NODE_TEXT_PLACEHOLDER: 'Enter your message...',
  NODE_NAME_PLACEHOLDER: 'Node name',
  
  // Help text
  DRAG_DROP_HELP: 'Drag and drop nodes to create your flow',
  CONNECTION_HELP: 'Connect nodes by dragging from output to input',
  SETTINGS_HELP: 'Click any node to edit its settings'
};

// Error Messages
export const ERROR_MESSAGES = {
  SAVE_FAILED: 'Failed to save flow',
  LOAD_FAILED: 'Failed to load flow',
  VALIDATION_FAILED: 'Flow validation failed',
  NODE_CREATION_FAILED: 'Failed to create node',
  CONNECTION_FAILED: 'Failed to create connection'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  FLOW_SAVED: 'Flow saved successfully!',
  FLOW_LOADED: 'Flow loaded successfully!',
  NODE_CREATED: 'Node created successfully',
  CONNECTION_CREATED: 'Connection created successfully'
};

// Local Storage Keys
export const STORAGE_KEYS = {
  FLOWS: 'chatbot-flows',
  USER_PREFERENCES: 'user-preferences',
  RECENT_FLOWS: 'recent-flows'
};

// Drag and Drop Data Types
export const DRAG_TYPES = {
  NODE: 'application/reactflow',
  TEXT_NODE: 'textNode',
  IMAGE_NODE: 'imageNode',
  INPUT_NODE: 'inputNode'
};

// Theme Configuration
export const THEME = {
  COLORS: {
    PRIMARY: '#3b82f6',
    SECONDARY: '#6b7280',
    SUCCESS: '#10b981',
    WARNING: '#f59e0b',
    ERROR: '#ef4444',
    
    // Node colors
    TEXT_NODE: '#3b82f6',
    IMAGE_NODE: '#10b981',
    INPUT_NODE: '#8b5cf6',
    CONDITION_NODE: '#f59e0b',
    
    // Background colors
    CANVAS_BG: '#f9fafb',
    PANEL_BG: '#ffffff',
    SIDEBAR_BG: '#f8fafc'
  },
  
  BORDER_RADIUS: {
    SMALL: '4px',
    MEDIUM: '8px',
    LARGE: '12px'
  },
  
  SHADOWS: {
    SMALL: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    MEDIUM: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    LARGE: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
  }
};

// Keyboard Shortcuts
export const KEYBOARD_SHORTCUTS = {
  SAVE: 'Ctrl+S',
  UNDO: 'Ctrl+Z',
  REDO: 'Ctrl+Y',
  DELETE: 'Delete',
  SELECT_ALL: 'Ctrl+A',
  COPY: 'Ctrl+C',
  PASTE: 'Ctrl+V'
};

// API Endpoints (for future use)
export const API_ENDPOINTS = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  FLOWS: '/api/flows',
  NODES: '/api/nodes',
  TEMPLATES: '/api/templates'
};

// Feature Flags
export const FEATURES = {
  ENABLE_AUTO_SAVE: true,
  ENABLE_FLOW_TEMPLATES: false,
  ENABLE_COLLABORATION: false,
  ENABLE_EXPORT: false,
  ENABLE_ANALYTICS: false
};

// Performance Configuration
export const PERFORMANCE = {
  // Debounce delays
  AUTO_SAVE_DELAY: 2000,
  SEARCH_DELAY: 300,
  RESIZE_DELAY: 100,
  
  // Limits
  MAX_NODES: 100,
  MAX_EDGES: 200,
  MAX_FLOW_NAME_LENGTH: 50,
  MAX_NODE_TEXT_LENGTH: 500
};