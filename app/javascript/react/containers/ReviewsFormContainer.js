import React, { Component } from 'react'
import TextField from '../components/TextField'
import { browserHistory } from 'react-router'

class ReviewsFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      body: ''
    }

    this.handleBodyChange = this.handleBodyChange.bind(this)
    this.handleClearForm = this.handleClearForm.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.addReview = this.addReview.bind(this)
  }

  handleBodyChange(event) {
    this.setState({ body: event.target.value })
  }

  handleClearForm(event) {
    event.preventDefault()
    this.setState({ body: '' })
  }

  addReview(submission) {
    let placeId = this.props.id
    fetch(`/api/v1/places/${placeId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify(submission)
    }).then( () => {
      browserHistory.push(`/places/${placeId}`)
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    let formPayload = {
      review: {
        review: this.state.body,
        place_id: this.props.id
      }
    }
    this.addReview(formPayload)
  }

  render() {

    return(
      <div className = "review-form">
        <TextField
          content={this.state.body}
          label="Add A Review"
          name="Add A Review"
          handlerFunction={this.handleBodyChange}
        />

        <div className="button-group">
          <button className="button" onClick={this.handleClearForm}>Clear</button>
          <button className="button" onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    )
  }
}

export default ReviewsFormContainer
