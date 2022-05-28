import express, {Request, Response} from "express"

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  res.send('Helllllooo')
})

// Health check routes
router.get("/status", (req: Request, res: Response)  => {
  res.status(200).end();
});

router.head("/status", (req: Request, res: Response)  => {
  res.status(200).end();
});

export default router