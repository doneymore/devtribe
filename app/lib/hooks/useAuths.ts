// lib/hooks/useAuth.ts
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import type { AppDispatch } from "../store";
import { AuthUser, selectAuth, selectIsAuthenticated, selectIsLoading, selectToken, selectUser, setCredentials, setLoading } from "../features/auth/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Selectors
  const auth = useSelector(selectAuth);
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectIsLoading);

  // Actions
  const login = useCallback(
    (token: string, user: AuthUser) => {
      dispatch(setCredentials({ token, user }));
    },
    [dispatch]
  );

    // const logout = useCallback(() => {
    //   dispatch(logout());
    // }, [dispatch]);

  //   const updateUser = useCallback(
  //     (userData: Partial<AuthUser>) => {
  //       dispatch(updateUserAction(userData));
  //     },
  //     [dispatch]
  //   );

  const setAuthLoading = useCallback(
    (loading: boolean) => {
      dispatch(setLoading(loading));
    },
    [dispatch]
  );

  return {
    // State
    auth,
    token,
    user,
    isAuthenticated,
    isLoading,

    // Actions
    login,
    // logout,
    // updateUser,
    setAuthLoading,
  };
};
