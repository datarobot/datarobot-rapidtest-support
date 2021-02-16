const i18nOpts = {
  locales: ['en', 'es'],
  outputPath: 'src/locales/{{locale}}/{{ns}}.json',
  // Removes the default of "key_female", "key_male"
  defaultContexts: [],

  // TODO - Uncomment the next line when all of the dynamic translations are handled
  // discardOldKeys: true
};

module.exports = {
  plugins: [['i18next-extract', i18nOpts]],
  presets: ['react-app'],
};
