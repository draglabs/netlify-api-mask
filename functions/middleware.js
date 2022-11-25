module.exports = function(app) {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        // console.log(res, 'res')
        if(req.headers['api-key'] != process.env.ORIGIN_API_KEY){
            return res.status(401).send({ message: "Token empty or invalid!" });
        }
  
        next();
    })
}