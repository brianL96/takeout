/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      fontFamily: {
        edu: ["Edu AU VIC WA NT Pre", "cursive"],
        gummy: ["Sour Gummy", "sans-serif"],
        kaushan: ["Kaushan Script", "cursive"],
      },

      keyframes:{
        changeColor : {
          '0%' : {backgroundColor: '#90caf9'},
          '100%' : {backgroundColor: '#1565c0'},
        },
        moveLeft : {
          '0%' : {left: '100%'},
          '100%' : {left: '50%'},
        },
        moveRight : {
          '0%' :{left: '50%'},
          '100%' :{left: '100%'},
        },
        shrinkMenuContainer : {
          '0%' : {height: '40rem'},
          '100%' : {height: '20rem'}
        },
        expandMenuContainer : {
          '0%' : {height: '20rem'},
          '100%' : {height: '40rem'}
        }
      },

      animation:{
        changeColor: 'changeColor 10s',
        moveLeft: 'moveLeft 0.75s',
        moveRight: 'moveRight 0.75s forwards',
        shrinkMenuContainer: 'shrinkMenuContainer 2s forwards',
        expandMenuContainer: 'expandMenuContainer 2s forwards'
      },

      inset: {
        '18': '4.5rem',
        '18.5': '4.625rem',
        '19': '4.75rem',
        '33': '8.25rem'
      },

      margin:{
        '17': '4.25rem',
        '30': '7.5rem',
        '31': '7.75rem'
      },

      screens: {
        'screen160': '40rem',
        'screen180': '45rem',
        'screen210': '52.5rem',
        'screen216': '54rem'
      },

      spacing: {
        '234' : '58.5rem',
        '216' : '54rem',
        '210' : '52.5rem',
        '190' : '47.5rem',
        '160': '40rem',
        '144': '36rem',
        '128': '32rem',
        '120': '30rem',
        '108' : '27rem',
        '105' : '26.25rem',
        '100': '25rem',
        '88': '22rem',
        '84': '21rem',
        '68': '17rem',
        '66': '16.5rem',
        '3/4': '75%'
      },

      width:{
        '3/10': '30%',
        '9/10': '90%',
        '22': '5.5rem',
        '26' : '6.5rem',
        '41' : '10.25rem',
        '42' : '10.5rem',
        '70': '17.5rem',
        '84' : '21rem',
        '98' : '24.5rem',
        '102': '25.5rem',
        '103' : '25.75rem',
        '105' : '26.25rem',
        '106' : '26.5rem',
        '108' : '27rem',
        '110' : '27.5rem',
        '120' : '30rem',
        '210' : '52.5rem',
        '216' : '54rem'
      },
      height:{
        '1/10': '10%',
        '1/8': '12.5%',
        '9/10': '90%',
        '15': '3.75rem',
        '18': '4.5rem',
        '27': '6.75rem',
        '34': '8.5rem',
        '42': '10.5rem',
        '66': '16.5rem',
        '68': '17rem',
        '72.25': '18.063rem',
        '72.5': '18.125rem',
        '73': '18.25rem',
        '74': '18.5rem',
        '76': '19rem',
        '84': '21rem',
        '84.25': '21.063rem',
        '84.5': '21.125rem',
        '86': '21.5rem',
        '90': '22.5rem',
        '92': '23rem',
        '108': '27rem',
        '103': '25.75rem',
        '120': '30rem',
        '128': '32rem',
        '156': '39rem',
        '176': '44rem',
        '180': '45rem',
        '184': '46rem',
        '190': '47.5rem',
        '192': '48rem',
        '206': '51.5rem',
        '216' : '54rem',
        '228' : '57rem'
      }
    },
  },
  plugins: [],
}

