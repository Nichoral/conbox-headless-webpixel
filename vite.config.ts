import typescript from "@rollup/plugin-typescript";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    typescript({
      target: "es5",
      rootDir: "src",
      declaration: true,
      declarationDir: "lib",
      exclude: "node_modules/**",
      allowSyntheticDefaultImports: true,
    }),
    dts({
      tsconfigPath: "tsconfig.app.json",
    }),
  ],
  build: {
    // 打包输出的目录
    outDir: "lib",
    lib: {
      // 组件库源码的入口文件
      entry: "src/index.ts",
      // 组件库名称
      name: "convbox-tracking",
      // 文件名称, 打包结果举例: my-packages.umd.cjs
      fileName: "index",
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["react", "@shopify/hydrogen"],
    },
  },
});
