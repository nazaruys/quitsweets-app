import React, { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';

import HomeScreen from './app/screens/HomeScreen';
import colors from './app/config/colors';

SplashScreen.preventAutoHideAsync();

export default function App() {
	const [fontsLoaded] = useFonts({
		'Afacad Flux': require('./app/assets/fonts/AfacadFlux.ttf'),
	});
	
	// Set the bottom bar color
	NavigationBar.setBackgroundColorAsync(colors.background);

	const [appIsReady, setAppIsReady] = useState(false);

	useEffect(() => {
		if (fontsLoaded) {
		setAppIsReady(true);
		SplashScreen.hideAsync(); // Hide splash screen when fonts are loaded
		}
	}, [fontsLoaded]);

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
		await SplashScreen.hideAsync(); // Ensure splash screen is hidden after loading
		}
	}, [fontsLoaded]);

	if (!appIsReady) {
		return null; // Render nothing until fonts are loaded
	}

	return (
		<>
			<HomeScreen />
		</>
	);
}
