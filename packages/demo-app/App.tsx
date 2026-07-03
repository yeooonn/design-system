import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, ThemeProvider, useTheme } from "@yeoooonn/ds-app";

const variants = ["primary", "secondary", "ghost"] as const;
const sizes = ["sm", "md", "lg"] as const;

function Showcase() {
  const { theme, colorScheme, toggleTheme } = useTheme();

  return (
    <ScrollView
      style={{ backgroundColor: theme.background.primary }}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text.primary }]}>
          @yeoooonn/ds-app Button
        </Text>
        <Button
          label={colorScheme === "light" ? "🌙 다크" : "☀️ 라이트"}
          variant="secondary"
          onPress={toggleTheme}
        />
      </View>

      {sizes.map((size) => (
        <View key={size} style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text.secondary }]}>
            size: {size}
          </Text>
          <View style={styles.row}>
            {variants.map((variant) => (
              <Button
                key={variant}
                label={variant}
                variant={variant}
                size={size}
              />
            ))}
            <Button label="disabled" variant="primary" size={size} disabled />
            <Button label="loading" variant="primary" size={size} loading />
          </View>
        </View>
      ))}
      <StatusBar style="auto" />
    </ScrollView>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Showcase />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 24,
    paddingTop: 64,
    gap: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 12,
    textTransform: "uppercase",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    alignItems: "center",
  },
});
