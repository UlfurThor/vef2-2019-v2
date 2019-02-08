module.exports = {
  extends: 'airbnb-base',
  rules: {
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
    // 'no-console': ['error', { allow: ['info', 'warn', 'error', 'log'] }],
    'linebreak-style': 0,
    // 'no-unused-vars':0, // REMOVE
  },
  plugins: ['import'],
};
