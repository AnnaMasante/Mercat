import {Product} from "./Product";
import {Address} from "./Address";

export type Client = {
    _id : string
    firstname: string
    lastname: string
    addresses: Address[]
    mail: string
    favorites: Product[]
}
