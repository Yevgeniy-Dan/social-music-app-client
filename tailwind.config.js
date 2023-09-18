/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './ui/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        mainText: '#494949',
        grad: 'linear-gradient(92.24deg, #36D1DC 0%, #5B86E5 100%)',
        secondText: '#D9D9D9',
        border: '#C8C8C8',
        blueText: '#3CC6DE',
      },
    },
  },
  plugins: [],
}
