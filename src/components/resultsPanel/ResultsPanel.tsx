import { Tabs } from '@components/tabs/Tabs';
import * as monacoEditor from 'monaco-editor';

import { MonacoEditorContainer } from '../../hooks/useMonacoEditor';
import { PlaygroundResultsTab } from '../../hooks/useAppState';

export const ResultsPanel = ({
  obtainedEditor,
  desiredEditor,
  resultsTab,
  setResultsTab,
}: {
  obtainedEditor: monacoEditor.editor.IStandaloneCodeEditor;
  desiredEditor: monacoEditor.editor.IStandaloneCodeEditor;
  resultsTab: PlaygroundResultsTab;
  setResultsTab: React.Dispatch<React.SetStateAction<PlaygroundResultsTab>>;
}) => {
  return (
    <Tabs
      value={resultsTab}
      onChange={setResultsTab}
      className='flex-col space-y-4 size-full'
    >
      <Tabs.List className='w-full'>
        <Tabs.Trigger value='Obtained'>Obtained</Tabs.Trigger>
        <Tabs.Trigger value='Desired'>Desired</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value='Obtained' className='size-full'>
        <MonacoEditorContainer className='size-full' editor={obtainedEditor} />
      </Tabs.Content>
      <Tabs.Content value='Desired' className='size-full'>
        <MonacoEditorContainer className='size-full' editor={desiredEditor} />
      </Tabs.Content>
    </Tabs>
  );
};
