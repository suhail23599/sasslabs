import { useCallback, useEffect, useRef, useState } from "react"
import './table-view.css'
import Pagination from './Pagination'

const TableView = () => {
  const [data, setData] = useState([])
  const [list, setList] = useState([])
  const [totalPages , setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const recordsPerPage = 5
  const containerRef = useRef()
  const [endIndex, setEndIndex] = useState(null)
  const [startIndex, setStartIndex] = useState(null)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const response = await fetch('https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json')
    const result = await response.json()
    setData(result)
  }

  useEffect(() => {
    if (data.length > 0) {
      const calculatedStartIndex = currentPage * recordsPerPage;
      const calculatedEndIndex = calculatedStartIndex + recordsPerPage;
      setTotalPages(Math.ceil(data.length / recordsPerPage))
      setStartIndex(calculatedStartIndex)
      setEndIndex(calculatedEndIndex)
    }
  }, [data])

  useEffect(() => {
    if (startIndex !== undefined && endIndex !== undefined) {
      const newList = data.slice(startIndex, endIndex);
      setList(newList)
    }
  }, [startIndex, endIndex])

  const pageChangeHandler = useCallback((page) => {
    setCurrentPage(page)
    const calculatedStartIndex = page * recordsPerPage;
    const calculatedEndIndex = calculatedStartIndex + recordsPerPage;
    setStartIndex(calculatedStartIndex)
    setEndIndex(calculatedEndIndex)
  })
  

  return (
    <div className="table-container" ref={containerRef}>
      <table>
        <thead>
          <tr>
            <th>S.no</th>
            <th>Percentage funded</th>
            <th>Amount pledged</th>
          </tr>
        </thead>
        <tbody>
        {
          list.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item['s.no']}</td>
                <td>{item['percentage.funded']}</td>
                <td>{item['amt.pledged']}</td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        data={list}
        onPageChange={pageChangeHandler}
      >
      </Pagination>
    </div>
  )
}

export default TableView