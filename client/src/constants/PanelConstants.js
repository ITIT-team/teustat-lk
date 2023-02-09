import { numberSplitter } from 'utils'

export const TAB_ID = {
  FOBFOR: 5,
  FREIGHT: 1,
  RAILWAY: 2,
  DELIVERY: 4,
  AUTO: 3,
  GROUPAGE: 6,
  MAP: 7,
}

export const RATE_TYPES = {
  FOBFOR: 'fobFor', // Сквозные
  FREIGHT: 'freight', // Фрахт
  RAILWAY: 'railway', // ЖД
  TRUCKING: 'trucking', // Автоперевозки
  DELIVERY: 'delivery', // Выдача
  GROUPAGE: 'groupage', // Сборные грузы
  DROPOFF: 'dropOff', // Дроп офф
}

export const INITIAL_TABS_STATE = [
    { // Cross
        id: 5, depCity: '', desCity: '', agent: '', s20: false, s20t: false, s40: false,
        import: false, export: false, kabotaj: false, rateSort: 'up', future: false, today: true
    },
    { // Fraxt
        id: 1, depPort: '', desPort: '', agent: '', terminal: '', s20: false, s40: false, coc: false, soc: false, cityOfGiven: '',
        import: false, export: false, kabotaj: false, rateSort: 'up', future: false, today: true
    },
    { // RAILWAY
        id: 2, depCity: '', desCity: '', depStation: '', desStation: '', depTerminal: '', desTerminal: '', 
        agent: '', s20: false, s20t: false, s40: false, coc: false, soc: false, import: false, direct: false, kabotaj: false,
        export: false, rateSort: 'up', future: false, today: true
    },
    { // Given
        id: 4, depCity: '', desCity: '', agent: '', s20: false, s40: false, coc: false, soc: false,
        import: false, export: false, kabotaj: false, rateSort: 'up', future: false, today: true
    },
    { // Auto
        id: 3, depCity: '', desCity: '', size: '', agent: '',
        rateSort: 'up', future: false, today: true
    },
    { // Groupage
        id: 6, depCity: '', desCity: '', typeUnit: '', agent: '',
        rateSort: 'up',
    },
    { // Map
        id: 7, initialZoom: 14, initialCoordinates: { lat: 48, long: 44 }
    },
]

export const GRAPHIC_INITIALIZE_OPTIONS = {
    maintainAspectRatio: false,
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      // title: {
      //   display: true,
      //   text: 'График изменений стоимости',
      // },
      tooltip: {
          callbacks: {
              label: function(context){
                let label = context.dataset.label || '';
                const curr = context.dataset.yAxisID === 'usd' ? '$' : 'Руб.'
                if (label) {
                    label += ' : ';
                }
                if (context.parsed.y !== null) {
                    label += `${numberSplitter(`${context.parsed.y}`)} ${curr}`
                }
                return label;
              },
              title: function (context){
                return new Date(context[0].label).toLocaleDateString('ru-RU')
              }
          }
      },
      legend: {
        display: false
      },
    },
    scales: {
      rub: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
            display: true,
            text: 'Стоимость, RUB',
            padding: 20
        }
      },
      usd: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        title: {
            display: true,
            text: 'Стоимость, USD',
            padding: 20
        }
      },
      x: {
        ticks: {
          callback: function (val) {
            return new Date(this.getLabelForValue(val)).toLocaleDateString('ru-RU')
          }
        }
      }
    }
}

export const GRAPHIC_TAB_ID = {
  FOBFOR: 1,
  FREIGHT: 2,
  DROP_OFF: 3,
  RAILWAY: 4,
  DELIVERY: 5,
}

export const INITIAL_GRAPHIC_TABS_STATE = [
  { // Cross
    id: 1, depCity: '', desCity: '', agent: '', s20: false, s20t: false, s40: false
  },
  { // Fraxt
    id: 2, depPort: '', desPort: '', agent: '', terminal: '', s20: false, s40: false, coc: false, soc: false, cityOfGiven: ''
  },
  { // Drop Off
    id: 3, depPort: '', desPort: '', agent: '', terminal: '', s20: false, s40: false, coc: false, soc: false, cityOfGiven: ''
  },
  { // RAILWAY
    id: 4, depCity: '', desCity: '', depStation: '', desStation: '', depTerminal: '', desTerminal: '', 
    agent: '', s20: false, s20t: false, s40: false, coc: false, soc: false
  },
  { // Given
    id: 5, depCity: '', desCity: '', agent: '', s20: false, s40: false, coc: false, soc: false
  },
]
