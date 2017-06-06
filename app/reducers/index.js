import {combineReducers} from "redux"
import changeSider from './sider'
import changeLoginState from './header'
import switchModal from './modalDialog'
import updateUserInfo from './userInfo'
import changePage from './page'
import updatePosterInfo from './main'
import updateDetailInfo from './detailInfo'
import updateStatInfo from './stat'

export const stores = combineReducers({
  sider:changeSider,
  header:changeLoginState,
  modalDialog:switchModal,
  userInfo:updateUserInfo,
  page:changePage,
  posterInfo:updatePosterInfo,
  detailInfo:updateDetailInfo,
  stat:updateStatInfo,
})


