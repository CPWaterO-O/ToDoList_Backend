import * as dotenv from 'dotenv';
import { Pool, Client } from 'pg';
dotenv.config({ path: __dirname + '/.env' });

export class DutyService {
    pool: Pool;
    constructor() {
        this.pool = new Pool({
            database: process.env.DB_NAME,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: 5432,

        })
    }

    async create(dutyName: string) {
        // await this.client.connect()
        let res = await this.pool.query(`INSERT INTO "duties" ("duty_name") VALUES ($1)`,[dutyName]);
        console.log("RES", res)
        // await this.pool.end();
        return res;
    }

    async read() {
        // await this.pool.connect()
        let res = await this.pool.query('SELECT * FROM "duties" ORDER BY id DESC');
        // await this.pool.end();
        res.rows.map((targetDuty)=> {
            targetDuty.id = `${targetDuty.id}`

        })

        let transformedDuties = res.rows.reduce((acc, duty) => {
            acc.push({
              id: duty.id,
              name: duty.duty_name
            });
            return acc;
          }, []);
          

        return transformedDuties;
    }

    async update(dutyId: string, dutyName: string) {
        let res = await this.pool.query(`UPDATE "duties" set duty_name=($1) WHERE id=($2)`,[dutyName,Number(dutyId)]);
        return res
    }

    async delete(dutyId:string){
        let res = await this.pool.query(`DELETE FROM "duties" WHERE id=${Number(dutyId)}`)
        return res
    }
}
