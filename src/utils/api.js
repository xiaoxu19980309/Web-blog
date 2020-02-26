const api = {
  test: '/test/test1',
  login: '/api/common/login', // 登录
  register: '/api/common/register', // 注册
  feedback: '/api/user/feedback', // 反馈
  getCollections: '/api/article/getCollections', // 获取文集列表
  addCollection: '/api/article/insertCollection', // 新建文集
  editCollection: '/api/article/editCollection', // 修改文集
  deleteCollection: '/api/article/deleteCollection', // 删除文集
  addArticle: '/api/article/insertArticle', // 新建文章
  deleteArticle: '/api/article/deleteArticle', // 删除文章
  updateArticle: '/api/article/updateArticle', // 修改文章
  insertIssue: '/api/article/insertIssue', // 发布文章
  getHomePage: '/api/article/getHomePage', // 获取个人主页
  getArticle: '/api/article/getArticle', // 获取文章详情
  changePro: '/api/user/changePro', // 修改个人信息
  changeBasic: '/api/user/changeBasic', // 修改基本信息
  getProInfo: '/api/user/getProInfo', // 获取个人信息
  upload: '/api/file/upload' // 文件上传
}

export { api }
