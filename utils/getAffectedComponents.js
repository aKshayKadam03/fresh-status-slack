module.exports = function(data){
    affectedArray = []
    for(key in data){
        if(!isNaN(Number(key))){
            const value = data[key]['choose-state']['selected_option']['value']
            if(value !== 'OP'){
                affectedArray.push({
                    "component" : key,
                    "new_status" : value
                })
            }
        }
    }
    return affectedArray;
}