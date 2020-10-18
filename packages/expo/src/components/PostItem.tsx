import { Button, Card, Text } from '@ui-kitten/components'
import React from 'react'
import { View, ViewProps } from 'react-native'
import styled from 'styled-components/native'
import { EmptyLikeIcon } from './Icons'

export interface PostItemProps {
	id: number
	orderId: number
	title: string
	description: string
	image: string
	createdAt: Date
	user: {
		id: number
		nickname: string
		profileImage: string
	}
	viewCount: {
		likeCnt: number
		viewCnt: number
		replyCnt: number
	}
  }

export const PostItem = (props: PostItemProps): React.ReactElement<ViewProps> => {

  const { } = props

  const Header = (props) => (
	<HeaderView>
			<CreatedAtText category='c1' appearance='hint' >2020.12.24</CreatedAtText>
	</HeaderView>
  )

  const Footer = (props) => (
	<FooterView {...props} >
		<FooterProfile>
			<NicknameText category='s1' >윤정탁</NicknameText>
		</FooterProfile>
		<FooterCount>
			<EmptyLikeIcon width={20} height={20} />
			<CountText category='p1' appearance='hint' >999</CountText>
			<CountTitle category='s1' >조회</CountTitle>
			<CountText category='p1' appearance='hint' >13</CountText>
			<CountTitle category='s1' >댓글</CountTitle>
			<CountText category='p1' appearance='hint' >5</CountText>
		</FooterCount>
	</FooterView>
  )

  return (
	<ContainerView
		header={Header}
		footer={Footer}
	>
		<BodyView>
			<TitleText category='h6'>
				코로나 떄문에
			</TitleText>
			<TextText category='p1'>
			바다도 못가고 작년에 갔던 바다 또 가고싶다ㅏㅏ..ㅠㅠㅠ 다들 마스크 꼭 착용하고 나가요!! 언젠가..
			</TextText>
		</BodyView>
	</ContainerView>
  )
}

const ContainerView = styled(Card)`
	flex: 1;
`

const CreatedAtText = styled(Text)`

`

const BodyView = styled.View`
	min-height: 100;
	justify-content: center;
`

const TitleText = styled(Text)`
	line-height: 20;
	color: #000000;
`

const TextText = styled(Text)`
	margin-top: 10;
	line-height: 20;
	color: #828282;
`

const CountText = styled(Text)`
	margin-left: 5;
	line-height: 20;
	color: #828282;
`

const CountTitle = styled(Text)`
	color: #333333;
	margin-left: 20;
	line-height: 20;
`

const NicknameText = styled(Text)`
	color: #333333;
	line-height: 20;
`

const HeaderView = styled(View)`
	flex-direction: column;
	justify-content: flex-end;
	min-height: 40;
	padding-left: 20;
`

const FooterView = styled(View)`
	flex-direction: row;
	justify-content: space-between;
`

const FooterProfile = styled.View`
	flex-direction: row;
	justify-content: flex-start;
`
const FooterCount = styled.View`
	flex-direction: row;
	justify-content: flex-end;

`
