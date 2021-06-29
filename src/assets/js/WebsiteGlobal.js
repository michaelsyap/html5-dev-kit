import 'Assets/css/global.css'

const WebsiteGlobal = (function() {
  let instance

  function init() {
    console.log('Global script initiated...')
  }

  return {
    getInstance: function() {
      if(!instance) {
        instance = init()
      }

      return instance
    }
  }
})()


export default WebsiteGlobal