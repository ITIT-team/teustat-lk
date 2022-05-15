const managerAccessor = (req, res, next) => {
    if (req.userData.accessLevel < process.env.MANAGER_LEVEL){
        return res.status(403).json({
            errors: ["Access denied"]
        })
    } else next()
}

module.exports = managerAccessor
