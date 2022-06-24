module.exports = {
  // devtool: 'source-map',
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '^react-native$': 'react-native-web',
        },
      },
      'react-native-web',
    ],
  ],
};
