module.exports = {
  prompts: [
    {
      name: 'description',
      type: 'string',
      message: 'Project description',
      default: 'The perfect react project'
    },
    {
      name: 'author',
      type: 'string',
      message: 'Author',
      default: 'Programmer'
    },
    {
      name: 'license',
      type: 'string',
      message: 'Project license',
      default: 'MIT'
    }
  ],
  ignores: ['.git']
}
