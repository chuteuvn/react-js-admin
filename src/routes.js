import Empty from './containers/Empty'
import Admin from './containers/Admin'
import Table from './components/Table'

import Login from './pages/LoginUseAccountKit';
import Use from './pages/Use';
import UseDetail from './pages/UseDetail';
import Cities from './pages/Cities';
import Notifications from './pages/Notifications';
import MailBox from './pages/MailBox';
import Banks from './pages/Banks';

const routes = [
    {
        component: Empty,
        routes: [
            {
                path: '/login',
                exact: true,
                component: Login,
                name: 'Đăng nhập'
            },
            {
                path: '/',
                exact: true,
                component: Admin,
                name: 'Tổng quan'
            },
            {
                exact: true,
                path: '/use',
                component: Use,
                name: 'Danh sách người dùng'
            },
            {
                path: '/cities',
                component: Cities,
                name: 'Danh sách thành phố'
            },
            {
                path: '/use/detail/id',
                component: UseDetail,
                name: 'Chi tiết'
            },
            {
                path: '/mailbox',
                component: MailBox,
                name: 'Hòm thư'
            },
            {
                path: '/notifications',
                component: Notifications,
                name: 'Thông báo'
            },
            {
                path: '/banks',
                component: Banks,
                name: 'Danh sách tài khoản ngân hàng'
            }
        ]
    }
]

export default routes;