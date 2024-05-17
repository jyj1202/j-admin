// @ts-ignore

import videojs from "video.js";

const Plugin = videojs.getPlugin('plugin');
const Button = videojs.getComponent('Button');
const ClickableComponent = videojs.getComponent('ClickableComponent');
const Component = videojs.getComponent('Component');

// screen.orientation.lock('landscape-primary')
const orientation =
(screen.orientation || {}).type ||
screen.mozOrientation ||
screen.msOrientation;

class PageFullscreenToggle extends Button {
  pageFullscreen = false

  constructor(player, options) {
    super(player, options);
    this.addClass('vjs-pageFullscreen-icon-enter');
    this.bindOrientation()
  }

  bindOrientation() {
    window.addEventListener('resize', (e) => {
      console.log(orientation, 'orientation');
      if (orientation == 'landscape-primary') {
        this.pageFullscreen = true
        this.player_.addClass('vjs-horizontal')
      }
      
      // if (this.pageFullscreen) return
      // if (screen.orientation) {
      //   // 如果浏览器支持 screen.orientation，则使用它
      //   if (screen.orientation.type.includes('landscape')) {
      //       // 处理横屏情况
      //       console.log("处于横屏状态---");
      //       this.pageFullscreen = true
      //       this.player_.addClass('vjs-horizontal')
      //   } else {
      //     // 处理非横屏情况
      //     console.log("不处于横屏状态---");
      //     this.pageFullscreen = false
      //     this.player_.removeClass('vjs-horizontal')
      //   }
      //   this.player_.trigger('pageFullscreenChange', this.pageFullscreen)
      //   this.setFullScreenIcon()
      // }
      // else {
      //     // 否则，尝试使用 window.orientation 或 window.innerWidth 和 window.innerHeight
      //     if (window.orientation === 90 || window.orientation === -90 || window.innerWidth > window.innerHeight) {
      //         // 处理横屏情况
      //         console.log("处于横屏状态");
      //         this.isHorizontal = true
      //         this.player.addClass('vjs-horizontal')
      //     } else {
      //         // 处理非横屏情况
      //         console.log("不处于横屏状态");
      //         this.isHorizontal = false
      //         this.player.removeClass('vjs-horizontal')
      //       }
      // }
    })
  }

  handleClick(e: Event) {
    this.pageFullscreen = !this.pageFullscreen
    this.setFullScreenIcon()
    this.player_.toggleClass('vjs-pageFullscreen', this.pageFullscreen)
    this.player_.trigger('pageFullscreenChange', this.pageFullscreen)
  }

  setFullScreenIcon() {
    if (this.pageFullscreen) {
      this.removeClass('vjs-pageFullscreen-icon-enter');
      this.addClass('vjs-pageFullscreen-icon-exit');
    } else {
      this.addClass('vjs-pageFullscreen-icon-enter');
      this.removeClass('vjs-pageFullscreen-icon-exit');
    }
  }
}
videojs.registerComponent('pageFullscreenToggle', PageFullscreenToggle)



class ShowPlaylistButton extends Button {
  constructor(player, options) {
    super(player, options);
    // this.controlText('chapter');
    this.el().innerHTML = '章节';
    this.addClass('vjs-showPlaylist-button vjs-hidden');

    player.on('pageFullscreenChange', (e: Event, pageFullscreen: any) => {
      if (pageFullscreen) {
        this.show()
      } else {
        this.hide()
      }
    })
  }

  handleClick(e: Event) {
    e.stopPropagation();
    this.player_.trigger('showPlaylist')
  }
}
videojs.registerComponent('showPlaylistButton', ShowPlaylistButton)


class PlaylistItem extends ClickableComponent {
  videoId: number
  
  constructor(player, options) {
    super(player, options);
    const {videoId, label, src, poster, className} = options
    this.videoId = videoId
    this.removeClass('vjs-control vjs-button')
    this.addClass('vjs-playlist-item')
    this.el().innerHTML = label
    this.el().setAttribute('data-id', `${this.videoId}`)
    className && this.addClass(className)
  }

  handleClick(e: Event) {
    e.stopPropagation()
    
    // this.toggleClass('active', true)
    this.triggerToggle({
      ...this.options_,
      videoId: this.videoId
    })
  }

  /**
   * 派发切换视频
   * @param arg {}
   */
  triggerToggle(arg: any) {
    this.player_.trigger('togglePlaylist', arg)
  }
}

class PlaylistContainer extends Component {
  constructor(player, options) {
    super(player, options);
    this.addClass('vjs-playlist-container')
    const {listItems} = options
    listItems.forEach(item => {
      this.addChild(item)
    });
  }
}

class PlaylistCloseBlock extends ClickableComponent {
  constructor(player, options={}) {
    super(player, options);
    this.removeClass('vjs-control vjs-button')
    this.addClass('vjs-playlist-close-block')
  }

  handleClick() {
    this.player_.trigger('hidePlaylist')
  }
}

class Playlist extends Component {
  blurEventId = null
  isShow = false
  _hasControls = false
  currentVideoId = 0
  _container: Element | null | Component = null

  constructor(player, options) {
    super(player, options);
    this.addClass('vjs-playlist-modal');
    this.removeClass('vjs-control vjs-button')
    // this.initList(options)
    this.currentVideoId = options.currentVideoId
    this.el().innerHTML = ''
    this._initCloseBlock()
    this._initListContainer(options)
  }

  _initCloseBlock() {
    const closeBlock = new PlaylistCloseBlock(this.player_)
    this.addChild(closeBlock)
  }

  _initListContainer(options) {
    const { playlist } = options
    const listItems: PlaylistItem[] = playlist.map(item => {
      const child = new PlaylistItem(this.player_, item)
      return child
    })
    this._container = new PlaylistContainer(this.player_, {
      listItems
    })
    this.addChild(this._container)
  }

  handleListContainerClick(e: Event) {
    const target = e.target as HTMLElement
      if (target.classList.contains('vjs-playlist-item')) {
        const index = +target.dataset.index!
        this.currentVideoId = index
        this.player_.trigger('togglePlaylist', {
          index: this.currentVideoId
        })
        const items = this.$$('.vjs-playlist-item')
        items.forEach((item, i) => {
          if (item.dataset.index == this.currentVideoId) {
            item.classList.add('active')
          } else {
            item.classList.remove('active')
          }
        })
      }
  }

  /**
   * 派发切换视频
   * @param arg {}
   */
  triggerToggle(arg) {
    this.player_.trigger('togglePlaylist', arg)
  }

  show() {
    this.isShow = true;
    this.addClass('vjs-playlist-show');
    this._hasControls = this.player_.controls();
    this.player_.controls(false);
  }

  hide() {
    this.isShow = false;
    this.removeClass('vjs-playlist-show');
    if (this._hasControls) {
      this.player_.controls(true);
    }
  }
}
videojs.registerComponent('Playlist', Playlist)



export class PlayListPlugin extends Plugin {
  playlist: Playlist| null = null
  currentVideoId = 0
  isHorizontal = false

  constructor(player, options) {
    super(player, options);
    this.currentVideoId = options.currentVideoId ?? 0;
    this.initPlaylist(options)
    
  }

  initPlaylist(options) {
    this.playlist = new Playlist(this.player, options)
    this.player.addChild(this.playlist);
    this.player.on('showPlaylist', () => {
      this.playlist!.show()
    })
    this.player.on('hidePlaylist', () => {
      this.playlist!.hide()
    })
    
    this.player.on('togglePlaylist', (e: Event, listItem: any) => {
      const items = this.player.$$('.vjs-playlist-item')
      items.forEach((item, i) => {
        if (item.dataset.id == listItem.videoId) {
          item.classList.add('active')
        } else {
          item.classList.remove('active')
        }
      })
      console.log(listItem);
      const {type, src} = listItem
      this.player.src({
        type,
        src
      })
      this.player.load();
      this.player.play();
    })
  }
}
// videojs.registerPlugin('playListPlugin', PlayListPlugin)

