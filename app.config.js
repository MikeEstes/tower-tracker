module.exports = () => {
  const baseConfig = {
    expo: {
      name: "Tower Tracker (Alpha)",
      slug: "tower-tracker",
      version: "0.0.2",
      orientation: "portrait",
      icon: "./assets/tt-icon.png",
      userInterfaceStyle: "light",
      newArchEnabled: true,
      splash: {
        image: "./assets/tt-splash.png",
        resizeMode: "contain",
        backgroundColor: "#212053"
      },
      ios: {
        supportsTablet: false,
        bundleIdentifier: "com.imisshtml.towertracker",
        infoPlist: {
          ITSAppUsesNonExemptEncryption: false
        }
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/tt-icon.png",
          backgroundColor: "#212053"
        },
        package: "com.imisshtml.towertracker"
      },
      scheme: "towertracker",
      web: {
        favicon: "./assets/favicon.png"
      },
      extra: {
        eas: {
          projectId: "4b91e780-1634-446d-87a6-aacaae1ed128"
        },
        SUPABASE_URL: process.env.SUPABASE_URL,
        SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY
      },
      owner: "imisshtml"
    }
  }

  switch (process.env.APP_ENV) {
    case 'development':
      return {
        ...baseConfig,
        // Dev Specific Configs
      };
    case 'staging':
      return {
        ...baseConfig,
        // Staging Specific Configs
      };
    case 'production':
      return {
        ...baseConfig,
        // Prod Specific Configs
      };
    default:
      return {
        ...baseConfig,
      };
  }
};
