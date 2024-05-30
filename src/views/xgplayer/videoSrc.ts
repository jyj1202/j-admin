const video1 = {
  src: '/video1.mp4',
  label: '1.1 video1',
  poster: '/poster1.jpg',
  videoId: 1,
  type: 'video/mp4'
}
const video2 = {
  src: '/video2.mp4',
  label: '1.2 video2',
  poster: '/poster2.jpg',
  videoId: 2,
  type: 'video/mp4'
}
const video3 = {
  src: '/video3.mp4',
  label: '1.3 video3',
  poster: '/poster3.jpg',
  videoId: 3,
  type: 'video/mp4'
}

const video4 = {
  src: '/video1.mp4',
  label: '1.1 video1',
  poster: '/poster1.jpg',
  videoId: 4,
  type: 'video/mp4'
}
const video5 = {
  src: '/video2.mp4',
  label: '1.2 video2',
  poster: '/poster2.jpg',
  videoId: 5,
  type: 'video/mp4'
}
const video6 = {
  src: '/video3.mp4',
  label: '1.3 video3',
  poster: '/poster3.jpg',
  videoId: 6,
  type: 'video/mp4'
}

const videoList1 = [video1, video2, video3]
const videoList2 = [video4, video5, video6]
const videoListData: {label: string; chapter?: boolean; src?: string}[] = [{
  label: '章节1',
  chapter: true,
}, ...videoList1, {
  label: '章节2',
  chapter: true
}, ...videoList2]

export {
  video1,
  videoList2,
  videoList1,
  videoListData
}
