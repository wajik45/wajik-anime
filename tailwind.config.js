/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         screens: {
            m2xl: { max: "1535px" },
            mxl: { max: "1279px" },
            mlg: { max: "1023px" },
            mmd: { max: "767px" },
            msm: { max: "639px" },
            mssm: { max: "480px" },
            mxsm: { max: "360px" },
         },
      },
   },
   plugins: [],
};
