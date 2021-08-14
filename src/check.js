module.exports = (core) => {
  try {
    const failIf = core.getInput("failIf", { required: false })
    const successIf = core.getInput("successIf", { required: false })
    if (failIf && successIf) {
      core.setFailed("Only one of failIf or successIf should be specified")
      return
    }
    if (!failIf && !successIf) {
      core.setFailed("One of failIf or successIf should be specified")
      return
    }
    const branch = core.getInput("branch", { required: true })
    const failureMessage = core.getInput("failureMessage", { required: true })
    if ((failIf && failIf === branch) || (successIf && successIf !== branch)) {
      core.setFailed(failureMessage)
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}
