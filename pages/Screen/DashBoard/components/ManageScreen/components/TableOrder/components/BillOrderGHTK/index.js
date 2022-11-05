/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import GapService from 'controller/Api/Services/Gap'

const BillOrderGHTK = (props) => {
  const { orderId } = props
  const [base64, setBase64] = useState(null)

  useEffect(() => {
    fetcDefaultLabel()
  }, [])

  const fetcDefaultLabel = async () => {
    const labelBas64 = await GapService.getLabelTransform(orderId)
    console.log('labelBas64', labelBas64)
    // const img = dataURLToBlob(labelBas64.result)
    const base64String = `data:application/pdf;base64,${labelBas64}`
    // console.log('labelBas64', labelBas64)
    // const blob = base64toBlob(base64String)
    // const url = URL.createObjectURL(blob)
    if (labelBas64) {
      setBase64(labelBas64.result)
    }
  }

  return (
    <div className='BillOrderGHTK-container'>
      {
        base64 ? (
          <div className='MT40'>
            <object>
              <embed id='pdfID' type='text/html' width='100%' height='400' src={`data:application/pdf;base64,${base64}`} />
            </object>
          </div>
        ) : <span>Đang tải...</span>
      }
    </div>
  )
}

const mapStateToProps = (state) => ({
  locale: state.locale,
  userData: state.userData
})

export default withRouter(connect(mapStateToProps, null)(BillOrderGHTK))
