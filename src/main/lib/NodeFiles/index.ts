import { homedir } from 'os'
import { APP_DIR_NAME, FILE_ENCODING } from '../../../shared/constants'
import { ContentNote, NoteInfo } from '../../../shared/types'
import { ensureDir, readFile, readdir, stat, writeFile } from 'fs-extra'
import { newUUID } from '../../../shared/utils'
import { dialog } from 'electron'
import path from 'path'

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

export async function writeNote(fileName: string, content: ContentNote): Promise<void> {
  const rootDir = getRootDir()
  console.info(`Writing note to ${fileName}.md`)

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
