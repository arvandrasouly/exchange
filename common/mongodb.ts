import {MongoClient} from "mongodb";

export default function mongodb(cb) {
    MongoClient.connect('mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}', (err, client) => {
        if (err) throw err
        const db = client.db(process.env.DB_DATABASE)

        cb()
    })
}