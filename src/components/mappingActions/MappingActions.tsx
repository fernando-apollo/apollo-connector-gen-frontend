import IconCopy from '@apollo/icons/default/IconCopy.svg?react';
import { Button } from '@components/Button';
import { Tooltip } from '@components/Tooltip';
import copy from 'copy-to-clipboard';
import * as monacoEditor from 'monaco-editor';
import { useEffect, useState } from 'react';

export const GeneratedCodeActions = ({
  editor,
}: {
  editor: monacoEditor.editor.IStandaloneCodeEditor;
}) => {
  const [shouldPromptCopySuccess, setShouldPromptCopySuccess] = useState(false);

  useEffect(() => {
    if (shouldPromptCopySuccess) {
      const timeout = setTimeout(() => {
        setShouldPromptCopySuccess(false);
      }, 1_000);
      return () => clearTimeout(timeout);
    }
  }, [shouldPromptCopySuccess]);

  return (
    <>
      <Tooltip
        content={
          shouldPromptCopySuccess
            ? 'Copied! 🎉'
            : 'Copy current mapping to clipboard'
        }
      >
        <Button
          size='sm'
          variant='secondary'
          onClick={() => {
            copy(editor.getValue());
            setShouldPromptCopySuccess(true);
          }}
          icon={<IconCopy />}
        />
      </Tooltip>
    </>
  );
};
