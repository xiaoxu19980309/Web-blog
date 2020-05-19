const api = {
  test: '/test/test1',
  login: '/api/common/login', // 登录
  register: '/api/common/register', // 注册
  find: '/api/common/find', // 发现
  feedback: '/api/user/feedback', // 反馈
  getArticle: '/api/common/getArticle', // 获取文章详情

  getCollections: '/api/article/getCollections', // 获取文集列表
  getGarbage: '/api/article/getGarbage', // 获取回收站
  getCollectionDetail: '/api/article/getCollectionDetail', // 获取文集详情
  addCollection: '/api/article/insertCollection', // 新建文集
  editCollection: '/api/article/editCollection', // 修改文集
  deleteCollection: '/api/article/deleteCollection', // 删除文集
  addArticle: '/api/article/insertArticle', // 新建文章
  deleteArticle: '/api/article/deleteArticle', // 删除文章
  deleteArticleGarbage: '/api/article/deleteArticleGarbage', // 彻底删除
  recoverArticle: '/api/article/recoverArticle', // 恢复文章
  updateArticle: '/api/article/updateArticle', // 修改文章
  insertIssue: '/api/article/insertIssue', // 发布文章
  resendArticle: '/api/article/resendArticle', // 转发文章
  getHomePage: '/api/article/getHomePage', // 获取个人主页
  getComments: '/api/article/getComments', // 获取文章评论
  insertComment: '/api/article/insertComment', // 发表评论
  insertReply: '/api/article/insertReply', // 发表回复
  deleteComment: '/api/article/deleteComment', // 删除评论
  deleteReply: '/api/article/deleteReply', // 删除回复

  getLikes: '/api/operate/getLikes', // 获取喜欢状态
  getLikedList: '/api/operate/getLikedList', // 收到的喜欢列表
  getLikeCount: '/api/operate/getLikeCount', // 获取喜欢文章的人数
  insertLikes: '/api/operate/insertLikes', // 发表喜欢
  updateLikes: '/api/operate/updateLikes', // 更新喜欢
  insertCollect: '/api/operate/insertCollect', // 收藏文章
  getStores: '/api/operate/getStores', // 获取收藏列表
  deleteStore: '/api/operate/deleteStore', // 取消收藏
  staticNum: '/api/operate/staticNum', // 统计数据
  getLikeList: '/api/operate/getLikeList', // 获取喜欢文章列表
  deleteIssues: '/api/operate/deleteIssues', // 删除发布的文章
  getIssuesByTitle: '/api/operate/getIssuesByTitle', // 搜索文章标题
  getPersonIssueTitle: '/api/operate/getPersonIssueTitle', // 获取个人文章
  getAllComments: '/api/operate/getAllComments', // 获取所有评论

  changePro: '/api/user/changePro', // 修改个人信息
  changeBasic: '/api/user/changeBasic', // 修改基本信息
  getProInfo: '/api/user/getProInfo', // 获取个人信息
  upload: '/api/file/upload', // 文件上传
  cancelFocusUser: '/api/user/cancelFocusUser', // 取消关注
  focusUser: '/api/user/focusUser', // 关注用户
  getFocusList: '/api/user/getFocusList', // 获取关注用户
  getFansList: '/api/user/getFansList', // 获取粉丝用户
  getUserByName: '/api/user/getUserByName', // 搜索用户
  getRecommend: '/api/user/getRecommend', // 获取推荐作者

  createSubject: '/api/subject/createSubject', // 新建专题
  getRecommondSubjects: '/api/subject/getRecommondSubjects', // 推荐专题列表
  getSubjects: '/api/subject/getSubjects', // 获取专题列表
  getLikedSubjects: '/api/subject/getLikedSubjects', // 获取喜欢的专题列表
  getSubjectArticleList: '/api/subject/getSubjectArticleList', // 获取专题文章列表
  deleteSubArticle: '/api/subject/deleteSubArticle', // 删除专题文章
  focusSubject: '/api/subject/focusSubject', // 关注专题
  deleteSubject: '/api/subject/deleteSubject', // 删除专题
  cancelFocusSubject: '/api/subject/cancelFocusSubject', // 取消关注专题
  contributeSubject: '/api/subject/contributeSubject', // 专题投稿
  contributeCheck: '/api/subject/contributeCheck', // 投稿审核
  getContributions: '/api/subject/getContributions', // 获取审核列表
  getContributionBack: '/api/subject/getContributionBack', // 获取审核结果列表
  getContributionAll: '/api/subject/getContributionAll', // 获取管理员审核列表
  deleteContribution: '/api/subject/deleteContribution', // 删除投稿记录
  getSubjectList: '/api/subject/getSubjectList' // 管理员获取专题列表
}

export { api }
