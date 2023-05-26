const cType = (req, res) => {
    if (!req.headers['content-type']) {
        res.status(400).json({
            ok:false,
            code: 400,
            message: "Content-Type header is required",
        });
        return false
    } else {
        if (!req.headers['content-type'].includes('application/json')) {
            res.status(400).json({
                ok:false,
                code: 400,
                message: "Content-Type header must be application/json",
            });
            return false;
        } else {
            return true;
        }
    }
}

export default cType;