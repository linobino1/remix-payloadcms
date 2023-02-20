/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: [
    "**/*.css",
  ],
  future: {
    unstable_cssModules: true,
  },
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
};
