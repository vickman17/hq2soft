import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'HQ2 SOFT',
  webDir: 'dist',
  bundledWebRuntime: false,
  version: '1.0.0',
  android: {
    versionCode: 1
  },
  ios: {
    buildNumber: '1.0.0'
  },
  plugins: {
    LiveUpdates: {
      appId: "3ffdfee8",  // Replace with your Appflow ID
      channel: "Production",         // Change to your preferred channel
      autoUpdate: true,              // Enables auto-update on launch
    },
    SplashScreen: {
      launchShowDuration: 0, // Disable default splash screen
      autoHide: true,
    }
  }
};

export default config;
