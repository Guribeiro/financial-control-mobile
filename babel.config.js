module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          extensions: ['.js', '.jsx', '.es', '.es6', '.mjs', '.ts', '.tsx', '.svg', '.png'],
          root: ['./'],
          alias: {
            '@modules': './src/modules',
            '@screens': './src/screens',
            '@shared': './src/shared',
            '@assets': './src/assets',
            '@hooks': './src/hooks',
            '@utils': './src/utils',
            '@services': './src/services',
            '@routes': './src/routes',
          }
        }
      ]
    ]
  };
};
