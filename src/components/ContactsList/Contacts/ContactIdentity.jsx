import React from 'react'
import PropTypes from 'prop-types'

import { Avatar } from 'cozy-ui/transpiled/react/Avatar'
import ContactName from './ContactName'
import { models } from 'cozy-client'
const { getDisplayName, getInitials } = models.contact

const MyselfMarker = (props, { t }) => (
  <span className="contact-myself">({t('me')})</span>
)

const ContactIdentity = ({ contact }) => {
  const name = contact.name || {}
  const displayName = getDisplayName(contact) || undefined
  const isMyself = contact.metadata ? !!contact.metadata.me : false

  return (
    <div className="contact-identity">
      <Avatar text={getInitials(contact)} size="small" />
      <ContactName displayName={displayName} lastname={name.familyName} />
      {isMyself && <MyselfMarker />}
    </div>
  )
}
ContactIdentity.propTypes = {
  contact: PropTypes.object.isRequired
}

export default ContactIdentity
