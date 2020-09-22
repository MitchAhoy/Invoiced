const formatUnixDate = (date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const d = new Date(date * 1000)
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
}

export default formatUnixDate