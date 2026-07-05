import { Button, ThemeProvider, useTheme } from "@yeoooonn/ds-web";

const variants = ["primary", "secondary", "ghost"] as const;
const sizes = ["sm", "md", "lg"] as const;

function Showcase() {
  const { theme, colorScheme, toggleTheme } = useTheme();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: theme.background.primary,
        color: theme.text.primary,
        fontFamily: "system-ui, sans-serif",
        padding: 32,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>@yeoooonn/ds-web Button</h1>
        <Button
          label={`${colorScheme === "light" ? "🌙 다크" : "☀️ 라이트"} 모드`}
          onClick={toggleTheme}
          variant="secondary"
        />
      </div>

      {sizes.map((size) => (
        <section key={size} style={{ marginTop: 32 }}>
          <h2
            style={{
              fontSize: 14,
              color: theme.text.secondary,
              textTransform: "uppercase",
            }}
          >
            size: {size}
          </h2>
          <div
            style={{
              display: "flex",
              gap: 16,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
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
          </div>
        </section>
      ))}
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <Showcase />
    </ThemeProvider>
  );
}
