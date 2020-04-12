import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { Trainings1 } from './trainings1.component'

interface State {
  selectedTabIndex: number
}

export class Trainings1Container extends React.Component<NavigationScreenProps, State> {

  public state: State = {
    selectedTabIndex: 0,
  }

  private historyTabs: string[] = ['피드', '팔로우']

  private onSelectLevel = (index: number): void => {
    this.setState({ selectedTabIndex: index })
  };

  private onTrainingDetails = (index: number): void => {

  };

  public render(): React.ReactNode {
    return (
      <Trainings1
        levels={this.historyTabs}
        selectedLevelIndex={this.state.selectedTabIndex}
        onSelectLevel={this.onSelectLevel}
      />
    )
  }
}
