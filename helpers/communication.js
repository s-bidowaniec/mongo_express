exports.log = (...args)=>{
    const environment = process.env.NODE_ENV;
    if (environment !== 'test'){
        console.log(...args)
    }
};