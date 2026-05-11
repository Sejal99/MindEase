import { StyleSheet } from "react-native";
import { darkTheme } from "../../theme/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.background,
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  subtitle: {
    marginTop: 8,
  },
  progress: {
    marginTop: 8,
    color: darkTheme.primary,
    fontWeight: '600',
  },
  actionCard: {
    marginBottom: 12,
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 16,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCompleted: {
    marginRight: 16,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
  },
  textCompleted: {
    opacity: 0.7,
  },
  actionDetails: {
    flex: 1,
  },
  actionTitle: {
    marginBottom: 4,
  },
  actionDescription: {
    marginBottom: 4,
  },
  duration: {
    marginTop: 4,
  },
});