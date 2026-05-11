import { StyleSheet } from "react-native";
import { darkTheme } from "../../theme/colors";

export const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: darkTheme.background },
  container: { flex: 1 },
  content: { padding: 24, paddingBottom: 48 },

  header: { marginBottom: 28 },
  techniqueLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 2.5, marginBottom: 10 },
  title: { fontSize: 26, fontWeight: '700', color: darkTheme.text, lineHeight: 34 },

  // Progress dots
  dotsRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 28 },

  // Step card
  stepCard: {
    backgroundColor: darkTheme.card,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: darkTheme.border,
    marginBottom: 24,
  },

  // Sense header
  senseHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20 },
  senseTextBlock: { flex: 1 },
  sensePill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 8,
    gap: 5,
  },
  sensePillText: { fontSize: 12, fontWeight: '700', letterSpacing: 0.5 },
  instruction: { fontSize: 14, lineHeight: 20 },

  // Entries
  entriesBlock: { gap: 4, marginBottom: 20 },

  // In-card progress
  inCardProgress: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  inCardTrack: {
    flex: 1,
    height: 4,
    backgroundColor: darkTheme.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  inCardFill: { height: '100%', borderRadius: 2 },
  progressLabel: { fontSize: 11, fontWeight: '700', minWidth: 56, textAlign: 'right' },

  // CTA
  cta: { borderRadius: 14, marginBottom: 14 },
  tip: { textAlign: 'center', fontSize: 12 },
});