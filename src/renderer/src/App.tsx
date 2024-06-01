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
      <RootLayout>
        <Sidebar className="p-2">
          <ActionButtonRow className="flex justify-between mt-1" />
          <NotePreviewList className="mt-3 space-y-1" onSelect={resetScroll} />
        </Sidebar>
        <Content ref={ref} className="border-l bg-zinc-900/50 border-l-white/20">
          <FloatingNoteTitle className="pt-2" />
          <MarkdownEditor />
        </Content>
      </RootLayout>
    </>
  )
}

export default App
