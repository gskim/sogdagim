import React from 'react'
import { ListRenderItemInfo } from 'react-native'
import {
	withStyles,
	ThemeType,
	ThemedComponentProps,
} from '@kitten/theme'
import { Exercise } from '@src/core/model/exercise.model'
import { List } from '@kitten/ui'
import {
	TrainingCard1,
	TrainingCardProps,
} from '@src/components/trainings/trainingCard.component'
import { exercises1 } from '@src/core/data/exercise'

interface ComponentProps {
	onTrainingDetails: (index: number) => void
}

export type Medium1ComponentProps = ThemedComponentProps & ComponentProps

interface State {
	exercises: Exercise[]
}

class Medium1Component extends React.Component<Medium1ComponentProps> {

	public state: State = {
		exercises: exercises1,
	}

	private onTrainingDetails = (index: number): void => {
		this.props.onTrainingDetails(index)
	}

	private renderCard = (info: ListRenderItemInfo<Exercise>): React.ReactElement<TrainingCardProps> => {
		return (
			<TrainingCard1
				style={this.props.themedStyle.card}
				training={info.item}
				index={info.index}
				onDetails={this.onTrainingDetails}
			/>
		)
	}

	public render(): React.ReactNode {
		const { themedStyle } = this.props
		const { exercises } = this.state

		return (
			<List
				contentContainerStyle={themedStyle.container}
				data={exercises}
				renderItem={this.renderCard}
			/>
		)
	}
}

export const Medium1 = withStyles(Medium1Component, (theme: ThemeType) => ({
	container: {
		paddingHorizontal: 16,
		paddingVertical: 8,
	},
	card: {
		marginVertical: 8,
	},
}))
