import create from 'zustand'

const usePlayerStore = create((set) => ({
  isPlaying: false,
  src: '',
  playerRef: null,
  setSrc: (src) => set((state) => ({ src, isPlaying: true })),
  setPlaying: () => set((state) => ({ isPlaying: true })),
  setPaused: () => set((state) => ({ isPlaying: false })),
  setPlayerRef: (playerRef) => set((state) => ({ playerRef })),
}))

export default usePlayerStore
