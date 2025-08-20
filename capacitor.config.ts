import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.a070b1ace8f04e9ca88dd3425cb5a82b',
  appName: 'yellowstone-teton-kidventure',
  webDir: 'dist',
  server: {
    url: "https://a070b1ac-e8f0-4e9c-a88d-d3425cb5a82b.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    }
  }
};

export default config;