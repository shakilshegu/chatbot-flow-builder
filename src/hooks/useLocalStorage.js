import { useState, useEffect } from 'react';

/**
 * Custom hook for managing localStorage with React state
 * Automatically syncs state with localStorage and handles JSON serialization
 * 
 * @param {string} key - The localStorage key
 * @param {*} initialValue - Initial value if no stored value exists
 * @returns {Array} [storedValue, setValue] - Similar to useState
 */
export const useLocalStorage = (key, initialValue) => {
  // State to store our value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

/**
 * Hook for saving and loading flow data
 * Specific implementation for chatbot flows
 */
export const useFlowStorage = () => {
  const [savedFlows, setSavedFlows] = useLocalStorage('chatbot-flows', []);

  const saveFlow = (flowName, nodes, edges) => {
    const flow = {
      id: Date.now().toString(),
      name: flowName,
      nodes,
      edges,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setSavedFlows(prev => [...prev, flow]);
    return flow.id;
  };

  const loadFlow = (flowId) => {
    return savedFlows.find(flow => flow.id === flowId);
  };

  const deleteFlow = (flowId) => {
    setSavedFlows(prev => prev.filter(flow => flow.id !== flowId));
  };

  const updateFlow = (flowId, nodes, edges) => {
    setSavedFlows(prev => 
      prev.map(flow => 
        flow.id === flowId 
          ? { ...flow, nodes, edges, updatedAt: new Date().toISOString() }
          : flow
      )
    );
  };

  return {
    savedFlows,
    saveFlow,
    loadFlow,
    deleteFlow,
    updateFlow
  };
};