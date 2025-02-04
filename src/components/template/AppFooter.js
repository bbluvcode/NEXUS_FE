import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="https://aptech.com" target="_blank" rel="noopener noreferrer">
          Aptech
        </a>
        <span className="ms-1">&copy; 2024-2025 Project SEM 3</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Made by</span>
        <a href="" target="_blank" rel="noopener noreferrer">
          T1.2308.A0_GROUP4: MNHB Work
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
