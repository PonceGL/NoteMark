import {
  KitchenSinkToolbar,
  MDXEditor,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  frontmatterPlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin
} from '@mdxeditor/editor'
import { useMarkdownEditor } from '../../hooks'

export const MarkdownEditor = (): JSX.Element | null => {
  const { selectedNote, editorRef, handleAutoSaving, handleBlur } = useMarkdownEditor()

  return (
    <MDXEditor
      key={selectedNote?.id ?? 'new'}
      ref={editorRef}
      markdown={selectedNote?.content ?? 'Create a new note to get started!'}
      onChange={handleAutoSaving}
      onBlur={handleBlur}
      plugins={[
        toolbarPlugin({ toolbarContents: () => <KitchenSinkToolbar /> }),
        listsPlugin(),
        quotePlugin(),
        headingsPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        imagePlugin(),
        tablePlugin(),
        thematicBreakPlugin(),
        frontmatterPlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
        codeMirrorPlugin({
          codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'text', tsx: 'TypeScript' }
        }),
        diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: 'boo' }),
        markdownShortcutPlugin()
      ]}
      contentEditableClassName="outline-none min-h-screen max-w-none text-lg px-8 py-5 caret-yellow-500 prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-['']"
    />
  )
}
