/**
 * 网络请求工具模块
 * 封装微信小程序的网络请求功能，提供统一的请求接口
 * 支持自动token注入和Promise化的请求方式
 */

/**
 * 通用网络请求函数
 * @param {string} url - 请求的URL路径（相对路径，会自动拼接baseURL）
 * @param {string} method - 请求方法（GET, POST, PUT, DELETE等）
 * @param {Object} data - 请求参数/数据
 * @returns {Promise} 返回Promise对象，resolve为响应数据，reject为错误信息
 */
const request = (url, method, data) => {
  // 从本地存储获取用户认证token，用于接口鉴权
  const token = wx.getStorageSync('token') || '';

  return new Promise((resolve, reject) => {
    wx.request({
      // 拼接完整的请求URL（baseURL + 相对路径）
      url: `http://localhost:8080${url}`,
      method: method,
      data: data,
      header: {
        // 设置请求头，指定JSON格式数据传输
        'Content-Type': 'application/json',
        // 自动注入JWT token进行身份验证
        'Authorization': `Bearer ${token}`
      },
      // 请求成功回调
      success: (res) => resolve(res.data),
      // 请求失败回调
      fail: (err) => reject(err)
    });
  });
};

/**
 * GET请求方法
 * @param {string} url - 请求的URL路径
 * @param {Object} data - 查询参数（可选）
 * @returns {Promise} 返回Promise对象
 */
export const get = (url, data) => request(url, 'GET', data);

/**
 * POST请求方法
 * @param {string} url - 请求的URL路径
 * @param {Object} data - 请求体数据
 * @returns {Promise} 返回Promise对象
 */
export const post = (url, data) => request(url, 'POST', data);

// 可根据业务需要添加其他HTTP方法（PUT、DELETE等）
// export const put = (url, data) => request(url, 'PUT', data);
// export const del = (url, data) => request(url, 'DELETE', data);