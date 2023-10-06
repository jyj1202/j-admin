export function requestFullScreen(element: Element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if ((element as any).webkitRequestFullscreen) { /* Safari */
    (element as any).webkitRequestFullscreen();
  } else if ((element as any).msRequestFullscreen) { /* IE11 */
    (element as any).msRequestFullscreen();
  }
}

export function exitFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if ((document as any).webkitExitFullscreen) { /* Safari */
    (document as any).webkitExitFullscreen();
  } else if ((document as any).msExitFullscreen) { /* IE11 */
    (document as any).msExitFullscreen();
  }
}

export function isFullScreen() {
  return (
    document.fullscreenElement ||
    (document as any).webkitFullscreenElement ||
    (document as any).mozFullScreenElement ||
    (document as any).msFullscreenElement
  );
}

export function toggleFullScreen(element: Element) {
  isFullScreen() ? exitFullScreen() : requestFullScreen(element)
}
