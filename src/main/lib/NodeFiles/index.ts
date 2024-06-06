import { homedir } from 'os'
import { APP_DIR_NAME, FILE_ENCODING, WELCOME_NOTE_FILE_NAME } from '../../../shared/constants'
import { ContentNote, NoteInfo } from '../../../shared/types'
import { ensureDir, readFile, readdir, remove, stat, writeFile } from 'fs-extra'
import { dialog } from 'electron'
import welcomeNote from '../../../../resources/welcomeNote.md?asset'
import { getTitle, newUUID } from '../../../shared/utils'

export function getRootDir(): string {
  return `${homedir()}/${APP_DIR_NAME}/notes`
}

export async function getNotes(): Promise<NoteInfo[]> {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const notesFileNames = await readdir(rootDir, {
    encoding: FILE_ENCODING,
    withFileTypes: false
  })

  const notes = notesFileNames.filter((fileName) => fileName.endsWith('.md'))

  if (notes.length === 0) {
    const content = await readFile(welcomeNote, { encoding: FILE_ENCODING })
    await writeFile(`${rootDir}/${WELCOME_NOTE_FILE_NAME}.md`, content, { encoding: FILE_ENCODING })
    notes.push(`${WELCOME_NOTE_FILE_NAME}.md`)
  }

  return Promise.all(notes.map(getNoteInfoFromFileName))
}

export async function getNoteInfoFromFileName(id: string): Promise<NoteInfo> {
  const content = await readNote(id)
  const title = getTitle(content)
  const fileStats = await stat(`${getRootDir()}/${id}`)

  const info: NoteInfo = {
    id: id,
    title: title,
    lastEditTime: fileStats.mtimeMs
  }

  return info
}

export async function readNote(id: string): Promise<string> {
  const rootDir = getRootDir()
  return await readFile(`${rootDir}/${id}`, { encoding: FILE_ENCODING })
}

export async function writeNote(id: string, content: ContentNote): Promise<void> {
  const rootDir = getRootDir()

  writeFile(`${rootDir}/${id}`, content, { encoding: FILE_ENCODING })
}

export async function createNote(): Promise<string | false> {
  const rootDir = getRootDir()

  await ensureDir(rootDir)
  const id = newUUID()
  const filePath = `${rootDir}/${id}.md`
  console.info(`Creating a new note: ${id}`)
  await writeFile(filePath, '')
  return `${id}.md`
}

export async function deleteNote(id: string): Promise<boolean> {
  const rootDir = getRootDir()
  const filePath = `${rootDir}/${id}`
  const content = await readNote(id)
  const title = getTitle(content)

  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: 'Delete note',
    message: `Are you sure you want to delete ${title}?`,
    buttons: ['Delete', 'Cancel'], // 0 is Delete, 1 is Cancel
    defaultId: 1,
    cancelId: 1
  })

  if (response === 1) {
    console.info('User canceled deleting the note')
    return false
  }

  await remove(filePath)
  return true
}
