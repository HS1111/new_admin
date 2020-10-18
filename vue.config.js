// module.exports = {
//     devServer: {
//         proxy: {
//             "/api": {
//                 target: "http://ttapi.research.itcast.cn/",
//                 changeOrigin: true,
//                 ws: true,
//                 secure: false,
//                 pathRewrite: {
//                     '^/api': ''
//                 }
//             },
//         },
//         overlay: {
//             warnings: false,
//             errors: false
//         }
//     },
//     lintOnSave: false
// };