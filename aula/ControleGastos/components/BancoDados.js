import * as SQLite from 'expo-sqlite';

const bcodados = SQLite.openDatabase('gastos.db');

export const BancoDados = () => {

    return new Promise((resolve, reject) => {
        
        bcodados.transaction((tx) => {
            tx.executeSql(`CREATE TABLE IF NOT EXISTS gastos 
            (id INTEGER PRIMARY KEY AUTOINCREMENT, 
            descricao TEXT NOT NULL, 
            valor REAL NOT NULL)`);
        },
        (err) => { reject (err) }, 
        () => { resolve("Banco de dados aberto com sucesso!") })

    });

}

export const inserir = (descricao, valor) => {
    return new Promise((resolve, reject) => {

        bcodados.transaction((tx) => {
            console.log(descricao);
            tx.executeSql(`INSERT INTO gastos(descricao, valor) VALUES ('` + descricao + `',` + valor + `)`,
                            [],
                            (_, res) => console.log(res),
                            (_, err) => console.log(err));
        }, 
        (err) => { reject (err) }, 
        () => { resolve("Inserido com sucesso!")});

    });
}

export const listar = () => {
    return new Promise((resolve, reject) => {
        bcodados.transaction((tx)=> {
            tx.executeSql(`SELECT * FROM gastos`, 
                            [], 
                            (_, res) => resolve(res.rows._array),
                            (_, err) => console.log(err));
        },
        (err) => { reject (err)}),
        () => {resolve()}
    })
}