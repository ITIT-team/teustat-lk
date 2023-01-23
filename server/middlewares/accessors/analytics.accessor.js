const analyticsAccessor = (req, res, next) => {
  try {
    const { accessAnalytics } = req.userData
    if (accessAnalytics){
      next()
    } else {
      throw new Error()
    }
  } catch (e) {
    res.status(403).json({
      errors: ['Access Denied']
    })
  }
}

module.exports = analyticsAccessor
