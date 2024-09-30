import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { AuthStatus, type User } from '../interfaces';
import { loginAction } from '../actions';

export const useAuthStore = defineStore('auth', () => {
  // Authenticated, unAuthenticated, checking
  const authStatus = ref<AuthStatus>(AuthStatus.Checking);
  const user = ref<User | undefined>();
  const token = ref('');

  const login = async (email: string, password: string) => {
    try {
      const loginResponse = await loginAction('email', 'password');
      if (!loginResponse.ok) {
        return false;
      }
      user.value = loginResponse.user;
      token.value = loginResponse.token;
      authStatus.value = AuthStatus.Authenticated;
      return true;
    } catch (error) {
      return logout();
    }
  };

  const logout = () => {
    authStatus.value = AuthStatus.UnAuthenticated;
    user.value = undefined;
    token.value = '';
  };

  return {
    user,
    token,
    authStatus,

    // Getters
    isChecking: computed(() => authStatus.value === AuthStatus.Checking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),

    //TODO: Getter para saber si es admin o no

    username: computed(() => user.value?.fullName ?? ''),

    // Actions
    login,
    logout,
  };
});
