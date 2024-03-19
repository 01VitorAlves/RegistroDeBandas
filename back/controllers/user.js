import  {db} from "../db.js";

export const getBandas = (_, res) => {
    const q = "SELECT * FROM bandas";


    db.query (q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const addBanda = (req, res) => {
    const q = "INSERT INTO bandas(`nome`, `album`, `nota`, `data_conheceu`) VALUES(?)";

    const values = [
        req.body.nome,
        req.body.album,
        req.body.nota,
        req.body.data_conheceu,
    ];

    db.query(q, [values], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Banda registrada com sucesso.");
    });
};


export const editBanda = (req, res) => {
    const q = "UPDATE bandas SET `nome` = ?, `album` = ?, `nota` = ?, `data_conheceu` = ? WHERE `idBandas` = ?";

    const values = [
        req.body.nome,
        req.body.album,
        req.body.nota,
        req.body.data_conheceu,
    ];

    db.query(q, [...values, req.params.idBandas], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Banda atualizada com sucesso.");
    });
}; 


export const deleteBanda = (req, res) => {
    const q = "DELETE FROM bandas WHERE `idBandas` = ?";

   
    db.query(q, [req.params.idBandas], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Banda deletada com sucesso.");
    });
};