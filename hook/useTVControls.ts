import { useEffect, useState, useCallback } from 'react';

export const useTVControls = (
  rowCount: number,
  colCounts: number[],
  hasFeaturedSection: boolean = false
) => {
  const [selectedRow, setSelectedRow] = useState(0); // Start with the first row
  const [selectedIndexes, setSelectedIndexes] = useState(() =>
    colCounts.map(() => 0)
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
          setSelectedIndexes((prevIndexes) => {
            const newIndexes = [...prevIndexes];
            newIndexes[selectedRow] =
              (newIndexes[selectedRow] + 1) % colCounts[selectedRow];
            return newIndexes;
          });
          break;
        case 'ArrowLeft':
          setSelectedIndexes((prevIndexes) => {
            const newIndexes = [...prevIndexes];
            newIndexes[selectedRow] =
              (newIndexes[selectedRow] - 1 + colCounts[selectedRow]) %
              colCounts[selectedRow];
            return newIndexes;
          });
          break;
        case 'ArrowDown':
          setSelectedRow((prevRow) => Math.min(prevRow + 1, rowCount - 1));
          break;
        case 'ArrowUp':
          setSelectedRow((prevRow) => Math.max(prevRow - 1, 0));
          break;
        case 'Enter':
          // Handle enter key, e.g., trigger a click event on the focused element
          alert(
            `Selected item at row: ${selectedRow}, index: ${selectedIndexes[selectedRow]}`
          );
          break;
        default:
          break;
      }
    },
    [colCounts, selectedRow, rowCount]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return { selectedRow, selectedIndex: selectedIndexes[selectedRow] };
};
