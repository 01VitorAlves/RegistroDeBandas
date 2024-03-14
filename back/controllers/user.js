import  {db} from "../db.js";

export const getBandas = (_, res) => {
    const q = "SELECT * FROM bandas";


    db.query (q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};