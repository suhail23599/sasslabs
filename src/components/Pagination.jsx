import { useEffect, memo } from "react"
import "./pagination.css"

const Pagination = ({currentPage, totalPages, onPageChange}) => {
  useEffect(() => {
  }, [currentPage, totalPages])
  const showPrevButton = () => {
    return currentPage > 0
  }
  const showNextButton = () => {
    return currentPage !== totalPages - 1
  }
  const handlePageClick = (page) => {
    onPageChange(page)
  }
  const handleNextPageClick = () => {
    const page = currentPage + 1
    onPageChange(page)
  }
  const handlePrevPageClick = () => {
    const page = currentPage - 1
    onPageChange(page)
  }
  return (
    <>
      <div className="pagination-container">
        {
          showPrevButton() && 
          <button onClick={handlePrevPageClick}>
            Prev
          </button>
        }
        {
          [...Array(totalPages)].map((_, index) => {
            return (
              <button className={`page-item ${currentPage === index ? 'active': ''}`} key={index} onClick={() => handlePageClick(index)}>
                {index + 1}
              </button>
            )
          })
        }
        {
          showNextButton() &&
          <button onClick={handleNextPageClick}>
            Next
          </button>
        }
      </div>
    </>
  )
}

export default memo(Pagination)