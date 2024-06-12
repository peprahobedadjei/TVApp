import { useEffect, useState, useCallback } from 'react';

const VK_LEFT = 37;
const VK_RIGHT = 39;
const VK_UP = 38;
const VK_DOWN = 40;
const VK_ENTER = 13;

export const useTVControls = (
  rowCount: number,
  colCounts: number[],
  hasFeaturedSection: boolean = false
) => {
  const [selectedRow, setSelectedRow] = useState(1); // 0 for featured section
  const [selectedIndexes, setSelectedIndexes] = useState(() =>
    colCounts.map(() => 0)
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.keyCode) {
        case VK_RIGHT:
          setSelectedIndexes((prevIndexes) => {
            const newIndexes = [...prevIndexes];
            newIndexes[selectedRow] =
              (newIndexes[selectedRow] + 1) % colCounts[selectedRow];
            return newIndexes;
          });
          break;
        case VK_LEFT:
          setSelectedIndexes((prevIndexes) => {
            const newIndexes = [...prevIndexes];
            newIndexes[selectedRow] =
              (newIndexes[selectedRow] - 1 + colCounts[selectedRow]) %
              colCounts[selectedRow];
            return newIndexes;
          });
          break;
        case VK_DOWN:
          setSelectedRow((prevRow) => {
            const newRow = Math.min(prevRow + 1, rowCount - 1);
            setSelectedIndexes((prevIndexes) => {
              const newIndexes = [...prevIndexes];
              newIndexes[newRow] = 0; // Reset index for new row
              return newIndexes;
            });
            return newRow;
          });
          break;
        case VK_UP:
          setSelectedRow((prevRow) => {
            const newRow = Math.max(prevRow - 1, 0);
            setSelectedIndexes((prevIndexes) => {
              const newIndexes = [...prevIndexes];
              newIndexes[newRow] = 0; // Reset index for new row
              return newIndexes;
            });
            return newRow;
          });
          break;
        case VK_ENTER:
          alert(
            `Selected item at row: ${selectedRow}, index: ${selectedIndexes[selectedRow]}`
          );
          break;
        default:
          break;
      }
    },
    [colCounts, selectedRow, rowCount, selectedIndexes]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return { selectedRow, selectedIndex: selectedIndexes[selectedRow] };
};
