import React from 'react'
import { connect } from 'react-redux'
import { Layout } from 'antd'
import CustomLink from 'pages/Components/CustomLink'
import './style.scss'
class Footer extends React.PureComponent {
  render () {
    const { messages } = this.props.locale
    return (
      <Layout.Footer className='footer-container'>
        <div className='right-side'>
          <ul className='footer-nav'>
            <CustomLink route='/private-policy'>
              <li className='footer-nav-item'>{messages.policy.title}</li>
            </CustomLink>
            <CustomLink route='/terms-of-service'>
              <li className='footer-nav-item'>{messages.terms.title}</li>
            </CustomLink>
          </ul>
        </div>
      </Layout.Footer>
    )
  }
}
const mapStateToProps = (state) => ({
  locale: state.locale
})

export default connect(mapStateToProps)(Footer)
