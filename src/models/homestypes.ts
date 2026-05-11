import { NavigationProp } from "@react-navigation/native";
import { TabParamList } from "../navigation/AppNavigator";
import { ReactElement } from "react";

export type HomeScreenNavigationProp = NavigationProp<TabParamList>;
export interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export type MoodKey = "calm" | "tense" | "anxious" | "exhausted" | "overwhelmed";

export interface Mood {
  key: MoodKey;
  label: string;
  intensity: number;
  color: string;
  dimColor: string;
  borderSel: string;
}

export interface QuickAction {
  icon: ReactElement;
  labelKey: string;
  color: string;
  dimColor: string;
  borderColor: string;
  screen: string;
}