const sort = (sort, field) => {
    if(sort){
        if(sort.field === field){
            if(sort.value === 1){
                return{
                    field,
                    value: -1
                }
            }else{
                return null
            }
        }else{
            return{
                field,
                value: 1
            }
        }
    }else{
        return {
            field,
            value: 1
        }
    }
}

export default sort