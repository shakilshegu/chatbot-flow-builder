import { useMemo } from 'react';
import { validateFlow } from '../utils/flowValidation';

/**
 * Custom hook for real-time flow validation
 * Provides validation status and error messages for the current flow state
 * 
 * @param {Array} nodes - Current nodes in the flow
 * @param {Array} edges - Current edges in the flow
 * @returns {Object} Validation result with isValid and errorMessage
 */
export const useFlowValidation = (nodes, edges) => {
  // Memoize validation result to prevent unnecessary recalculations
  const validation = useMemo(() => {
    return validateFlow(nodes, edges);
  }, [nodes, edges]);

  return {
    isValid: validation.isValid,
    errorMessage: validation.message,
    // Additional validation details for debugging
    details: validation.details || {}
  };
};