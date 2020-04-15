import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { Article } from '@src/core/model'
import { articles } from '@src/core/data/article'
import { ArticleList1 } from './articleList1.component'

interface State {
	articles: Article[]
}

export class ArticleList1Container extends React.Component<NavigationScreenProps, State> {
	private navigationKey: 'ArticleList1Container'

	public state: State = {
		articles: articles,
	}

	private onItemPress = (article: Article) => {
		this.props.navigation.navigate({
			key: this.navigationKey,
			routeName: '게시판상세',
			params: article
		})
	}

	private onItemLikePress = (article: Article) => {

	}

	private onItemCommentPress = (article: Article) => {

	}

	public render(): React.ReactNode {
		return (
			<ArticleList1
				articles={articles}
				onItemPress={this.onItemPress}
				onItemLikePress={this.onItemLikePress}
				onItemCommentPress={this.onItemCommentPress}
			/>
		)
	}
}
