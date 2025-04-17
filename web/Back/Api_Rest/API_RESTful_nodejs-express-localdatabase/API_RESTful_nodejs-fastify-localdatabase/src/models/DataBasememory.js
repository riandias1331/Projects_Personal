import { randomUUID } from 'node:crypto'

export class DataBsememory {
    #users = new Map()
    
    list(user){
        return this.#users.values()
    }

    create(user){
        const userId = randomUUID()

        this.#users.set(userId, user)

    }

    update(id, user){
        this.#users.set(id, user)
    }

    delete(id){
        this.#users.delete(id)
    }
}