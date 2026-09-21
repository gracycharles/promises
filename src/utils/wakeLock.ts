/**
 * Screen Wake Lock & Fullscreen utilities for continuous Always-On display
 * Keeps the screen awake and prevents locking during devotional meditation and studio production.
 */

let activeSentinel: WakeLockSentinel | null = null;
let isWakeLockRequested = false;

export async function requestScreenWakeLock(): Promise<WakeLockSentinel | null> {
  isWakeLockRequested = true;
  if (typeof navigator !== 'undefined' && 'wakeLock' in navigator) {
    try {
      if (activeSentinel && !activeSentinel.released) {
        return activeSentinel;
      }
      const sentinel = await navigator.wakeLock.request('screen');
      activeSentinel = sentinel;
      sentinel.addEventListener('release', () => {
        if (isWakeLockRequested && document.visibilityState === 'visible') {
          // Re-acquire if released automatically by browser
          setTimeout(() => {
            requestScreenWakeLock().catch(() => {});
          }, 1000);
        }
      });
      return sentinel;
    } catch (err) {
      console.info('Screen WakeLock status note (browser policy):', err);
      return null;
    }
  }
  return null;
}

export async function releaseScreenWakeLock(): Promise<void> {
  isWakeLockRequested = false;
  if (activeSentinel) {
    try {
      await activeSentinel.release();
      activeSentinel = null;
    } catch (err) {
      console.warn('Error releasing wake lock:', err);
    }
  }
}

export function isWakeLockSupported(): boolean {
  return typeof navigator !== 'undefined' && 'wakeLock' in navigator;
}

export function toggleFullScreen(): void {
  if (typeof document === 'undefined') return;

  if (!document.fullscreenElement) {
    // Attempt request fullscreen on document root
    const root = document.documentElement;
    if (root.requestFullscreen) {
      root.requestFullscreen().catch((err) => {
        console.warn('Fullscreen request notification:', err);
      });
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch((err) => {
        console.warn('Exit fullscreen notification:', err);
      });
    }
  }
}
