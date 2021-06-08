module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        fs: 'empty',
        tls: 'empty',
        net: 'empty'
      }
    }

    return config
  }
}
