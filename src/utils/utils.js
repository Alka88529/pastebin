const getCurrentTimestamp = (req) => {
    if(process.env.TEST_MODE == '1') {
        const headerDate = req.headers['x-test-now-ms'];
        console.log('Header Date:', headerDate);
        if(headerDate) {
            return new Date(parseInt(headerDate, 10));
        }
        return new Date.now();
    }
    return Date.now();
}

module.exports = { getCurrentTimestamp };
