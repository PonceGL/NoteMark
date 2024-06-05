export type NoteInfo = {
  id: string
  title: string
  lastEditTime: number
}

export type ContentNote = string

export type GetNotes = () => Promise<NoteInfo[]>

export type ReadNote = (fileName: NoteInfo['title']) => Promise<string>

export type WriteNote = (fileName: NoteInfo['title'], content: ContentNote) => Promise<void>

export type CreateNote = () => Promise<string | false>

export type DeleteNote = (fileName: NoteInfo['title']) => Promise<boolean>