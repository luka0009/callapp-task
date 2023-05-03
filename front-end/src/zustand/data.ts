import { create } from 'zustand'
import { Data } from '../types'


interface DataState {
  data: Data[],
  addData: (newData: Data) => void,
  updateData: (id: number, updatedData: Partial<Data>) => void,
  deleteData: (id: number) => void,
}



const useDataStore = create<DataState>()((set) => ({
  data: [],
  addData: (newData) => set((state) => ({ data: [...state.data, newData] })),
  updateData: (id, updatedData) => set(state => ({
    data: state.data.map(item => {
      if (item.id === id) {
        return {
          ...item,
          ...updatedData
        }
      }
      return item
    })
  })),
  deleteData: (id) => set((state) => ({
    data: state.data.filter(item => item.id !== id)
  })),
}));

export default useDataStore;