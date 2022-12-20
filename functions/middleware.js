module.exports = function(app) {
    app.use((req, res, next) => {
        console.log({"middlewareRes":res.url})
        console.log({"middlewareReq":req.url})
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        // console.log(res, 'res')
        if(req.headers['api-key'] != process.env.ORIGIN_API_KEY){
           // console.log(req.headers['api-key'])
            return res.status(401).send({ message: "Token empty or invalid!" });
        }
  
        next();
    })
}

//todo check ip address to make sure is registered
