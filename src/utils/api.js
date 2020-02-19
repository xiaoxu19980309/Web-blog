const api = {
  test: '/test/test1',
  login: '/api/common/login', // 登录
  register: '/api/common/register', // 注册
  getCollections: '/api/article/getCollections', // 获取文集列表
  addCollection: '/api/article/insertCollection', // 新建文集
  editCollection: '/api/article/editCollection', // 修改文集
  deleteCollection: '/api/article/deleteCollection', // 删除文集
  addArticle: '/api/article/insertArticle', // 新建文章
  deleteArticle: '/api/article/deleteArticle', // 删除文章
  updateArticle: '/api/article/updateArticle' // 修改文章
}

export { api }
