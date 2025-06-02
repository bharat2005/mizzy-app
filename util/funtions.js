 export const chunckArray = (array, size) => {
        return Array.from ({length: Math.ceil(array.length / size)}, (item, index)=> {
            return array.slice(index * size , index * size + size)
        })
    }
