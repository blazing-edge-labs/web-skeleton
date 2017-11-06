
let pageContext

const getPageContext = () => pageContext

function setPageContext(ctx) {
  pageContext = ctx
}

module.exports = {
  getPageContext,
  setPageContext,
}
