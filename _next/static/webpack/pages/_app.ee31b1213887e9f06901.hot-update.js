webpackHotUpdate_N_E("pages/_app",{

/***/ "./src/pages/_app.tsx":
/*!****************************!*\
  !*** ./src/pages/_app.tsx ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ \"./node_modules/@babel/runtime/helpers/esm/extends.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_seo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-seo */ \"./node_modules/next-seo/lib/next-seo.module.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var src_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/constants */ \"./src/constants.ts\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../styles/globals.css */ \"./src/styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @emotion/core */ \"./node_modules/@emotion/core/dist/core.browser.esm.js\");\n\n\n\nvar _jsxFileName = \"/Users/sotahatakeyama/Desktop/chooblarin.github.io/src/pages/_app.tsx\";\n\n\n\n\n\nvar title = src_constants__WEBPACK_IMPORTED_MODULE_4__[\"siteConfig\"].title,\n    description = src_constants__WEBPACK_IMPORTED_MODULE_4__[\"siteConfig\"].description,\n    url = src_constants__WEBPACK_IMPORTED_MODULE_4__[\"siteConfig\"].url;\n\nfunction App(_ref) {\n  var Component = _ref.Component,\n      pageProps = _ref.pageProps;\n  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_6__[\"jsx\"])(react__WEBPACK_IMPORTED_MODULE_3__[\"Fragment\"], null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_6__[\"jsx\"])(next_seo__WEBPACK_IMPORTED_MODULE_2__[\"DefaultSeo\"], {\n    title: title,\n    description: description,\n    openGraph: {\n      type: \"website\",\n      title: title,\n      description: description,\n      url: url,\n      site_name: title,\n      images: [{\n        url: \"og-default.png\",\n        width: 1280,\n        height: 675,\n        alt: title\n      }]\n    },\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 12,\n      columnNumber: 7\n    },\n    __self: this\n  }), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_6__[\"jsx\"])(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({}, pageProps, {\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 31,\n      columnNumber: 7\n    },\n    __self: this\n  })));\n}\n\n_c = App;\n/* harmony default export */ __webpack_exports__[\"default\"] = (App);\n\nvar _c;\n\n$RefreshReg$(_c, \"App\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/next/node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/next/node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL3BhZ2VzL19hcHAudHN4Pzg1NDgiXSwibmFtZXMiOlsidGl0bGUiLCJzaXRlQ29uZmlnIiwiZGVzY3JpcHRpb24iLCJ1cmwiLCJBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJ0eXBlIiwic2l0ZV9uYW1lIiwiaW1hZ2VzIiwid2lkdGgiLCJoZWlnaHQiLCJhbHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRUE7QUFDQTtBQUNBOztJQUVRQSxLLEdBQTRCQyx3RCxDQUE1QkQsSztJQUFPRSxXLEdBQXFCRCx3RCxDQUFyQkMsVztJQUFhQyxHLEdBQVFGLHdELENBQVJFLEc7O0FBRTVCLFNBQVNDLEdBQVQsT0FBaUQ7QUFBQSxNQUFsQ0MsU0FBa0MsUUFBbENBLFNBQWtDO0FBQUEsTUFBdkJDLFNBQXVCLFFBQXZCQSxTQUF1QjtBQUMvQyxTQUNFLGdIQUNFLDBEQUFDLG1EQUFEO0FBQ0UsU0FBSyxFQUFFTixLQURUO0FBRUUsZUFBVyxFQUFFRSxXQUZmO0FBR0UsYUFBUyxFQUFFO0FBQ1RLLFVBQUksRUFBRSxTQURHO0FBRVRQLFdBQUssRUFBTEEsS0FGUztBQUdURSxpQkFBVyxFQUFYQSxXQUhTO0FBSVRDLFNBQUcsRUFBSEEsR0FKUztBQUtUSyxlQUFTLEVBQUVSLEtBTEY7QUFNVFMsWUFBTSxFQUFFLENBQ047QUFDRU4sV0FBRyxFQUFFLGdCQURQO0FBRUVPLGFBQUssRUFBRSxJQUZUO0FBR0VDLGNBQU0sRUFBRSxHQUhWO0FBSUVDLFdBQUcsRUFBRVo7QUFKUCxPQURNO0FBTkMsS0FIYjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBREYsRUFvQkUsMERBQUMsU0FBRCx5RkFBZU0sU0FBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBcEJGLENBREY7QUF3QkQ7O0tBekJRRixHO0FBMkJNQSxrRUFBZiIsImZpbGUiOiIuL3NyYy9wYWdlcy9fYXBwLnRzeC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERlZmF1bHRTZW8gfSBmcm9tIFwibmV4dC1zZW9cIjtcbmltcG9ydCB7IEFwcFByb3BzIH0gZnJvbSBcIm5leHQvYXBwXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHNpdGVDb25maWcgfSBmcm9tIFwic3JjL2NvbnN0YW50c1wiO1xuaW1wb3J0IFwiLi4vc3R5bGVzL2dsb2JhbHMuY3NzXCI7XG5cbmNvbnN0IHsgdGl0bGUsIGRlc2NyaXB0aW9uLCB1cmwgfSA9IHNpdGVDb25maWc7XG5cbmZ1bmN0aW9uIEFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH06IEFwcFByb3BzKSB7XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxEZWZhdWx0U2VvXG4gICAgICAgIHRpdGxlPXt0aXRsZX1cbiAgICAgICAgZGVzY3JpcHRpb249e2Rlc2NyaXB0aW9ufVxuICAgICAgICBvcGVuR3JhcGg9e3tcbiAgICAgICAgICB0eXBlOiBcIndlYnNpdGVcIixcbiAgICAgICAgICB0aXRsZSxcbiAgICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgICB1cmwsXG4gICAgICAgICAgc2l0ZV9uYW1lOiB0aXRsZSxcbiAgICAgICAgICBpbWFnZXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdXJsOiBcIm9nLWRlZmF1bHQucG5nXCIsXG4gICAgICAgICAgICAgIHdpZHRoOiAxMjgwLFxuICAgICAgICAgICAgICBoZWlnaHQ6IDY3NSxcbiAgICAgICAgICAgICAgYWx0OiB0aXRsZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG4gICAgPC8+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwcDtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/pages/_app.tsx\n");

/***/ })

})