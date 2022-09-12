import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import './styles.scss'
import moment from 'moment'

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

class ReceiptOffline extends React.PureComponent {
  render () {
    const { data = {} } = this.props
    const { productList = [] } = data
    console.log('data', data)

    console.log('productList', productList)

    return (
      <div className='BoxContainer'>
        <style type='text/css' media='print'>
          {'\
   @page { size: portrait; }\
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
              <p>Mã đơn hàng:</p>
              <p>{data.objectIdOrder || '#'}</p>
            </div>
            <div className='BoxCol'>
              <p>Ngày:</p>
              <p>{moment().format('DD-MM-YYYY HH:mm:ss')}</p>
            </div>
            <table className='MainTable'>
              <tbody>
                <tr className='header'>
                  <td>#</td>
                  <td>Sản phẩm</td>
                  <td>SL</td>
                  <td>Tổng</td>
                </tr>
                {
                  productList && productList.map((item, itemIndex) => {
                    return (
                      <tr key={itemIndex} className='header'>
                        <td>{itemIndex + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.count}</td>
                        <td>{item.price || 0}.000đ</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
            <table className='SubTable'>
              <tbody>
                <tr>
                  <th>Tổng sản phẩm:</th>
                  <td>{data.totalNumberOfProductForSale}</td>
                </tr>
                <tr>
                  <th>Tổng tiền:</th>
                  <td>{data.totalMoneyForSale || 0}.000đ</td>
                </tr>
              </tbody>
            </table>
            <div className='LegalCopy'>
              <strong>Lưu ý:</strong>
              <p>
                  HÀNG ĐÃ MUA KHÔNG ĐỔI TRẢ
                  Cảm ơn và hẹn gặp lại quý khách!
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
