const adminAccessor = (req, res, next) => {
    if (req.userData.accessLevel < process.env.ADMIN_LEVEL){
        return res.status(403).json({
            errors: ["Access denied"]
        })
    } else next()
}

module.exports = adminAccessor
