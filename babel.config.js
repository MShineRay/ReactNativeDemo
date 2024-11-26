module.exports = {
  presets: ['module:@react-native/babel-preset'],
  // "presets": ["module:metro-react-native-babel-preset"],
  // https://reactnative.cn/docs/typescript?package-manager=yarn#%E5%9C%A8-typescript-%E4%B8%AD%E4%BD%BF%E7%94%A8%E8%87%AA%E5%AE%9A%E4%B9%89%E8%B7%AF%E5%BE%84%E5%88%AB%E5%90%8D
  "plugins": [
    [
      "module-resolver",
      {
        root: ['./src'],
        "extensions": [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
        "alias": {
          "@components": "./src/components",
          "@/*": "./src/*"
        }
      }
    ]
  ]
};
