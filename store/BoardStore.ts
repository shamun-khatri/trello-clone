import { databases } from '@/appwrite';
import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedByColumn';
import { create } from 'zustand'

interface BoardState{
    board: Board;
    getBoard: () => void;
    setBoardState: (board: Board) => void;
    updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
    newTaskInput: string;
    newTaskType: TypedColumn;

    searchString: string;
    setSearchString: (searchString: string) => void;

    setNewTaskInput: (input: string) => void;
    setNewTaskType: (columnId: TypedColumn) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  board: {
    columns: new Map<TypedColumn, Column>(),
  },

  searchString: '',
  newTaskInput: '',
  newTaskType: 'todo',
  
  setSearchString: (searchString) => set({searchString}),

  getBoard: async() => {
        const board = await getTodosGroupedByColumn();
        set({board});
  },

  setBoardState: (board) => set({ board }),

  setNewTaskInput: (input: string) => set({newTaskInput: input}),

  setNewTaskType: (columnId: TypedColumn) => set({newTaskType: columnId}),

  updateTodoInDB: async (todo, columnId) => {
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id,
      {
        title: todo.title,
        status: columnId,
      }
    );
  },

}))

