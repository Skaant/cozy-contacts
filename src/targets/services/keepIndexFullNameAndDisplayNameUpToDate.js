import CozyClient from 'cozy-client'
import { schema } from '../../helpers/doctypes'
import log from 'cozy-logger'
import {
  fetchContactsToUpdate,
  fetchLastSuccessOfService
} from '../../helpers/fetches'
import { updateIndexFullNameAndDisplayName } from '../../helpers/contacts'
import { omit } from 'lodash'

export const keepIndexFullNameAndDisplayNameUpToDate = async () => {
  log('info', `Executing keepIndexFullNameAndDisplayNameUpToDate service`)
  const client = CozyClient.fromEnv(process.env, { schema })

  const lastSuccess = await fetchLastSuccessOfService(
    client,
    'keepIndexFullNameAndDisplayNameUpToDate'
  )
  const contactsToUpdate = await fetchContactsToUpdate(client, lastSuccess)
  const updatedContactsToUpload = contactsToUpdate.map(
    // omit is to prevent updateAll error : Bad special document member: _type
    // issue here : https://github.com/cozy/cozy-client/issues/758
    // to be removed when issue is fixed
    contact => updateIndexFullNameAndDisplayName(omit(contact, '_type'))
  )
  await client.collection('io.cozy.contacts').updateAll(updatedContactsToUpload)
  updatedContactsToUpload.length &&
    log('info', `All contacts successfully updated`)
}

keepIndexFullNameAndDisplayNameUpToDate().catch(e => {
  log('critical', e)
  process.exit(1)
})
