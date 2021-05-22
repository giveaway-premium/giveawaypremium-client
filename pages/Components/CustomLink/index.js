import React from 'react'
import { useRouter } from 'next/router'
import { Link } from 'common/routes'

function CustomLink ({ route, children, disabled }) {
  let className = children.props.className || ''
  const router = useRouter()
  if (router.asPath === route) {
    className = `${className} selected`
  }
  if (disabled) {
    className += ` disabled`
  }
  if (route && !disabled) {
    return (
      <Link route={route}>{React.cloneElement(children, { className })}</Link>
    )
  }
  return React.cloneElement(children, { className })
}

export default CustomLink
