export const getFormatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB').replace(/\//g, '.')
}