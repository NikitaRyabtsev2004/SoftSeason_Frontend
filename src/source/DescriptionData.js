import category from "./CategoryData"
import wash from "./WashData.js"
import material from "./MaterialData.js"

const description = [
    [//0
    ],
    [//1
        <div style={{ alignItems: 'center', textAlign: 'right', fontSize: '24px' }}>
            <div>Категория: {category[1]}</div>
            <div>Тип волокна: {material[1]}</div>
            <div>Размер: 46-48</div>
            <div>Длина: 65 см</div>
            <div>Ширина: 57 см </div>
            <div>Рукав: - </div>
            <div>Масса: 397 г </div>
            <div>{wash}</div>
        </div>
    ],
    [//2
        <div style={{ alignItems: 'center', textAlign: 'right', fontSize: '24px' }}>
            <div>Категория: {category[1]}</div>
            <div>Тип волокна: {material[2]}</div>
            <div>Размер: 48-52 </div>
            <div>Длина: 58 см </div>
            <div>Ширина: 60 см </div>
            <div>Рукав: - </div>
            <div>Масса: 867 г </div>
            <div>{wash}</div>
        </div>
    ],
    [//3
        <div style={{ alignItems: 'center', textAlign: 'right', fontSize: '24px' }}>
            <div>Категория: {category[1]}</div>
            <div>Тип волокна: {material[3]}</div>
            <div>Размер: 48-50</div>
            <div>Длина: 58 см </div>
            <div>Ширина: 61 см</div>
            <div>Рукав: - </div>
            <div>Масса: 480 г </div>
            <div>{wash}</div>
        </div>
    ],
    [//4
        <div style={{ alignItems: 'center', textAlign: 'right', fontSize: '24px' }}>
            <div>Категория: {category[7]} оверсайз</div>
            <div>Тип волокна: {material[4]}</div>
            <div>Размер: 46-54</div>
            <div>Длина: 66 см</div>
            <div>Ширина: 74 см</div>
            <div>Рукав: 39 см (от проймы)</div>
            <div>Масса: 653 г</div>
            <div>{wash}</div>
        </div>
    ],
    [//5
        <div style={{ alignItems: 'center', textAlign: 'right', fontSize: '24px' }}>
            <div>Категория: {category[2]}</div>
            <div>Тип волокна: {material[3]}</div>
            <div>Размер: 46-50 </div>
            <div>Длина: 61 см </div>
            <div>Ширина: 62 см</div>
            <div>Рукав: - </div>
            <div>Масса: 474 г </div>
            <div>{wash}</div>
        </div>
    ],
    [//6
        <div style={{ alignItems: 'center', textAlign: 'right', fontSize: '24px' }}>
            <div>Категория: {category[2]}</div>
            <div>Тип волокна: {material[1]},{material[5]}</div>
            <div>Размер: 46-52 </div>
            <div>Длина: 64 см </div>
            <div>Ширина: 59 см </div>
            <div>Рукав: 30 см (от проймы), 3/4 </div>
            <div>Масса: 635 г </div>
            <div>{wash}</div>
        </div>
    ],
    [//7
        <div style={{ alignItems: 'center', textAlign: 'right', fontSize: '24px' }}>
            <div>Категория: {category[2]}</div>
            <div>Тип волокна: {material[1]}</div>
            <div>Размер: 36-50 </div>
            <div>Длина: 57 см </div>
            <div>Ширина: 58 см </div>
            <div>Рукав: - </div>
            <div>Масса: 525 г</div>
            <div>{wash}</div>
        </div>
    ],
    [//8
        <div style={{ alignItems: 'center', textAlign: 'right', fontSize: '24px' }}>
            <div>Категория: {category[2]}</div>
            <div>Тип волокна: {material[6]},{material[7]}</div>
            <div>Размер: 46-48</div>
            <div>Длина: 63 см </div>
            <div>Ширина: 53 см</div>
            <div>Рукав: - </div>
            <div>Масса:523 г </div>
            <div>{wash}</div>
        </div>
    ],
    [//9
        <div style={{ alignItems: 'center', textAlign: 'right', fontSize: '24px' }}>
            <div>Категория: {category[8]}</div>
            <div>Тип волокна: {material[5]}, {material[8]}</div>
            <div>Размер: 46-50 </div>
            <div>Длина: Перед-58 см, Спина-67 см</div>
            <div>Ширина: - </div>
            <div>Рукав: - </div>
            <div>Масса: 672 г</div>
            <div>{wash}</div>
        </div>
    ],
    [//10
        <div style={{ alignItems: 'center', textAlign: 'right', fontSize: '24px' }}>
            <div>Категория: {category[2]}</div>
            <div>Тип волокна: {material[8]}</div>
            <div>Размер: 44-48 </div>
            <div>Длина: 62 см</div>
            <div>Ширина: 56 см</div>
            <div>Рукав: - </div>
            <div>Масса: 377 г</div>
            <div>{wash}</div>
        </div>
    ],
    [//11
        <div style={{ alignItems: 'center', textAlign: 'right', fontSize: '24px' }}>
            <div>Категория: {category[2]}</div>
            <div>Тип волокна: {material[5]} </div>
            <div>Размер: 44-50 </div>
            <div>Длина: 61 см </div>
            <div>Ширина: 62 см </div>
            <div>Рукав: - </div>
            <div>Масса: 396 г</div>
            <div>{wash}</div>
        </div>
    ],
    [//12
        <div style={{ alignItems: 'center', textAlign: 'right', fontSize: '24px' }}>
            <div>Категория: {category[2]}</div>
            <div>Тип волокна: {material[7]} </div>
            <div>Размер: 44-52 </div>
            <div>Длина: 76 см </div>
            <div>Ширина: 60 см </div>
            <div>Рукав: - </div>
            <div>Масса: 589 г</div>
            <div>{wash}</div>
        </div>
    ],
    [//13
        <div style={{ alignItems: 'center', textAlign: 'right', fontSize: '24px' }}>
            <div>Категория: {category[1]}</div>
            <div>Тип волокна: {material[9]}</div>
            <div>Размер: 44-48 </div>
            <div>Длина: 65 см </div>
            <div>Ширина: 53 см </div>
            <div>Рукав: - </div>
            <div>Масса: 462 г </div>
            <div>{wash}</div>
        </div>
    ],
    [//14
        <div style={{ alignItems: 'center', textAlign: 'right', fontSize: '24px' }}>
            <div>Категория: {category[1]}</div>
            <div>Тип волокна: {material[8]}</div>
            <div>Размер: 46-48 </div>
            <div>Длина: 58 см </div>
            <div>Ширина: 53 см </div>
            <div>Рукав: - </div>
            <div>Масса: 850 г </div>
            <div>{wash}</div>
        </div>
    ],
    [//15
        <div style={{ alignItems: 'center', textAlign: 'right', fontSize: '24px' }}>
            <div>Категория: {category[1]} оверсайз</div>
            <div>Тип волокна: {material[6]}</div>
            <div>Размер: 44-52 </div>
            <div>Длина: 58 см </div>
            <div>Ширина: 68 см</div>
            <div>Рукав: - </div>
            <div>Масса: 311 г</div>
            <div>{wash}</div>
        </div>
    ],
    [//16
        <div style={{ alignItems: 'center', textAlign: 'right', fontSize: '24px' }}>
            <div>Категория: {category[6]}</div>
            <div>Тип волокна: {material[8]} </div>
            <div>Размер: 46-50 </div>
            <div>Длина: 55 см</div>
            <div>Ширина: 54 см </div>
            <div>Рукав: - </div>
            <div>Масса: 547 г </div>
            <div>{wash}</div>
        </div>
    ],
    [//17
        <div style={{ alignItems: 'center', textAlign: 'right', fontSize: '24px' }}>
            <div>Категория: {category[1]}</div>
            <div>Тип волокна: {material[8]}</div>
            <div>Размер: 44-46 </div>
            <div>Длина: 57 см</div>
            <div>Ширина: 52 см </div>
            <div>Рукав: - </div>
            <div>Масса: 592 г </div>
            <div>{wash}</div>
        </div>
    ],
    [//18
        <div style={{ alignItems: 'center', textAlign: 'right', fontSize: '24px' }}>
            <div>Категория: {category[8]}</div>
            <div>Тип волокна: {material[10]}</div>
            <div>Размер: 46-48 </div>
            <div>Длина: 63 см</div>
            <div>Ширина: 57 см </div>
            <div>Рукав: - </div>
            <div>Масса: 378 г </div>
            <div>{wash}</div>
        </div>
    ],
    [//19
        <div style={{ alignItems: 'center', textAlign: 'right', fontSize: '24px' }}>
            <div>Категория: {category[2]}</div>
            <div>Тип волокна: {material[10]}</div>
            <div>Размер: 48-50</div>
            <div>Длина: 68 см</div>
            <div>Ширина: 59 см</div>
            <div>Рукав: 45 см (от проймы)</div>
            <div>Масса: 529 г </div>
            <div>{wash}</div>
        </div>
    ],
    [//20
        <div style={{ alignItems: 'center', textAlign: 'right', fontSize: '24px' }}>
            <div>Категория: {category[6]}</div>
            <div>Тип волокна: {material[5]}, {material[8]}</div>
            <div>Размер: 48-52</div>
            <div>Длина: 77см (от плеча)</div>
            <div>Ширина: - </div>
            <div>Рукав: - </div>
            <div>Масса: 496г</div>
            <div>{wash}</div>
        </div>
    ],
    [//21
        <div style={{ alignItems: 'center', textAlign: 'right', fontSize: '24px' }}>
            <div>Категория: {category[6]}</div>
            <div>Тип волокна: {material[8]}</div>
            <div>Размер: 48-50</div>
            <div>Длина: 54 см</div>
            <div>Ширина: 53 см</div>
            <div>Рукав: - </div>
            <div>Масса: 365 г </div>
            <div>{wash}</div>
        </div>
    ],
    [//22
        <div style={{ alignItems: 'center', textAlign: 'right', fontSize: '24px' }}>
            <div>Категория: {category[1]}</div>
            <div>Тип волокна: {material[5]}, {material[8]}, {material[11]}</div>
            <div>Размер: 42-44 </div>
            <div>Длина: 51 см</div>
            <div>Ширина: 48 см </div>
            <div>Рукав: 35 см (от проймы)</div>
            <div>Масса:675 г</div>
            <div>{wash}</div>
        </div>
    ],
    [//23
        <div style={{ alignItems: 'center', textAlign: 'right', fontSize: '24px' }}>
            <div>Категория: {category[1]} оверсайз </div>
            <div>Тип волокна: {material[8]}</div>
            <div>Размер: 42-50 </div>
            <div>Длина: 47 см</div>
            <div>Ширина: 76 см</div>
            <div>Рукав: - </div>
            <div>Масса: 322 г</div>
            <div>{wash}</div>
        </div>
    ],
    [//24
        <div style={{ alignItems: 'center', textAlign: 'right', fontSize: '24px' }}>
            <div>Категория: {category[8]}</div>
            <div>Тип волокна: {material[3]} </div>
            <div>Размер: 46-48</div>
            <div>Длина: 60 см </div>
            <div>Ширина: 53 см</div>
            <div>Рукав: - </div>
            <div>Масса: 545 г</div>
            <div>{wash}</div>
        </div>
    ],
    [//25
        <div style={{ alignItems: 'center', textAlign: 'right', fontSize: '24px' }}>
            <div>Категория: {category[1]}</div>
            <div>Тип волокна: {material[6]} </div>
            <div>Размер: 42-46 </div>
            <div>Длина: 67 см</div>
            <div>Ширина: 52см </div>
            <div>Рукав: - </div>
            <div>Масса: 240 г</div>
            <div>{wash}</div>
        </div>
    ],
    [//26
        <div style={{ alignItems: 'center', textAlign: 'right', fontSize: '24px' }}>
            <div>Категория: {category[1]}</div>
            <div>Тип волокна: {material[10]}</div>
            <div>Размер: 44-48 </div>
            <div>Длина: 60 см</div>
            <div>Ширина: 64 см </div>
            <div>Рукав: - </div>
            <div>Масса: 453 г</div>
            <div>{wash}</div>
        </div>
    ],
    [//27
        <div style={{ alignItems: 'center', textAlign: 'right', fontSize: '24px' }}>
            <div>Категория: {category[1]}</div>
            <div>Тип волокна: {material[8]}</div>
            <div>Размер: 46-48</div>
            <div>Длина: 52 см</div>
            <div>Ширина: 52 см</div>
            <div>Рукав: 42 см (от проймы)</div>
            <div>Масса: 813 г</div>
            <div>{wash}</div>
        </div>
    ],
    [//28
        <div style={{ alignItems: 'center', textAlign: 'right', fontSize: '24px' }}>
            <div>Категория: {category[1]}</div>
            <div>Тип волокна: {material[4]}</div>
            <div>Размер: 44-46</div>
            <div>Длина: 57 см (от ворота)</div>
            <div>Ширина: 49 см</div>
            <div>Рукав: 28 см (от проймы), 3/4 </div>
            <div>Масса: 360 г</div>
            <div>{wash}</div>
        </div>
    ],
    [//29
        <div style={{ alignItems: 'center', textAlign: 'right', fontSize: '24px' }}>
            <div>Категория: {category[1]}</div>
            <div>Тип волокна: {material[8]}</div>
            <div>Размер: 48-50</div>
            <div>Длина: 54 см (от ворота)</div>
            <div>Ширина: 55 см</div>
            <div>Рукав: 28 см (от проймы), 3/4 </div>
            <div>Масса: 435 г</div>
            <div>{wash}</div>
        </div>
    ],
    [//30
        <div style={{ alignItems: 'center', textAlign: 'right', fontSize: '24px' }}>
            <div>Категория: {category[1]}</div>
            <div>Тип волокна: {material[4]}</div>
            <div>Размер: 48-52 </div>
            <div>Длина: 58 см</div>
            <div>Ширина: 56 см</div>
            <div>Рукав: 30 см (от проймы), 3/4 </div>
            <div>Масса: 765 г</div>
            <div>{wash}</div>
        </div>
    ],
    [//31
        <div style={{ alignItems: 'center', textAlign: 'right', fontSize: '24px' }}>
            <div>Категория: {category[1]}</div>
            <div>Тип волокна: {material[5]}, {material[8]}</div>
            <div>Размер: 44-46 </div>
            <div>Длина: 54 см</div>
            <div>Ширина: 53 см </div>
            <div>Рукав: 39 см (от проймы)</div>
            <div>Масса: 543 г</div>
            <div>{wash}</div>
        </div>
    ],
]

export default description