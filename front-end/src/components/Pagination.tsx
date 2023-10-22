import { ArrowLeft, ArrowRight } from "lucide-react"
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
      {count > 10 && <div className="flex justify-center gap-4">
      {prev && <button onClick={handlePrevPage} disabled={!prev}><ArrowLeft/></button>}
      <p>Page {pageCount} on {Math.ceil(count / 10)}</p>
      {next && <button onClick={handleNextPage} disabled={!next}><ArrowRight/></button>}
      </div>}
    </div>
  );
}

export default Pagination;