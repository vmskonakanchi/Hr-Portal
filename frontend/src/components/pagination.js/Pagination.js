/* eslint-disable react/prop-types */
import { CPagination, CPaginationItem } from '@coreui/react'
import React from 'react'

const Pagination = (props) => {
  const { nPages, currentPage, setCurrentPage } = props

  const pageNumbers = nPages > 0 ? [...Array(nPages + 1).keys()].slice(1) : 0

  const nextPage = () => {
    if (currentPage !== nPages) {
      setCurrentPage(currentPage + 1)
    }
  }
  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <>
      <nav aria-label="...">
        <CPagination
          className="pagination justify-content-end mb-0"
          listclassname="justify-content-end mb-0"
        >
          <CPaginationItem onClick={prevPage}>
            <i className="text-success fas fa-angle-left" />
            <span className="sr-only">Previous</span>
          </CPaginationItem>
          {pageNumbers.length > 0 ? pageNumbers.map((pgNumber) => {
            return (
              <CPaginationItem  key={pgNumber} onClick={() => setCurrentPage(pgNumber)}>
                {pgNumber}{' '}
              </CPaginationItem>
            )
          }) : ''}
          <CPaginationItem onClick={nextPage}>
            <i className="text-success  fas fa-angle-right" />
            <span className="sr-only">Next</span>
          </CPaginationItem>
        </CPagination>
      </nav>
    </>
  )
}

export default Pagination
