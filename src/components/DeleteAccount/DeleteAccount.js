import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

import { deleteAccount } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const ConfirmDeleteModal = props => {
  return (
    <Modal {...props} aria-labelledby="confirm-delete-modal">
      <Modal.Header closeButton>
        <Modal.Title id="confirm-delete-modal">
          Confirm Delete Account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete your account?
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-dark' onClick={props.onHide}>Close</Button>
        <Button variant='outline-danger' onClick={props.deleteAccount}>Delete Account</Button>
      </Modal.Footer>
    </Modal>
  )
}

const DeleteAccount = props => {
  const [modalShow, setModalShow] = useState(false)

  const onDeleteAccount = event => {
    event.preventDefault()
    const { msgAlert, history, user, clearUser } = props

    deleteAccount(user)
      .then(() => msgAlert({
        heading: 'Account Successfully Deleted',
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
        <Button variant="outline-danger" onClick={() => setModalShow(true)} block>Delete Account</Button>

        <ConfirmDeleteModal show={modalShow} onHide={() => setModalShow(false)} deleteAccount={onDeleteAccount} />
      </div>
    </div>
  )
}

export default withRouter(DeleteAccount)
