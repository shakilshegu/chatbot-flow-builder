# BiteSpeed Chatbot Flow Builder

A professional React-based chatbot flow builder built with React Flow and Tailwind CSS. This application allows users to create, edit, and manage chatbot conversation flows through an intuitive drag-and-drop interface.
![Chatbot Flow Builder](https://github.com/user-attachments/assets/b73c5cc5-7a1f-45b4-9df1-1b997819124a)

##  Features

###  Core Features Implemented
- **Text Node Support**: Create and edit text message nodes
- **Drag & Drop Interface**: Intuitive node creation from the nodes panel
- **Visual Flow Builder**: Connect nodes with edges to create conversation flows
- **Settings Panel**: Edit selected node properties with real-time updates
- **Flow Validation**: Comprehensive validation with business rules
- **Professional UI**: Clean, modern interface matching the design requirements

###  Key Functionality
- **Node Management**
  - Drag nodes from panel to canvas
  - Click nodes to edit in settings panel
  - Real-time text editing with instant preview
  
- **Connection System**
  - Source handles: One outgoing connection per handle
  - Target handles: Multiple incoming connections allowed
  - Visual connection feedback
  
- **Flow Validation**
  - Validates multiple nodes with empty target handles
  - Shows error states and success confirmations
  - Real-time validation feedback

## 🛠 Tech Stack

- **React 18** - Modern React with hooks
- **@xyflow/react** - Professional flow builder library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Modern icon library
- **Custom Hooks** - For validation and state management

## 📁 Project Structure

```
src/
├── components/
│   ├── nodes/           # Custom node components
│   ├── panels/          # UI panels (Nodes & Settings)
│   ├── ui/              # Reusable UI components
│   └── FlowBuilder.jsx  # Main flow builder component
├── hooks/               # Custom React hooks
├── utils/               # Utility functions and validation
└── styles/              # Global styles and CSS
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. **Clone and Setup**
```bash
npx create-react-app chatbot-flow-builder
cd chatbot-flow-builder
```

2. **Install Dependencies**
```bash
npm install @xyflow/react lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

3. **Copy Components**
- Copy all provided component files to their respective directories
- Replace default files with the provided implementations

4. **Run Application**
```bash
npm start
```

## 📋 Usage

1. **Creating Nodes**: Drag the "Message" node from the right panel to the canvas
2. **Connecting Nodes**: Drag from a node's output handle to another node's input handle
3. **Editing Nodes**: Click any node to open the settings panel and edit its content
4. **Saving Flow**: Click "Save Changes" - validation will check for proper connections

##  Key Components

### FlowBuilder.jsx
- Main orchestrator component
- Manages nodes, edges, and UI state
- Handles drag & drop and validation

### TextNode.jsx
- Custom node component with professional styling
- Source and target handles
- Selection highlighting

### NodesPanel.jsx
- Draggable node types panel
- Extensible for future node types
- Professional UI with icons and descriptions

### SettingsPanel.jsx
- Dynamic settings based on selected node
- Real-time text editing
- Back navigation to nodes panel

## 🔧 Architecture Highlights

- **Modular Design**: Clean component separation for maintainability
- **Extensible**: Easy to add new node types and features
- **Professional Code**: Production-ready with proper error handling
- **Performance**: Optimized with React hooks and memoization
- **Responsive**: Mobile-friendly design patterns

## Design System

- **Colors**: Professional blue and gray palette
- **Typography**: Inter font family for modern look
- **Spacing**: Consistent 4px grid system
- **Components**: Reusable UI components with variants
- **Animations**: Smooth transitions and hover effects

##  Business Rules

- Single Source**: Each source handle can only have one outgoing edge
- Multiple Targets**: Target handles can accept multiple incoming edges
- *Flow Validation**: More than one node cannot have empty target handles
- Real-time Updates**: All changes are immediately reflected in the UI

## Future Enhancements

The codebase is designed to easily support:
- Additional node types (Image, Input, Conditional)
- Flow templates and saving
- Export functionality
- Collaboration features
- Analytics and insights

---
Built with for BiteSpeed Assignment*

Professional, scalable, and maintainable chatbot flow builder solution.
