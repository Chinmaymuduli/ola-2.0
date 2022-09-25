module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          components: './src/components',
          configs: './src/configs',
          constants: './src/constants',
          hooks: './src/hooks',
          routes: './src/routes',
          styles: './src/styles',
          screens: './src/screens',
          utils: './src/utils',
          types: './src/types',
        },
      },
    ],
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
