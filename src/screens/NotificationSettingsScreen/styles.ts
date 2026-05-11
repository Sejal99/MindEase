import { StyleSheet } from "react-native";
import { darkTheme } from "../../theme/colors";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: darkTheme.background },
  header: { padding: 20, paddingTop: 24, paddingBottom: 8 },
  headerTitle: { fontSize: 28, fontWeight: '800', color: darkTheme.text, marginBottom: 6 },
  headerDesc: { fontSize: 14, color: darkTheme.textSecondary, lineHeight: 20 },

  section: {
    backgroundColor: darkTheme.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: darkTheme.border,
    marginHorizontal: 20,
    marginBottom: 20,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    color: darkTheme.textSecondary,
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 8,
    textTransform: 'uppercase',
  },

  masterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  masterLabel: { fontSize: 16, fontWeight: '700', color: darkTheme.text },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    gap: 12,
  },
  rowLeft: { flex: 1, gap: 2 },
  rowLabel: { fontSize: 15, fontWeight: '700', color: darkTheme.text },
  rowDesc: { fontSize: 13, color: darkTheme.textSecondary, lineHeight: 18, marginTop: 2 },
  rowMeta: { flexDirection: 'row', gap: 8, marginTop: 8 },

  metaChip: {
    backgroundColor: darkTheme.card,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: darkTheme.border,
  },
  metaChipText: { fontSize: 12, fontWeight: '700', color: darkTheme.primary },

  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: darkTheme.card,
    borderWidth: 1,
    borderColor: darkTheme.border,
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  toggleActive: {
    backgroundColor: darkTheme.primary,
    borderColor: darkTheme.primary,
  },
  toggleKnob: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: darkTheme.textSecondary,
  },
  toggleKnobActive: {
    backgroundColor: darkTheme.text,
  },

  divider: { height: 1, backgroundColor: darkTheme.border, marginHorizontal: 16 },

  bottomPad: { height: 40 },

  modalOverlay: {
    flex: 1,
    backgroundColor: '#000000AA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: darkTheme.card,
    borderRadius: 20,
    padding: 20,
    width: 320,
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: darkTheme.border,
  },
  modalTitle: { fontSize: 18, fontWeight: '800', color: darkTheme.text, marginBottom: 16, textAlign: 'center' },

  pickerRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 200 },
  pickerColumn: { flex: 1, alignItems: 'center' },
  pickerLabel: { fontSize: 12, fontWeight: '600', color: darkTheme.textSecondary, marginBottom: 8 },
  pickerList: { maxHeight: 180 },
  pickerSeparator: { width: 32, alignItems: 'center', justifyContent: 'center' },
  pickerColon: { fontSize: 20, fontWeight: '800', color: darkTheme.text },
  pickerItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  pickerItemActive: { backgroundColor: darkTheme.primary + '30' },
  pickerItemText: { fontSize: 16, color: darkTheme.textSecondary, fontWeight: '600' },
  pickerItemTextActive: { color: darkTheme.primary, fontWeight: '700' },

  confirmBtn: {
    backgroundColor: darkTheme.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  confirmBtnText: { fontSize: 15, fontWeight: '700', color: darkTheme.text },

  dayItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 4,
  },
  dayItemActive: { backgroundColor: darkTheme.primary + '30' },
  dayItemText: { fontSize: 15, color: darkTheme.text, fontWeight: '600' },
  dayItemTextActive: { color: darkTheme.primary, fontWeight: '700' },
});