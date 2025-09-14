const handleError = (err, req, res, next) => {
    // console.log(err.name);    // Error
    // console.log(err.message); // Có lỗi xảy ra!
    // console.log(err.stack);   // Stack trace
    // console.log(err.status);   // Stack trace

    // console.log('231')
    // Request
    // console.log(req.originalUrl);
    const path = req.originalUrl
    // String
    if (path.startsWith('/api/')) {
        res.status(err.status || 500).json({ message: err.message });
        return;
    }

    res.status(err.status || 500).render('error', { title: 'ERROR OCCURED', message: err.message, stack: err.stack, status: err.status });
}

module.exports = {
    handleError
}

