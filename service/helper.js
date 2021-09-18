let globalCounter = 0;

exports.isFifthRequest = () => {
    try {
        globalCounter++;
        if(globalCounter % 5 === 0) return true;
        return false;
    }catch(err){
        throw err;
    }
}

exports.randomCheckService = () => {
    const number = Math.floor(Math.random() * 100);
    if(number % 2 === 0) return true;
    return false;
}