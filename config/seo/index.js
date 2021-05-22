const DEFAULT_SEO = {
  title: 'Pantograph',
  description: 'A future of token economy',
  openGraph: {
    type: 'website',
    url: process.env.REACT_APP_URL,
    title: 'Pantograph',
    description: 'A future of token economy',
    site_name: 'Pantograph',
    images: [
      {
        url: 'https://ipfs.pantograph.app/ipfs/QmeASCmkmGwyxsL6pswhvyV9R84NKgXSbL98VA5DmcdXs4?filename=default.png',
        width: 828,
        height: 434,
        alt: 'Pantograph'
      }
    ]
  },
  twitter: {
    handle: '@pantograph_io',
    cardType: 'summary_large_image'
  }
}
export default DEFAULT_SEO
