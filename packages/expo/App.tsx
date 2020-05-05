import * as eva from '@eva-design/eva'
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components'
import React from 'react'

const HomeScreen = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
	<Text category='h1'>HOME</Text>
  </Layout>
)

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
	<HomeScreen />
  </ApplicationProvider>
)
