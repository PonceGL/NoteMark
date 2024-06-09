import {
  Content,
  RootLayout,
  Sidebar,
  DraggableTopBar,
  ActionButtonRow,
  NotePreviewList,
  MarkdownEditor,
  FloatingNoteTitle
} from './components'
import { useResetScroll } from './hooks'

function App(): JSX.Element {
  const { ref, resetScroll } = useResetScroll()

  return (
    <>
      <DraggableTopBar />
      <RootLayout className="bg-zinc-100/50 dark:bg-zinc-900/50 text-zinc-800 dark:text-zinc-200 transition-colors duration-200">
        <Sidebar className="p-2">
          <ActionButtonRow className="flex justify-between mt-1" />
          <NotePreviewList className="mt-3 space-y-1" onSelect={resetScroll} />
        </Sidebar>
        <Content
          ref={ref}
          className="border-l border-l-black/20 dark:border-l-white/20 transition-colors duration-200"
        >
          <FloatingNoteTitle className="pt-2" />
          <MarkdownEditor />
        </Content>
      </RootLayout>
    </>
  )
}

export default App
