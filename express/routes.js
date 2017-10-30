module.exports = function ( app ) {
    app.get('/', function (req, res) {
        res.send('hello world')
    })
    app.get('/icely', function (req, res) {
        res.send('hello icely')
    })
}