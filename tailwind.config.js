/** @type {import('tailwindcss').Config} */
import {
  primaryColor,
  primaryDarkColor,
  secondaryColor,
  secondaryDarkColor,
  offWhiteColor,
  warnColor,
  errorColor,
  successColor,
  infoColor,
} from './src/configs/colors';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: primaryColor,
        primaryDark: primaryDarkColor,
        secundary: secondaryColor,
        secundaryDark: secondaryDarkColor,
        offWhite: offWhiteColor,
        info: infoColor,
        success: successColor,
        warn: warnColor,
        error: errorColor,
      },
    },
  },
  plugins: [],
};
