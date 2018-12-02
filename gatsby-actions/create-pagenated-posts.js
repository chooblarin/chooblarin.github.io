const path = require("path");

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

module.exports = (createPage, nodes) => {
  const pagenateSize = 10;
  const groupedPages = chunk(nodes, pagenateSize);
  const template = path.resolve(`src/templates/post-list.js`);

  groupedPages.forEach((group, index, groups) => {
    const paginationRoute = `/page/${index + 1}`;
    const first = index === 0;
    const last = index === groups.length - 1;

    return createPage({
      path: paginationRoute,
      component: template,
      context: {
        group,
        first,
        last,
        pageIndex: index
      }
    });
  });
};
