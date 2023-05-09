export const dataChartSource = [{
    day: 'Lunedi',
    completed: 10,
}, {
    day: 'Martedi',
    completed: 0,
}, {
    day: 'Mercoledi',
    completed: 3,
}, {
    day: 'Giovedi',
    completed: 7,
}, {
    day: 'Venerdi',
    completed: 1,
}, {
    day: 'Sabato',
    completed: 15,
}, {
    day: 'Domenica',
    completed: 6,
}];

export const dataGridColumns = [
    {
        caption: '',
        dataField: 'id',
        dataType: 'string',
        width: 50,
        alignment: 'center'
    },
    {
        caption: 'Language',
        dataField: 'language',
        dataType: 'string',
        allowSorting: true,
        allowHeaderFiltering: true,
        allowFiltering: true,
    },
    {
        caption: 'Users',
        dataField: 'users',
        dataType: 'string',
        allowSorting: true,
        allowHeaderFiltering: true,
        allowFiltering: true,
        width: 80,
        cellTemplate: 'usersTemplate'
    },
    {
        caption: '% Users',
        dataField: 'percentage',
        dataType: 'string',
        cellTemplate: 'percentageTemplate',
        width: 150
    }]
//crea un array di oggetti con le colonne della griglia
export const dataGridSource = [
    {
        id: '1',
        language: 'it-it',
        users: 23366,
        percentage: 0
    },
    {
        id: '2',
        language: 'it',
        users: 2155,
        percentage: 0
    },
    {
        id: '3',
        language: 'en-gb',
        users: 1008,
        percentage: 0
    },
    {
        id: '4',
        language: 'en-us',
        users: 673,
        percentage: 0
    },
    {
        id: '5',
        language: 'zh-cn',
        users: 489,
        percentage: 0
    },
    {
        id: '6',
        language: 'ru',
        users: 435,
        percentage: 0
    },
    {
        id: '7',
        language: 'ru-ru',
        users: 102,
        percentage: 0
    },
    {
        id: '8',
        language: 'fr-fr',
        users: 81,
        percentage: 0
    },
    {
        id: '9',
        language: 'ro-ro',
        users: 80,
        percentage: 0
    },
    {
        id: '10',
        language: 'uk-ua',
        users: 71,
        percentage: 0
    }
]

export const dataSourceDoughnut = [{
    field: 'Returning Visitor',
    val: 26.8,
}, {
    field: 'New Visitor',
    val: 73.2,
}];

export const usersSources = [
    {value: 'users', name: 'Users'}
];

let usersDataTrend = [];

export default {
    getUsersInfo(type) {
        usersDataTrend = [];
        let date = new Date();
        let day = date.getDate() - 3;
        let temp = '';
        for (let i = 0; i < 6; i++) {
            switch (type.toUpperCase()) {
                case 'DAY':
                    temp = `${day+i} ${this.calculateMonth()}`;
                    break;
                case 'MONTH':
                    temp = this.calculateMonth(i);
                    break;
                case 'HOURLY':
                    temp = `${date.getUTCHours() + i}:00`;
                    break
                case 'WEAK':
                    //TODO: FIX WEAK
                    date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7);
                    temp = `${date.getDate()} ${this.calculateMonth()}`;
                    break;
            }
            usersDataTrend.push({
                temp: `${temp}`,
                users: Math.floor(Math.random() * 1000)
            })
        }
        return usersDataTrend;
    },
    calculateMonth(monthPlus) {
        let date = new Date();
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return months[date.getMonth() + (monthPlus ? monthPlus : 0)]
    }
};