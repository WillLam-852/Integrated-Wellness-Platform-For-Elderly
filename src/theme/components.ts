import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import type { ComponentTheme } from '@/types/theme/theme';

export default ({ layout, backgrounds, fonts }: ComponentTheme) => {
	return {
		buttonCircle: {
			...layout.justifyCenter,
			...layout.itemsCenter,
			...backgrounds.purple100,
			...fonts.gray400,
			height: 50,
			width: 50,
			borderRadius: 35,
		},
		buttonIcon: {
			height: 25,
			width: 25,
		},
		circle250: {
			borderRadius: 140,
			height: 250,
			width: 250,
		},
	} as const satisfies Record<string, ImageStyle | TextStyle | ViewStyle>;
};
