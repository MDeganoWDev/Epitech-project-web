import { useState } from "react"

type PaginationProps = {
    count: number
    next: string | null
    prev: string | null
    onPageChange: (url: string | null) => void
}

function Pagination({ count, next, prev, onPageChange } : PaginationProps) {
    const[pageCount, setPageCount] = useState(1);
  function handleNextPage() {
    onPageChange(next);
    setPageCount(prevState => prevState + 1);
  }

  function handlePrevPage() {
    onPageChange(prev);
    setPageCount(prevState => prevState - 1);
  }

  return (
    <div>
      {count > 5 && 
      <><button onClick={handlePrevPage} disabled={!prev}>Previous Page</button>
      <p>Page {pageCount} on {Math.ceil(count / 5)}</p>
      <button onClick={handleNextPage} disabled={!next}>Next Page</button>
      </>}
    </div>
  );
}

export default Pagination;