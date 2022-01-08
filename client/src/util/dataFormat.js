const dateFormat = (date) => {
    return date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()
}

const priceFormat = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price*1000)
}

export { dateFormat, priceFormat};
