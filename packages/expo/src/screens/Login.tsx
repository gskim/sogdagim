import { StackNavigationProp } from '@react-navigation/stack'
import * as React from 'react'
import { Platform, StyleSheet, View, KeyboardAvoidingView, ScrollView } from 'react-native'
import {
  useTheme,
  Appbar,
  Colors,
  FAB,
  TextInput
} from 'react-native-paper'

interface Props {
  navigation: StackNavigationProp<{}>
}

type AvoidingViewProps = {
	children: React.ReactNode;
  };

const TextInputAvoidingView = ({ children }: AvoidingViewProps) => {
	return Platform.OS === 'ios' ? (
	  <KeyboardAvoidingView
		style={styles.wrapper}
		behavior="padding"
		keyboardVerticalOffset={80}
	  >
		{children}
	  </KeyboardAvoidingView>
	) : (
	  <>{children}</>
	);
  };

const LoginScreen: React.FC<Props> = ({ navigation }) => {
	const { colors } = useTheme()

  navigation.setOptions({
	header: () => (
		<Appbar.Header
		theme={{
			mode: 'exact'
		}}
		>
		<Appbar.Content
			title='Login'
		/>
		</Appbar.Header>
	)
  })

  const {
    colors: { background },
  } = useTheme();

  return (
	<TextInputAvoidingView>
		<ScrollView
        style={[styles.container, { backgroundColor: background }]}
        keyboardShouldPersistTaps={'always'}
        removeClippedSubviews={false}
      >

			<View style={styles.row}>
			<TextInput
          mode="outlined"
          label="Outlined input"
          placeholder="Type something"

        />
			</View>
			<View style={styles.row}>

			</View>


		</ScrollView>
	</TextInputAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 8,
	  },
	  wrapper: {
		flex: 1,
	  },
  row: {
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'space-between',
	paddingVertical: 8,
	paddingHorizontal: 16
  },
  bottom: {
	position: 'absolute',
	left: 0,
	right: 0,
	bottom: 0
  },
  fab: {
	position: 'absolute',
	right: 16,
	bottom: 28
  }
})
