export const setUuid = (id) => localStorage.setItem('uuid', id)
export const getUuid = () => localStorage.getItem("uuid");

export const hasLiked = (likes, id) => {
    const find = likes.find(like => like === id)
    return !!find
}