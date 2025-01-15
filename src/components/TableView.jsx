import { useEffect, useRef, useState } from "react"
import './table-view.css'

const TableView = () => {
  const [data, setData] = useState([])
  const [list, setList] = useState([])
  const containerRef = useRef()
  const [endIndex, setEndIndex] = useState(10)
  const [startIndex, setStartIndex] = useState(0)
  const getData = async () => {
    const response = await fetch('https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json')
    const result = await response.json()
    setData(result)
    setList(result.slice(startIndex, endIndex))
  }
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current
    if (scrollTop + clientHeight  >= scrollHeight) {
      loadMore()
    }
  }
  const loadMore = () => {
    setStartIndex(endIndex)
    setEndIndex(endIndex + 10)
  }
  useEffect(() => {
    setList(((prev) => {
      const val = [...prev, ...data.slice(startIndex, endIndex)]
      return val
    }))
  }, [startIndex, endIndex])
  useEffect(() => {
    getData()
  }, [])
  return (
    <div className="table-container" onScroll={handleScroll} ref={containerRef}>
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
    </div>
  )
}

export default TableView