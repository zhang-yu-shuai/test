import request from '@/utils/request'


export function loginReq(loginForm) {
  return request({
    url: '/auth/login',
    method: 'post',
    data: loginForm
  })
}

export function registerReq(registerForm) {
  
  return request({
    url: '/auth/register',
    method: 'post',
    data: registerForm
  })
}

