module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", // Adjust if your source files are elsewhere
    ],
    theme: {
      extend: {
        colors: {
          'nursery-bg': '#8aa8c9', // Your custom color
        },
      },
    },
    plugins: [],
  };


// This is a Tailwind CSS configuration file that specifies the content sources
// for purging unused styles and extends the default theme with custom styles.
// It includes the main HTML file and all JavaScript/TypeScript files in the src directory.
// The `content` array tells Tailwind where to look for class names to include in the final CSS.
// The `theme` object allows for extending the default Tailwind theme with custom styles.
// The `plugins` array is empty, indicating no additional plugins are being used.
// This configuration is essential for optimizing the final CSS output and ensuring that only the styles used in the project are included, reducing file size and improving performance.
// This file is typically used in projects that utilize Tailwind CSS for styling.
// It is a common practice to keep this file at the root of the project or in a designated configuration directory.
// The configuration can be customized further by adding custom colors, fonts, spacing, etc. in the `extend` section.
// To use this configuration, ensure that Tailwind CSS is installed in your project.
// You can install Tailwind CSS via npm or yarn and then run the build process to generate the final CSS file.      