// import { constants } from "buffer"
import db from "./db"
// import { car } from "./schema"

const getRentalsWithItCar = async() => {
    return await db.query.rental.findMany({
        with:{
            car:true
        }
    })
}

async function main() {
    const results = await getRentalsWithItCar()
    console.log("main results:",results)
}
main().catch((e) =>{
    console.log(e)
});