import * as eva from '@eva-design/eva'
import { default as appMapping } from './mapping.json'
import { default as appTheme } from './theme.json'

export const appMappings = {
  eva: {
	mapping: eva.mapping,
	customMapping: appMapping
  },
  brand: {
	mapping: eva.mapping,
	customMapping: appMapping
  }
}

export const appThemes = {
  eva: {
	light: eva.light,
	dark: eva.dark,
	brand: {
		light: appTheme,
		dark: appTheme
	}
  }
}
