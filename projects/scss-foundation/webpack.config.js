module.exports = {
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                sassOptions: {
                  includePaths: ["enigmatry-angular-building-blocks/projects/scss-foundation/src", "absolute/path/benigmatry-angular-building-blocks/projects/scss-foundation/src/modules"],
                },
              },
            },
          ],
        },
      ],
    },
  };