export class MediaEmbed {

  // https://github.com/ckeditor/ckeditor5/blob/master/packages/ckeditor5-media-embed/src/mediaembedediting.js
  private providerDefinitions = [
    {
      name: 'youtube',
      url: [
        /^(?:m\.)?youtube\.com\/watch\?v=([\w-]+)/,
        /^(?:m\.)?youtube\.com\/v\/([\w-]+)/,
        /^youtube\.com\/embed\/([\w-]+)/,
        /^youtu\.be\/([\w-]+)/
      ],
      html: match => {
        const id = match[1];

        return (
          // our custom html corresponding to qti renderer
          '<section class="ytplayer-wrapper">' +
          `<iframe id="ytplayer" src="https://www.youtube.com/embed/${id}" ` +
          'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>' +
          '</iframe>' +
          '</section>'
        );
      }
    }
  ];

  // https://github.com/ckeditor/ckeditor5/blob/b30ca8e88d7d5f456a4978b889eafce1d46f9eae/packages/ckeditor5-media-embed/src/mediaregistry.js
  getMediaHtml(url) {
    if (!url) {
      return '';
    }

    url = url.trim();

    for (const definition of this.providerDefinitions) {
      const previewRenderer = definition.html;
      const pattern = toArray(definition.url);

      for (const subPattern of pattern) {
        const match = this._getUrlMatches(url, subPattern);

        if (match) {
          return previewRenderer(match);
        }
      }
    }

    return null;

    function toArray(data) {
      return Array.isArray(data) ? data : [data];
    }
  }

  /**
   * Tries to match `url` to `pattern`.
   *
   * @private
   * @param {String} url The URL of the media.
   * @param {RegExp} pattern The pattern that should accept the media URL.
   * @returns {Array|null}
   */
  private _getUrlMatches(url, pattern) {
    // 1. Try to match without stripping the protocol and "www" subdomain.
    let match = url.match(pattern);

    if (match) {
      return match;
    }

    // 2. Try to match after stripping the protocol.
    let rawUrl = url.replace(/^https?:\/\//, '');
    match = rawUrl.match(pattern);

    if (match) {
      return match;
    }

    // 3. Try to match after stripping the "www" subdomain.
    rawUrl = rawUrl.replace(/^www\./, '');
    match = rawUrl.match(pattern);

    if (match) {
      return match;
    }

    return null;
  }
}
