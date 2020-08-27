export default {
  widgets: [
    { name: 'structure-menu' },
    { name: 'deploy-github', layout: { height: 'auto' , width: 'medium'} },
    { name: 'project-users', layout: { height: 'auto' } },
    {
      name: 'document-list',
      options: {
        title: 'Recent Articles',
        order: '_createdAt desc',
        types: ['howToArticle', 'featureArticle', 'galleryArticle']
      },
      layout: { width: 'medium' }
    },
    {
      name: 'project-info',
      options: {
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/tommyyau/tag-test-v31.git',
            category: 'Code'
          },
          {
            title: 'Frontend',
            value: 'http://unruffled-bohr-07a412.netlify.app',
            category: 'apps'
          }
        ]
      }
    }
  ]
}
