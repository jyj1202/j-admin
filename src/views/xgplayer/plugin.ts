import { Plugin } from 'xgplayer'

const { POSITIONS } = Plugin

export class PlayListButton extends Plugin {
  // 插件的名称，将作为插件实例的唯一key值
  static get pluginName() {
    return 'PlayListPlugin'
  }

  static get defaultConfig () {
      return {
        // 挂载在controls的右侧，如果不指定则默认挂载在播放器根节点上
        position: POSITIONS.CONTROLS_RIGHT
      }
  }

  constructor (args) {
    super(args)
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

  onClick() {
    console.log('open drawer');
    
  }



  render () {
    return `<div class="xgplayer-playlist-button">章节</div>`
  }
}

export class PlayListItem extends Plugin {
  data = null
  // 插件的名称，将作为插件实例的唯一key值
  static get pluginName() {
    return 'PlayListItem'
  }

  static get defaultConfig () {
      return {
        // 如果不指定则默认挂载在播放器根节点上
      }
  }

  constructor (args) {
    super(args)
    this.data = args?.data || []
    this.setHtml(`<div class="xgplayer-playlist-item">${this.data.label}</div>`)
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

  onClick(e) {
    console.log('click list item', e);
    
  }



  render () {
    return `<div class="xgplayer-playlist-item"></div>`
  }
}

export class PlayListDrawer extends Plugin {
  playlist = []
  // 插件的名称，将作为插件实例的唯一key值
  static get pluginName() {
    return 'PlayListDrawer'
  }

  static get defaultConfig () {
      return {
        // 如果不指定则默认挂载在播放器根节点上
      }
  }

  constructor (args) {
    super(args)
    console.log(args);
    this.playlist = args.config?.playlist || []
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

  initList(data: any[] = []) {
    console.log(data, 'data');
    
    data.forEach(i => {
      this.registerPlugin(PlayListItem, {
        data: i
      })
      if (i.children) {
        this.initList(i.children)
      }
    })
  }

  afterCreate () {
    // 对当前插件根节点绑定click事件
    this.bind('click', this.onClick)
  }

  destroy () {
    this.unbind('click', this.onClick)
  }

  onClick(e) {
    console.log('click drawer', e);
    
  }



  render () {
    return `<div class="xgplayer-playlist-drawer"></div>`
  }
}
