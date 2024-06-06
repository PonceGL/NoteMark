export type NoteInfo = {
  id: string
  title: string
  lastEditTime: number
}

export type ContentNote = string

export type GetNotes = () => Promise<NoteInfo[]>

export type ReadNote = (id: NoteInfo['id']) => Promise<string>

export type WriteNote = (id: NoteInfo['id'], content: ContentNote) => Promise<void>

export type CreateNote = () => Promise<string | false>

export type DeleteNote = (id: NoteInfo['id']) => Promise<boolean>
