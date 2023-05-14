import request from '@/utils/request'


export function userUpdateReq(userInfo) {
  return request({
    url: '/user/update',
    method: 'post',
    data: userInfo
  })
}

export function userGetAllReq(page, pageSize) {
  console.log('/user/get/page?page=' + page + "&pageSize=" + pageSize)
  return request({
    url: '/user/get/page?page=' + page + "&pageSize=" + pageSize,
    method: 'post'
  })
}


export function userGetReq() {
  return request({
    url: '/user/info',
    method: 'post'
  })
}


export function userDelReq(userId) {
  return request({
    url: '/user/del/' + userId,
    method: 'delete'
  })
}
