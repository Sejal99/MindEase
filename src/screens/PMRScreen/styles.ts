import { StyleSheet } from "react-native";
import { darkTheme } from "../../theme/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.background,
  },
  content: {
    padding: 24,
    paddingBottom: 48,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  groupName: {
    fontSize: 24,
    fontWeight: '700',
    color: darkTheme.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  groupInstruction: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  mainContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  timerSection: {
    flex: 1,
    marginLeft: 24,
  },
  progressSection: {
    marginTop: 24,
  },
  progressBar: {
    height: 4,
    backgroundColor: darkTheme.border,
    borderRadius: 2,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
});