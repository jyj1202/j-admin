import { Plugin, Util, Events } from 'xgplayer'

const { POSITIONS } = Plugin


export class PlaylistButton extends Plugin {
  // 插件的名称，将作为插件实例的唯一key值
  static get pluginName() {
    return 'PlaylistButton'
  }

  static get defaultConfig () {
      return {
        // 挂载在controls的右侧，如果不指定则默认挂载在播放器根节点上
        position: POSITIONS.CONTROLS_RIGHT
      }
  }

  constructor (args) {
    super(args)
    this.hide()
    this.bindListener()
  }

  beforePlayerInit () {
   // TODO 播放器调用start初始化播放源之前的逻辑
  }

  afterPlayerInit () {
    // TODO 播放器调用start初始化播放源之后的逻辑
  }

  afterCreate () {
    // 对当前插件根节点绑定click事件
    this.bind('click', this.onClick)
  }

  destroy () {
    this.unbind('click', this.onClick)
  }

  bindListener() {
    this.player.on(Events.CSS_FULLSCREEN_CHANGE, (isCssFullScreen) => {
      if (isCssFullScreen) {
        this.show()
      } else {
        this.hide()
      }
    })
  }

  onClick = () => {
    this.player.emit('show_playlist')
  }



  render () {
    return `<div class="xgplayer-playlist-button">章节</div>`
  }
}

export class PlaylistDrawer extends Plugin {
  playlist = []
  // 插件的名称，将作为插件实例的唯一key值
  static get pluginName() {
    return 'PlaylistDrawer'
  }

  static get defaultConfig () {
      return {
        // 如果不指定则默认挂载在播放器根节点上
      }
  }

  constructor (args) {
    super(args)
    this.playlist = args.config?.playlist || []
    // this.hide()
    this.bindListener()
    this.initList(this.playlist)
  }

  beforePlayerInit () {
   // TODO 播放器调用start初始化播放源之前的逻辑
  }

  afterPlayerInit () {
    // TODO 播放器调用start初始化播放源之后的逻辑
  }

  beforeCreate() {
  }

  destroy () {
    this.off('show_playlist', this.show)
    this.unbind('click', this.onItemClick)
    this.player.root?.removeEventListener('click', this.onBodyClick, true)
  }

  bindListener() {
    this.player.on('show_playlist', this.show)

    this.bind('click', this.onItemClick)

    this.player.root?.addEventListener('click', this.onBodyClick, true)
  }

  onItemClick = (e: Event) => {
    const classList = [...(e.target as HTMLElement).classList]
    if (classList.includes("xgplayer-playlist-item")) {
      const id = (e.target as HTMLElement).dataset.id
      console.log(id);
      const { src } = this.playlist.find(i => i.videoId == id)
      this.player.playNext({
        url: src,
        // poster: '新的海报图'
      })
      this.hide()
    }
  }

  onBodyClick = (e: Event) => {
    if (!this.root.contains(e.target as Node) && this.root.classList.contains('playlist-show')) {
      this.hide()
    }
  }

  initList(data: any) {
    const elList = this.generateElList(data)
    // const container = Util.findDom(this.root, '.xgplayer-playlist-drawer-right')
    this.root.append(...elList)
  }

  generateElList(data: any[] = []) {
    const elList: HTMLElement[] = []
    
    data.forEach(i => {
      const el = this.createPlaylistItem(i)
      elList.push(el)
      // if (i.children) {
      //   const els = this.generateElList(i.children)
      //   elList.push(...els)
      // }
    })

    return elList
  }

  createPlaylistItem(data: any) {
    const { chapter, label, videoId } = data
    let el: HTMLElement | undefined = undefined
    if (chapter) {
      el = Util.createDom('div', `${label}`, {}, 'xgplayer-playlist-item')
    } else {
      el = Util.createDom('div', `${label}`, {
        'data-id': videoId
      }, 'xgplayer-playlist-item')
    }
    return el
  }

  show = () => {
    const mobile = this.player.getPlugin('mobile')
    mobile.hide()
    this.player.controls.hide()
    // super.show()
    Util.addClass(this.root, 'playlist-show')
    // this.root.style.display = 'flex'
    return ''
  }

  hide() {
    const mobile = this.player.getPlugin('mobile')
    mobile && mobile.show()
    this.player.controls.show()
    Util.removeClass(this.root, 'playlist-show')
    // return super.hide()
    return ''
  }

  render () {
    return `<div class="xgplayer-playlist-drawer">
            </div>`
  }
}

// export class Playlist extends Plugin {
//   // 插件的名称，将作为插件实例的唯一key值
//   static get pluginName() {
//     return 'Playlist'
//   }

//   constructor (args) {
//     super(args)
//     this.playlist = args.config?.playlist || []
//     this.registerPlugin(PlaylistButton, {
//       config: {
//         index: 1
//       }
//     })
//     this.registerPlugin(PlaylistDrawer, {config: args.config})
//   }
// }
