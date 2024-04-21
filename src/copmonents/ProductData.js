const items = [
    {
        id: 1,
        title: 'Товар-1',
        img: ['1A.jpg', '1B.jpg'],
        imgMacro: ['1AM.jpg'],
        desc: 'Описание-1',
        category: 'c1',
        price: '1.11'
    },
    {
        id: 2,
        title: 'Товар-2',
        img: ['2A.jpg', '2B.jpg'],
        imgMacro: ['2AM.jpg'],
        desc: 'Описание-2',
        category: 'c2',
        price: '2.22'
    },
    {
        id: 3,
        title: 'Товар-3',
        img: ['3A.jpg', '3B.jpg'],
        imgMacro: ['3AM.jpg'],
        desc: 'Описание-3',
        category: 'c3',
        price: '3.33'
    },
    {
        id: 4,
        title: 'Товар-4',
        img: ['4A.jpg', '4B.jpg'],
        imgMacro: ['4AM.jpg'],
        desc: 'Описание-4',
        category: 'c4',
        price: '4.44'
    },
    {
        id: 5,
        title: 'Товар-5',
        img: ['5A.jpg', '5B.jpg'],
        imgMacro: ['5ABM.png'],
        desc: 'Описание-5',
        category: 'c3',
        price: '5.55'
    },
    {
        id: 6,
        title: 'Товар-6',
        img: ['6A.jpg', '6B.jpg', '6C.jpg'],
        imgMacro: ['6AM.jpg'],
        desc: 'Описание-6',
        category: 'c4',
        price: '6.66'
    },
    {
        id: 7,
        title: 'Товар-7',
        img: ['7A.jpg', '7B.jpg'],
        imgMacro: ['7AM.jpg'],
        desc: 'Описание-7',
        category: 'c1',
        price: '7.77'
    },
    {
        id: 8,
        title: 'Товар-8',
        img: ['8A.jpg', '8B.jpg', '8C.jpg'],
        imgMacro: ['8AM.jpg'],
        desc: 'Описание-8',
        category: 'c2',
        price: '8.88'
    },
    {
        id: 9,
        title: 'Товар-9',
        img: ['9A.jpg', '9B.jpg'],
        imgMacro: ['9AM.jpg'],
        desc: 'Описание-9',
        category: 'c2',
        price: '9.99'
    },
    {
        id: 10,
        title: 'Товар-10',
        img: ['10A.jpg', '10B.jpg', '10C.jpg'],
        imgMacro: ['10AM.jpg'],
        desc: 'Описание-10',
        category: 'c3',
        price: '10.10'
    },
    {
        id: 11,
        title: 'Товар-11',
        img: ['11A.jpg', '11B.jpg', '11C.jpg'],
        imgMacro: ['11AM.jpg'],
        desc: 'Описание-11',
        category: 'c4',
        price: '11.11'
    },
    {
        id: 12,
        title: 'Товар-12',
        img: ['12A.jpg', '12B.jpg', '12C.jpg'],
        imgMacro: ['12AM.jpg'],
        desc: 'Описание-12',
        category: 'c1',
        price: '12.12'
    },
    {
        id: 13,
        title: 'Товар-13',
        img: ['13A.jpg', '13B.jpg'],
        imgMacro: ['13AM.jpg'],
        desc: 'Описание-13',
        category: 'c1',
        price: '13.13'
    },
    {
        id: 14,
        title: 'Товар-14',
        img: ['14A.jpg', '14B.jpg'],
        imgMacro: ['14AM.jpg'],
        desc: 'Описание-14',
        category: 'c1',
        price: '14.14'
    },
    {
        id: 15,
        title: 'Товар-15',
        img: ['15A.jpg', '15B.jpg'],
        imgMacro: ['15AM.jpg'],
        desc: 'Описание-15',
        category: 'c1',
        price: '15.15'
    },
    {
        id: 16,
        title: 'Товар-16',
        img: ['16A.jpg', '16B.jpg'],
        imgMacro: ['16AM.jpg'],
        desc: 'Описание-16',
        category: 'c1',
        price: '16.16'
    },
    {
        id: 17,
        title: 'Товар-17',
        img: ['17A.jpg', '17B.jpg'],
        imgMacro: ['17AM.jpg'],
        desc: 'Описание-17',
        category: 'c2',
        price: '17.17'
    },
    {
        id: 18,
        title: 'Товар-18',
        img: ['18A.jpg', '18B.jpg'],
        imgMacro: ['18AM.jpg'],
        desc: 'Описание-18',
        category: 'c4',
        price: '18.18'
    },
    {
        id: 19,
        title: 'Товар-19',
        img: ['19A.jpg', '19B.jpg'],
        imgMacro: ['19AM.jpg'],
        desc: 'Описание-19',
        category: 'c1',
        price: '19.19'
    },
    {
        id: 20,
        title: 'Товар-20',
        img: ['20A.jpg', '20B.jpg'],
        imgMacro: ['20AM.jpg'],
        desc: 'Описание-20',
        category: 'c4',
        price: '20.20'
    },
    {
        id: 21,
        title: 'Товар-21',
        img: ['21A.jpg', '21B.jpg'],
        imgMacro: ['21AM.jpg'],
        desc: 'Описание-21',
        category: 'c3',
        price: '21.21'
    },
    {
        id: 22,
        title: 'Товар-22',
        img: ['22A.jpg', '22B.jpg'],
        imgMacro: ['22AM.jpg'],
        desc: 'Описание-22',
        category: 'c1',
        price: '22.22'
    },
    {
        id: 23,
        title: 'Товар-23',
        img: ['23A.jpg', '23B.jpg'],
        imgMacro: ['23AM.jpg'],
        desc: 'Описание-23',
        category: 'c2',
        price: '23.23'
    },
    {
        id: 24,
        title: 'Товар-24',
        img: ['24A.jpg', '24B.jpg'],
        imgMacro: ['24AM.jpg'],
        desc: 'Описание-24',
        category: 'c1',
        price: '24.24'
    },
    {
        id: 25,
        title: 'Товар-25',
        img: ['25A.jpg', '25B.jpg'],
        imgMacro: ['25AM.jpg'],
        desc: 'Описание-25',
        category: 'c1',
        price: '25.25'
    },
    {
        id: 26,
        title: 'Товар-26',
        img: ['26A.jpg', '26B.jpg'],
        imgMacro: ['26AM.jpg'],
        desc: 'Описание-26',
        category: 'c1',
        price: '26.26'
    },
]

export default items