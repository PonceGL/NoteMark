import { homedir } from 'os'
import { APP_DIR_NAME, FILE_ENCODING, WELCOME_NOTE_FILE_NAME } from '../../../shared/constants'
import { ContentNote, NoteInfo } from '../../../shared/types'
import { ensureDir, readFile, readdir, remove, stat, writeFile } from 'fs-extra'
import { newUUID } from '../../../shared/utils'
import { dialog } from 'electron'
import path from 'path'
import welcomeNote from '../../../../resources/welcomeNote.md?asset'

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

  if (notes.length === 0) {
    const content = await readFile(welcomeNote, { encoding: FILE_ENCODING })
    await writeFile(`${rootDir}/${WELCOME_NOTE_FILE_NAME}.md`, content, { encoding: FILE_ENCODING })
    notes.push(`${WELCOME_NOTE_FILE_NAME}.md`)
  }

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

export async function writeNote(fileName: string, content: ContentNote): Promise<void> {
  const rootDir = getRootDir()

  writeFile(`${rootDir}/${fileName}.md`, content, { encoding: FILE_ENCODING })
}

export async function createNote(): Promise<string | false> {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'Create a new note',
    defaultPath: `${rootDir}/untitled.md`,
    buttonLabel: 'Create',
    properties: ['showOverwriteConfirmation'],
    showsTagField: false,
    filters: [{ name: 'Markdown', extensions: ['md'] }]
  })

  if (canceled || !filePath) {
    console.info('User canceled creating a new note')
    return false
  }

  const { name: fileName, dir: parentDir } = path.parse(filePath)

  if (parentDir !== rootDir) {
    await dialog.showMessageBox({
      type: 'error',
      title: 'Creation failed',
      message: `All notes must be saved under ${rootDir} directory.`
    })

    return false
  }

  console.info(`Creating a new note: ${fileName}.md`)
  await writeFile(filePath, '')
  return fileName
}

export async function deleteNote(fileName: string): Promise<boolean> {
  const rootDir = getRootDir()
  const filePath = `${rootDir}/${fileName}.md`

  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: 'Delete note',
    message: `Are you sure you want to delete ${fileName}?`,
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
