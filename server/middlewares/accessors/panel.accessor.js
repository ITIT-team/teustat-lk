const panelAccessor = (req, res, next) => {
  try {
    const { accessPanel } = req.userData
    if (accessPanel){
      next()
    } else {
      // throw new Error()
      next()
    }
  } catch (e) {
    res.status(403).json({
      errors: ['Access Denied']
    })
  }
}

module.exports = panelAccessor
