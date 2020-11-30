import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { updateUsername } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class UpdateUsername extends Component {
  constructor () {
    super()

    this.state = {
      oldUsername: '',
      newUsername: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onUpdateUsername = event => {
    event.preventDefault()

    const { msgAlert, history, user } = this.props

    updateUsername(this.state, user)
      .then(() => msgAlert({
        heading: 'Update Username Success',
        message: messages.updateUsernameSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        this.setState({ oldUsername: '', newUsername: '' })
        msgAlert({
          heading: 'Update Username Failed with error: ' + error.message,
          message: messages.updateUsernameFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { oldUsername, newUsername } = this.state

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Update Username</h3>
          <Form onSubmit={this.onUpdateUsername}>
            <Form.Group controlId="oldUsername">
              <Form.Label>Old Username</Form.Label>
              <Form.Control
                required
                name="oldUsername"
                value={oldUsername}
                type="text"
                placeholder="Old Username"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="newUsername">
              <Form.Label>New Username</Form.Label>
              <Form.Control
                required
                name="newUsername"
                value={newUsername}
                type="text"
                placeholder="New Username"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(UpdateUsername)
