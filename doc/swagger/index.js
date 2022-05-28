const basicInfo = require('./basic-info')
const servers = require('./servers')
const tags = require('./tags')
const components = require('./components')
const paths = require('./paths')

module.exports = {
    openapi: "3.0.3", // present supported openapi version
    ...basicInfo,
    ...servers,
    ...tags,
    ...components,
    ...paths

}