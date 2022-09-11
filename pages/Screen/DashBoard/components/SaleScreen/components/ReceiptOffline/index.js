import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import './styles.scss'

const BoxContainer = styled.div`
  display: flex;
  justify-content: center;

  /* align-items: center;
  flex-direction: column; */
  font-size: 14px;
  font-family: "courier";
  /* background: #e6e6e6; */
  width: 100%;
  min-height: 100vh;

  padding: 50px 0;
  box-sizing: border-box;
`

const BoxTicket = styled.div`
  width: 300px;
  padding: 10px 20px;
  cursor: default;
  position: relative;
  box-shadow: 0px 5px 10px rgb(0 0 0 / 10%);
`
const BoxHeader = styled.div`
  font-size: 14px;
  text-align: center;
  padding: 0px 17px;
  line-height: 0.3rem;
  text-shadow: 0px 0px 1px #000;
  p:nth-child(1) {
    font-size: 17px;
    font-weight: 900;
  }
  > h3 {
    padding: 12px;
    border-top: dashed #333333;
    border-bottom: dashed #333333;
  }
`

const BoxContent = styled.div`
  padding: 0px 17px;
  margin: 20px 0;
`
const BoxCol = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  line-height: 0.1em;
`

const MainTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 15px 0;
  border-bottom: dashed #333333;
  tbody {
    .header {
      text-align: center;
      border-top: dashed #333333;
      border-bottom: dashed #333333;
      td:nth-child(1) {
        width: 22mm;
        text-align: left;
      }
    }

    tr {
      line-height: 1.5rem;
      td:not(:first-child) {
        text-align: right;
      }
    }
  }
`

const SubTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 15px 0;
  border-bottom: solid #333333;
  tr {
    display: flex;
    justify-content: space-between;
    td {
    }
  }
`

const LegalCopy = styled.div`
  margin: 15px 0;
`

class ReceiptOffline extends React.Component {
  render () {
    // const { userData } = this.props

    return (
      <div className='BoxContainer'>
        <style type='text/css' media='print'>
          {'\
   @page { size: landscape; }\
'}
        </style>
        <div className='BoxTicket'>
          <div className='BoxHeader'>
            <p>GIVE AWAY PREMIUM</p>
            <p>Địa chỉ: 01 Phó Đức Chính, phường Nguyễn Thái Bình, Q1</p>
            <p>Hotline: 0703.334.443</p>
            <p>Facebook: Give Away Premium</p>
            <p>Instagram: @giveawaypremium</p>
          </div>
          <div className='BoxContent'>
            <div className='BoxCol'>
              <p>Invoice#</p>
              <p>INV-17</p>
            </div>
            <div className='BoxCol'>
              <p>Date</p>
              <p>20-20-2020</p>
            </div>
            <div className='BoxCol'>
              <p>Due Date</p>
              <p>20-20-2022</p>
            </div>
            <table className='MainTable'>
              <tbody>
                <tr className='header'>
                  <td># Item</td>
                  <td>Qty</td>
                  <td>Rate</td>
                  <td>Totlal</td>
                </tr>
                <tr>
                  <td>Design</td>
                  <td>1.00</td>
                  <td>300.00</td>
                  <td>300.00</td>
                </tr>
                <tr>
                  <td>web dev</td>
                  <td>1.00</td>
                  <td>300.00</td>
                  <td>300.00</td>
                </tr>
                <tr>
                  <td>EMI/EMC</td>
                  <td>1.00</td>
                  <td>300.00</td>
                  <td>300.00</td>
                </tr>
              </tbody>
            </table>
            <table className='SubTable'>
              <tbody>
                <tr>
                  <th>SubTotal:</th>
                  <td>100.00</td>
                </tr>
                <tr>
                  <th>Total:</th>
                  <td>200.00</td>
                </tr>
              </tbody>
            </table>
            <div className='LegalCopy'>
              <p>
                <strong>Terms & Conditions:</strong>
                  Your company's Terms and Conditions will be displayed here. You
                  can add it in the Invoice Preferences page under Settings.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale,
  userData: state.userData
})

// export const FunctionalComponentToPrint = React.forwardRef((props, ref) => {
//   // eslint-disable-line max-len
//   return <ReceiptOffline ref={ref} text={props.text} />
// })

export default withRouter(connect(mapStateToProps, null)(ReceiptOffline))
