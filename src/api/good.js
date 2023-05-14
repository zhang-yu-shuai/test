import request from '@/utils/request'


export function auctionGetOwnerReq(page, pageSize) {
  return request({
    url: '/auction/get/owner?page=' + page + "&pageSize=" + pageSize,
    method: 'post'
  })
}

export function auctionUpdateReq(auctionVo) {
  return request({
    url: '/auction/update' ,
    method: 'post',
    data: auctionVo
  })
}

export function auctionAddReq(auctionVo) {
  return request({
    url: '/auction/add' ,
    method: 'post',
    data: auctionVo
  })
}

export function auctionDeleteReq(auctionId) {
  return request({
    url: '/auction/del/' + auctionId,
    method: 'delete'
  })
}

export function auctionGetReq(id) {
  return request({
    url: '/auction/' + id,
    method: 'post'
  })
}

export function auctionBidReq(id, price) {
  console.log(id)
  console.log(price)
  return request({
    url: '/auction/bid?auctionid=' + id + "&price=" + price,
    method: 'post'
  })
}

export function auctionSuccessReq(page, pageSize) {
  return request({
    url: '/auction/getUserSuccessPage?page=' + page + "&pageSize=" + pageSize,
    method: 'post'
  })
}

export function auctionUserHistoryReq(page, pageSize) {
  return request({
    url: '/auction/getUserHistoryPage?page=' + page + "&pageSize=" + pageSize,
    method: 'post'
  })
}

export function auctionPageReq(page, pageSize) {
  return request({
    url: '/auction/getPage?page=' + page + "&pageSize=" + pageSize,
    method: 'post'
  })
}

export function auctionRecommendReq(page, pageSize) {
  return request({
    url: '/auction/recommend?page=' + page + "&pageSize=" + pageSize,
    method: 'post'
  })
}

export function goodAddReq(goodVo) {
  return request({
    url: '/good/add',
    method: 'post',
    data: goodVo
  })
}

export function goodUpdateReq(goodVo) {
  return request({
    url: '/good/update',
    method: 'post',
    data: goodVo
  })
}

export function GoodDeleteByIdReq(goodId) {
  return request({
    url: '/good/del/' + goodId,
    method: 'delete',
  })
}

export function GoodByUserReq(page, pageSize) {
  return request({
    url: '/good/user?page=' + page + "&pageSize=" + pageSize,
    method: 'post',
  })
}

export function GoodByIdReq(goodId) {
  return request({
    url: '/good/get/' + goodId,
    method: 'post',
  })
}


export function AuctionSearchReq(query, page, pageSize) {
  return request({
    url: '/auction/search?search=' + query + "&page="+ page + "&pageSize=" + pageSize,
    method: 'post',
  })
}
