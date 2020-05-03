import { Button, Form, Input } from 'antd'
const { TextArea } = Input

const ReplyEditor = ({ onChange, onSubmit, submitting, value }) => (
	<div>
	  <Form.Item>
		<TextArea rows={4} onChange={onChange} value={value} />
	  </Form.Item>
	  <Form.Item>
		<Button htmlType='submit' loading={submitting} onClick={onSubmit} type='primary'>
		  Add Reply
		</Button>
	  </Form.Item>
	</div>
  )

export default ReplyEditor
