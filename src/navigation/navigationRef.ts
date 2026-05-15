import { createNavigationContainerRef } from '@react-navigation/native';
import type { RootStackParamList } from './AppNavigator';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate(name: any, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

let pendingNavigation: { name: any; params?: any } | null = null;

export function navigateWhenReady(name: any, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
    return;
  }

  pendingNavigation = { name, params };
}

export function flushPendingNavigation() {
  if (!pendingNavigation || !navigationRef.isReady()) return;

  const next = pendingNavigation;
  pendingNavigation = null;
  navigationRef.navigate(next.name, next.params);
}
