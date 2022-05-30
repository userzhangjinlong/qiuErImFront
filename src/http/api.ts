import { get, post } from './http'

export const Login = p => post('api/login', p);
export const UserFriendList = p => get('api/user/user-friend-list', p);
export const UserCenter = p => get('api/user/user-center', p);//todo::个人中心接口待开发
export const HistoryMessageList = p => get('api/user/get-history-msg', p);