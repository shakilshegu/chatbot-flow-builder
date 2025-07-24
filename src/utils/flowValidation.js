/**
 * Validates the entire chatbot flow according to business rules
 * 
 * Validation Rules:
 * 1. If there are more than one nodes, more than one node cannot have empty target handles
 * 2. All nodes should be connected in a meaningful way
 * 3. Source handles can only have one outgoing edge
 * 4. Text nodes should have valid text content
 * 
 */
export const validateFlow = (nodes, edges) => {
  // If there are no nodes, flow is valid (empty state)
  if (nodes.length === 0) {
    return {
      isValid: true,
      message: 'Flow is empty but valid',
      details: { nodeCount: 0, edgeCount: 0 }
    };
  }

  // If there's only one node, it's valid
  if (nodes.length === 1) {
    return {
      isValid: true,
      message: 'Single node flow is valid',
      details: { nodeCount: 1, edgeCount: edges.length }
    };
  }

  // For multiple nodes, check the main business rule
  const nodesWithoutTargets = getNodesWithoutTargetHandles(nodes, edges);
  
  // More than one node has empty target handles - INVALID
  if (nodesWithoutTargets.length > 1) {
    return {
      isValid: false,
      message: 'Cannot save Flow: More than one node has empty target handles',
      details: {
        nodeCount: nodes.length,
        edgeCount: edges.length,
        nodesWithoutTargets: nodesWithoutTargets.length,
        problematicNodes: nodesWithoutTargets.map(node => node.id)
      }
    };
  }

  // Additional validations
  const textValidation = validateTextNodes(nodes);
  if (!textValidation.isValid) {
    return textValidation;
  }

  const edgeValidation = validateEdges(edges);
  if (!edgeValidation.isValid) {
    return edgeValidation;
  }

  // All validations passed
  return {
    isValid: true,
    message: 'Flow is valid',
    details: {
      nodeCount: nodes.length,
      edgeCount: edges.length,
      nodesWithoutTargets: nodesWithoutTargets.length
    }
  };
};

/**
 * Finds nodes that don't have any incoming edges (empty target handles)
 */
export const getNodesWithoutTargetHandles = (nodes, edges) => {
  return nodes.filter(node => {
    // Check if this node is a target of any edge
    const hasIncomingEdge = edges.some(edge => edge.target === node.id);
    return !hasIncomingEdge;
  });
};

/**
 * Validates that all text nodes have valid content
 *
 */
export const validateTextNodes = (nodes) => {
  const textNodes = nodes.filter(node => node.type === 'textNode');
  const emptyTextNodes = textNodes.filter(node => 
    !node.data?.text || node.data.text.trim().length === 0
  );

  if (emptyTextNodes.length > 0) {
    return {
      isValid: false,
      message: 'Some text nodes have empty content',
      details: {
        emptyNodes: emptyTextNodes.map(node => node.id)
      }
    };
  }

  return { isValid: true, message: 'All text nodes have valid content' };
};

/**
 * Validates edge connections and constraints
 * 
 */
export const validateEdges = (edges) => {
  // Check for duplicate source connections (should not happen with current UI, but good to validate)
  const sourceConnections = {};
  
  for (const edge of edges) {
    const sourceKey = `${edge.source}-${edge.sourceHandle || 'default'}`;
    
    if (sourceConnections[sourceKey]) {
      return {
        isValid: false,
        message: 'Source handle has multiple outgoing connections',
        details: {
          duplicateSource: sourceKey,
          conflictingEdges: [sourceConnections[sourceKey], edge.id]
        }
      };
    }
    
    sourceConnections[sourceKey] = edge.id;
  }

  return { isValid: true, message: 'All edges are valid' };
};

/**
 * Gets flow statistics for debugging and analytics
 * 
 */
export const getFlowStatistics = (nodes, edges) => {
  const nodesByType = nodes.reduce((acc, node) => {
    acc[node.type] = (acc[node.type] || 0) + 1;
    return acc;
  }, {});

  const startNodes = getNodesWithoutTargetHandles(nodes, edges);
  const endNodes = nodes.filter(node => 
    !edges.some(edge => edge.source === node.id)
  );

  return {
    totalNodes: nodes.length,
    totalEdges: edges.length,
    nodesByType,
    startNodes: startNodes.length,
    endNodes: endNodes.length,
    isConnected: nodes.length <= 1 || startNodes.length === 1,
    hasDeadEnds: endNodes.length > 0
  };
};