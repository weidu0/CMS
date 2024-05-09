import Center from "@/views/center/Center.vue"
import Home from "@/views/home/Home.vue"
import NewsAdd from "@/views/news-manage/NewsAdd.vue"
import NewsList from "@/views/news-manage/NewsList.vue"
import NewsEditnews from "@/views/news-manage/NewsEditnews.vue"
import NotFound from "@/views/notfound/NotFound.vue"
import ProductAdd from "@/views/product-manage/ProductAdd.vue"
import ProductList from "@/views/product-manage/ProductList.vue"
import ProductEdit from "@/views/product-manage/ProductEdit.vue"
import UserAdd from "@/views/user-manage/UserAdd.vue"
import UserList from "@/views/user-manage/UserList.vue"


const routes = [
    {
        path: "/index",
        component: Home
    },
    {
        path: "/center",
        component: Center
    },
    {
        path: "/user-manage/adduser",
        component: UserAdd,
        requireAdmin: true
    },
    {
        path: "/user-manage/listuser",
        component: UserList,
        requireAdmin: true
    },
    {
        path: "/news-manage/addnews",
        component: NewsAdd
    },
    {
        path: "/news-manage/listnews",
        component: NewsList
    },
    {
        path: "/news-manage/editnews/:id",
        component: NewsEditnews
    },
    {
        path: "/product-manage/addproduct",
        component: ProductAdd
    },
    {
        path: "/product-manage/listproduct",
        component: ProductList
    },
    {
        path: "/product-manage/editproduct/:id",
        component: ProductEdit
    },
    {
        path: "/",
        redirest: "/index"
    },
    {
        path: '/:catchAll(.*)',
        name: "Notfound",
        component: NotFound
    }
]

export default routes