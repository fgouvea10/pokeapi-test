import { useMemo } from 'react';

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

interface PaginationItemProps extends Pick<PaginationProps, 'onPageChange'> {
  isCurrent?: boolean;
  number: number;
}

const SIBILINGS_COUNT = 1; // 0 ... 7 [8] 9 ... lastPage

function generatePagesArray(from: number, to: number) {
  const quantItems = to - from;

  const array = [];
  if (to > from) {
    for (let i = 0; i < quantItems; i++) {
      array.push(from + i + 1);
    }
  }
  return array;
}
/*
 * generatePagesArray => [0, 0, 0]
 * generatePagesArray from => [2 + 0 + 1, 2 + 1 + 1, 2 + 2 + 1]
 * generatePagesArray = [3, 4, 5] <- sibilings count
 */

function PaginationItem({
  isCurrent = false,
  number,
  onPageChange,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <button
        className="py-2 px-3 leading-tight text-white bg-yellow-500 border border-yellow-500"
        onClick={() => onPageChange(number)}
      >
        {number}
      </button>
    );
  }

  return (
    <button
      className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
      onClick={() => onPageChange(number)}
    >
      {number}
    </button>
  );
}

export function Pagination({
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  onPageChange,
}: PaginationProps) {
  const lastPage = useMemo(
    () => Math.ceil(totalCountOfRegisters / registersPerPage),
    [totalCountOfRegisters, registersPerPage],
  );

  const previousPages = useMemo(
    () =>
      currentPage > 1
        ? generatePagesArray(currentPage - 1 - SIBILINGS_COUNT, currentPage - 1)
        : [],
    [currentPage],
  );

  const nextPages = useMemo(
    () =>
      currentPage < lastPage
        ? generatePagesArray(
            currentPage,
            Math.min(currentPage + SIBILINGS_COUNT, lastPage),
          )
        : [],
    [currentPage],
  );

  // 1... 4 5 6 ... 20

  return (
    <div className="flex items-center">
      {currentPage > 1 + SIBILINGS_COUNT && (
        <>
          <PaginationItem onPageChange={onPageChange} number={1} />
          {currentPage > 2 + SIBILINGS_COUNT && <p>{'<<'}</p>}
        </>
      )}

      {previousPages.length > 0 &&
        previousPages.map((page) => (
          <PaginationItem
            key={page}
            number={page}
            onPageChange={onPageChange}
          />
        ))}

      <PaginationItem
        number={currentPage}
        onPageChange={onPageChange}
        isCurrent
      />

      {nextPages.length > 0 &&
        nextPages.map((page) => (
          <PaginationItem
            key={page}
            number={page}
            onPageChange={onPageChange}
          />
        ))}

      {currentPage + SIBILINGS_COUNT < lastPage && (
        <>
          {currentPage + 1 + SIBILINGS_COUNT < lastPage && <p>{'>>'}</p>}
          <PaginationItem number={lastPage} onPageChange={onPageChange} />
        </>
      )}
    </div>
  );
}
