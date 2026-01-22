export const RouteIndex = '/'
export const RouteSignin = '/signin'
export const RouteSignup = '/signup'
export const RouteLogout = '/signout'
export const RouteProfile = '/profile'
export const BlogLayout = '/bloglayout'

export const RouteCategoryDetails = '/categories'
export const RouteAddCategory = '/category/add'
export const RouteDeleteCategory = '/category/delete'
export const RouteEditCategory = (category_id) => {
    if(category_id) {
        return `/category/edit/${category_id}`
    } 
       return `/category/edit/:category_id`
}

export const RouteBlog = '/blog'
export const RouteAddBlog = '/blog/add'
export const RouteEditBlog = (blogid) => {
    if(blogid) {
        return `/blog/edit/${blogid}`
    } 
       return `/blog/edit/:blog_id`
}