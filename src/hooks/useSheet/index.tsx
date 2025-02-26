import { useSheetStore } from '@/store';
import React from 'react'

const useSheet = () => {
  const { sheets, addSheet, dismissSheet } = useSheetStore();

  return {
    sheets,
    addSheet,
    dismissSheet,
  };
}

export default useSheet