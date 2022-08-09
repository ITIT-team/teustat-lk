export const storageCleaner = (storageObj, stateObj, ordername) => {
    if (!storageObj || !stateObj) return
    const storageKeys = Object.keys(storageObj)
    const stateKeys = Object.keys(stateObj)
    if (storageKeys.length !== stateKeys.length) localStorage.removeItem(ordername)
    stateKeys.forEach(key => {
        if (!storageKeys.includes(key)) localStorage.removeItem(ordername)
    })
}