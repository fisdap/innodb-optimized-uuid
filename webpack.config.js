module.exports = {
  entry: './lib/index.js',
  output: {
    libraryTarget: 'var',
    library: 'innodbOptimizedUuid',
    path: 'dist',
    filename: 'innodb-optimized-uuid.js',
  },
  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
  },
  plugins: []
};
