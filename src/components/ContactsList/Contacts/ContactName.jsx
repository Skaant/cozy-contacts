import React from 'react'
import PropTypes from 'prop-types'

const ContactName = ({ displayName, lastname }) => {
  const namesToDisplay = (displayName && displayName.split(' ')) || []
  return (
    <div className="u-ellipsis">
      {namesToDisplay.map((name, key) => (
        <span key={`display-${key}`}>
          <span className={name === lastname ? 'contact-lastname' : 'u-ml-1'}>
            {name}
          </span>
          &nbsp;
        </span>
      ))}
    </div>
  )
}

ContactName.propTypes = {
  displayName: PropTypes.string,
  lastname: PropTypes.string
}
ContactName.defaultProps = {
  displayName: ''
}

export default ContactName
