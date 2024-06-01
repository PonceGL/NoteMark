export type NoteInfo = {
  id: string
  title: string
  lastEditTime: number
}

export type ContentNote = string

export type GetNotes = () => Promise<NoteInfo[]>

export type ReadNote = (fileName: string) => Promise<string>
