import ReactToPrint from 'react-to-print'
import React, { useRef } from 'react'
import { PrintOutlined } from '@material-ui/icons'
import TagOrcode from '../TagQrcode'
import './style.scss'
import styled from 'styled-components'

const TagPrintBoxMulti = (props) => {
  let componentRef = useRef(null)
  const { data, productData } = props

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current
  }, [componentRef.current])

  const reactToPrintTrigger = React.useCallback(() => {
    // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
    // to the root node of the returned component as it will be overwritten.

    // Bad: the `onClick` here will be overwritten by `react-to-print`
    // return <button onClick={() => alert('This will not work')}>Print this out!</button>;

    // Good
    return <span className='createNewButton'><PrintOutlined /></span>
  }, [])

  const PageBreakWrapper = styled.div`
  && {
    page-break-after: always;
  }
`

  const PrintTemplate = ({ index, detail }) => {
    console.log('PrintTemplate', detail)
    console.log('index', index)
    return (
      <div style={{ display: 'inline-block', width: '34mm !important', margin: 0, marginLeft: 2.5 }}>
        <TagOrcode data={detail} />
        {/* {(index % 2) ? <PageBreakWrapper>&nbsp;</PageBreakWrapper> : null} */}
      </div>
    // </div>
    )
  }

  let printingPages = []
  let index = 0
  for (const detail of productData) {
    console.log(detail)
    const tempTemplate = <PrintTemplate index={index} detail={detail} />
    index += 1
    printingPages.push(tempTemplate)
  }

  return (
    <div className='CodeBoxPinterMulti'>
      {/* <div className='boxTwoTag' ref={componentRef}>{printingPages}</div> */}
      <div className='boxTwoTag' ref={componentRef}>{productData && productData.map((item, indexItem) => {
        return (
          <PrintTemplate key={indexItem} index={index} detail={item} />
        )
      })}</div>

      <ReactToPrint
        trigger={reactToPrintTrigger}
        removeAfterPrint
        content={reactToPrintContent}
      />
      {/* <div style={{ display: 'none' }}> */}
      {/* <TagOrcode data={data} ref={componentRef} /> */}
      {/* </div> */}
    </div>
  )
}

export default TagPrintBoxMulti
