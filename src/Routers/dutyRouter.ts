import * as express from 'express';
import { Request, Response } from 'express';
import { DutyService } from '../Services/dutyService';

export class DutyRouter {

    constructor(private dutyService: DutyService) { }

    router() {
        const router = express.Router();
        router.get("", this.getDutyFullList);
        router.post("", this.postNewDuty);
        router.put("", this.updateDuty);
        router.delete("", this.deleteDuty)
        return router;
    }
    private getDutyFullList = async (req: Request, res: Response) => {
        let result = await this.dutyService.read()
        res.json({ result: result})
    }
    private postNewDuty = async (req: Request, res: Response) => {
        await this.dutyService.create(`${req.body.dutyName}`)
        res.json({ result: "CREATE OK" })
    }
    private updateDuty = async (req: Request,res: Response) => {
        await this.dutyService.update(`${req.query.dutyId}`, `${req.query.dutyName}`)
        res.json(({ result: "UPDATE OK" }))
    }
    private deleteDuty = async (req: Request,res: Response) => {
        await this.dutyService.delete(`${req.query.dutyId}`)
        res.json(({ result: "DELETE OK" }))

    }
}
