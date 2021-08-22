module.exports = function (services){    
    const main = [];
    const parentGroups = []
    const subGroups = [];

    for(key in services){
        if(services[key].group === null){
            parentGroups.push(services[key])
        }else{
            const service = services[key].group
            if(!checkRedundancy(service)){
                service.subGroups = []
                parentGroups.push({...service})
            }             
        }
    }
 
   
    for(key in services){
        const service = services[key]
        if(service.group !== null){
            for(let k = 0; k < parentGroups.length; k++){
                if(parentGroups[k].id === service.group.id){
                    parentGroups[k].subGroups.push({...service})
                }
            }
        }
    }

    function checkRedundancy(service){
        for(let i = 0; i < parentGroups.length; i++){
            if(service.id === parentGroups[i].id){
                return true
            }
        }
        return false
    }
     
  
    return parentGroups
}