import React from 'react'
import { withRouter } from 'react-router-dom'

import { deleteAccount } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import Button from 'react-bootstrap/Button'

const DeleteAccount = props => {
  const onDeleteAccount = event => {
    event.preventDefault()
    const { msgAlert, history, user, clearUser } = props

    deleteAccount(user)
      .then(() => msgAlert({
        heading: 'Delete Account Success',
        message: messages.deleteAccountSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .then(() => clearUser())
      .catch(error => msgAlert({
        heading: 'Delete Account Failed with error: ' + error.message,
        message: messages.deleteAccountFailure,
        variant: 'danger'
      }))
  }

  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <Button variant="outline-danger" onClick={onDeleteAccount} block>Delete Account</Button>
      </div>
    </div>
  )
}

export default withRouter(DeleteAccount)
