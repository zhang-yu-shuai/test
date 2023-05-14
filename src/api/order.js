import request from '@/utils/request'

export function genOrderReq(auctionId) {
    return request({
      url: '/order/gen?auctionId=' +  auctionId,
      method: 'post'
    })
}

export function getOwnerPageOrder(page, pageSize) {
    return request({
      url: '/order/get/owner?page=' +  page + "&pageSize=" + pageSize,
      method: 'post'
    })
}

export function getAllOrder(page, pageSize) {
  return request({
    url: '/order/getAll?page=' +  page + "&pageSize=" + pageSize,
    method: 'post'
  })
}

export function delOrder(orderId) {
    return request({
      url: '/order/del/' + orderId,
      method: 'delete'
    })
}

export function updateAuctionStatus(orderId, status) {
    return request({
      url: '/order/update?orderId=' + orderId + "&status=" + status,
      method: 'post'
    })
}
