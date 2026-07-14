import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  // dts는 demo/CI에서 React 타입 중복(@types/react 18 vs 19)으로 깨질 수 있어
  // 라이브러리 배포 전에 별도로 생성. JS 번들은 항상 빌드한다.
  dts: false,
});
