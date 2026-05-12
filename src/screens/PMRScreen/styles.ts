import { StyleSheet } from "react-native";
import { N } from "../../theme/warm-colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: N.bg,
  },
  content: {
    padding: 24,
    paddingBottom: 100,
  },
  blobTopRight: {
    position: "absolute",
    top: -70,
    right: -70,
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: N.accentLight,
    opacity: 0.28,
  },
  blobBottomLeft: {
    position: "absolute",
    bottom: 150,
    left: -80,
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: N.lavenderDim,
    opacity: 0.44,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  groupName: {
    fontSize: 24,
    fontWeight: '700',
    color: N.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  groupInstruction: {
    color: N.textSecondary,
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
    height: 5,
    backgroundColor: N.surfaceAlt,
    borderRadius: 3,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    color: N.textMuted,
    fontWeight: "700",
  },
});
