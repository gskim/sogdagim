import { ReplyItem } from '@sogdagim/model/models'
import { List } from 'antd'
import { FC } from 'react'
import Reply from './Reply'
const ReplyList: FC<{ replies: ReplyItem[], visibleHeader: boolean }> = ({ replies, visibleHeader }) => (
	<List
	  dataSource={replies}
	  header={visibleHeader ? `${replies.length} ${replies.length > 1 ? 'replies' : 'reply'}`: undefined}
	  itemLayout='horizontal'
	  renderItem={(props) => <Reply {...props} />}
	/>
  )

export default ReplyList
