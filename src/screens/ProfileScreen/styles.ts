import COLORS from '../../constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.BACKGROUND_LIGHT },
  
  header: {
    padding: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.BACKGROUND_CARD,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  headerText: {
    flex: 1,
  },
  
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.TEXT_DARK,
    marginBottom: 4,
  },
  
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.TEXT_DARK_SECONDARY,
  },
  
  menuContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND_CARD,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: COLORS.BORDER,
  },
  
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  menuText: {
    flex: 1,
    marginLeft: 12,
  },
  
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.TEXT_DARK,
    marginBottom: 4,
  },
  
  menuDescription: {
    fontSize: 13,
    color: COLORS.TEXT_DARK_SECONDARY,
  },
  
  section: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.TEXT_TERTIARY,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
});
