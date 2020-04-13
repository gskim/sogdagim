import { message, DatePicker } from 'antd'
import React from 'react'

export default class App extends React.Component {
  state = {
	date: null
  }

  handleChange = (date) => {
	message.info(`Selected Date: ${date ? date.format('YYYY-MM-DD') : 'None'}`)
	this.setState({ date: date })
  }

  render() {
	const { date } = this.state
	return (
		<div style={{ width: 400, margin: '100px auto' }}>
		<DatePicker onChange={this.handleChange} />
		<div style={{ marginTop: 20 }}>
			Selected Date: {date ? date.format('YYYY-MM-DD') : 'None'}
		</div>
		</div>
	)
  }
}
