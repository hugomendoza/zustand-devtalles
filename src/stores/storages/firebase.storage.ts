import { createJSONStorage, type StateStorage } from "zustand/middleware"

const firebaseUrl = "https://zustand-storage-f2471-default-rtdb.firebaseio.com/zustand"

const storageApi:StateStorage = {
  getItem: async function (name: string):Promise<string | null> {
    const data = await fetch(`${firebaseUrl}/${name}.json`).then(res => res.json())
    console.log(data)
    return JSON.stringify(data)
  },
  setItem: async function (name: string, value: string): Promise<void> {
    await fetch(`${firebaseUrl}/${name}.json`, {
      method: 'PUT',
      body: value
    }).then(res => res.json())
    return
  },
  removeItem: function (name: string): unknown | Promise<unknown> {
    console.log('removeItem', name)
    return null
  }
}

export const firebaseStorage =  createJSONStorage(() => storageApi)