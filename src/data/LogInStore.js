import { create } from 'zustand';

const useLogInStore = create((set) => ({
  isLoggedIn: false,
  isAdmin: false,
  loginAsAdmin: () => set({ isLoggedIn: true, isAdmin: true }),
  logout: () => set({ isLoggedIn: false, isAdmin: false }),
}));

export { useLogInStore };