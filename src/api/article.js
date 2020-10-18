import request from "@/utils/request.js";


//获取文章列表
export const getArticle = ((params1) => {
    return request({
        method: "GET",
        url: "/mp/v1_0/articles",
        params: params1

    })
})


//获取频道列表
export const getChannel = (() => {
    return request({
        method: "GET",
        url: "/mp/v1_0/channels"


    })
})

//删除文章
export const deleteArticle = ((articleId) => {
    return request({
        method: "DELETE",
        url: "/mp/v1_0/articles/" + articleId


    })
})

//发表文章
export const addArticle = ((data1, draft1 = false) => {
    return request({
        method: "POST",
        url: "/mp/v1_0/articles",
        data: data1,
        params: {
            draft: draft1
        }
    })
})


//获取文章
export const getArticle1 = ((articleId) => {
    return request({
        method: "GET",
        url: "/mp/v1_0/articles/" + articleId,
    })
})

//编辑文章
export const editArticle = ((articleId, data1, draft1 = false) => {
    return request({
        method: "PUT",
        url: "/mp/v1_0/articles/" + articleId,
        data: data1,
        params: {
            draft: draft1
        }
    })
})


//修改文章
export const upDateStatus = ((articleId, allowComment) => {
    return request({
        method: "PUT",
        url: "/mp/v1_0/comments/status",
        params: {
            article_id: articleId

        },
        data: {
            allow_comment: allowComment
        }
    })
})