// eslint-rules/custom-rule.js
module.exports = {
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Custom rule to enforce a specific pattern',
        category: 'Best Practices',
        recommended: true,
      },
    },
    create: function (context) {
      return {
        Identifier(node) {
          if (node.name === 'example') {
            context.report({
              node,
              message: 'Avoid using the identifier "example".',
            });
          }
        },
      };
    },
  };
  