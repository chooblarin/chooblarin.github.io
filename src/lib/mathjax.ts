export const mathJaxConfigScript = `
MathJax.Hub.Config({
  tex2jax: {
    inlineMath: [['$','$']],
    displayMath: [['$$','$$']],
    extensions: ["[Contrib]/a11y/accessibility-menu.js"],
    menuSettings: {
      collapsible: true,
      autocollapse: true,
      explorer: true
    },
    processEscapes: true
  },
  CommonHTML: { matchFontHeight: false },
  displayAlign: "left",
  displayIndent: "2em"
});
`;
