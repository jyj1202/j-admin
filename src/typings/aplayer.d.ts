declare module 'aplayer' {
  interface APlayerOptions {
    container: HTMLElement
    fixed?: boolean
    autoplay?: boolean
    theme?: string
    loop?: string
    order?: string
    preload?: string
    volume?: number
    mutex?: boolean
    listFolded?: boolean
    listMaxHeight?: string
    audio: APlayerAudioOptions[]
  }

  interface APlayerAudioOptions {
    name: string
    artist: string
    url: string
    cover?: string
    theme?: string
    lrc?: string
    type?: string
    volume?: number
    lrcType?: number
    fade?: boolean
  }

  export default class APlayer {
    constructor(options: APlayerOptions)
  }
}
