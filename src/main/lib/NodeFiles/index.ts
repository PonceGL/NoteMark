import { homedir } from 'os'
import { APP_DIR_NAME, FILE_ENCODING } from '../../../shared/constants'
import { NoteInfo } from '../../../shared/types'
import { ensureDir, readFile, readdir, stat } from 'fs-extra'
import { newUUID } from '../../../shared/utils'

export function getRootDir(): string {
  return `${homedir()}/${APP_DIR_NAME}`
}

export async function getNotes(): Promise<NoteInfo[]> {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const notesFileNames = await readdir(rootDir, {
    encoding: FILE_ENCODING,
    withFileTypes: false
  })

  const notes = notesFileNames.filter((fileName) => fileName.endsWith('.md'))

  return Promise.all(notes.map(getNoteInfoFromFileName))
}

export async function getNoteInfoFromFileName(fileName: string): Promise<NoteInfo> {
  const fileStats = await stat(`${getRootDir()}/${fileName}`)

  const info: NoteInfo = {
    id: newUUID(),
    title: fileName.replace('.md', ''),
    lastEditTime: fileStats.mtimeMs
  }

  return info
}

export async function readNote(fileName: string): Promise<string> {
  const rootDir = getRootDir()
  return await readFile(`${rootDir}/${fileName}.md`, { encoding: FILE_ENCODING })
}
