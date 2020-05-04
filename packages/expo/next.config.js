const { withExpo } = require('@expo/next-adapter');
// const withTM = require('next-transpile-modules')
const withImages = require('next-images');
const withFonts = require('next-fonts')


module.exports = withExpo(
  withImages(
    withFonts(
      {
        projectRoot: __dirname,
        devIndicators: {
          autoPrerender: false,
        },
      }
    )
  )
  );
