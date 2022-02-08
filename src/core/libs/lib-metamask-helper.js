export function requestAccountAccess(callback) {
  const { ethereum } = window

  ethereum.enable().then((account) => {
    if (callback) {
      callback(account[0])
    }
  })
}
