import create from 'zustand'

const usePlayerStore = create((set) => ({
  isPlaying: false,
  src: '',
  layout: 'horizontal',
  playerRef: null,
  setSrc: (src) => set(() => ({ src, isPlaying: true })),
  setPlaying: () => set(() => ({ isPlaying: true })),
  setPaused: () => set(() => ({ isPlaying: false })),
  setPlayerRef: (playerRef) => set(() => ({ playerRef })),
  setPlayerLayout: (layout) => set(() => ({ layout })),
}))

export default usePlayerStore
