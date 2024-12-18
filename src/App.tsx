import FileUpload from '@components/fileUpload/FileUpload';
import { GlobalHeader } from '@components/globalHeader/GlobalHeader';
import { Panel } from '@components/panel/Panel';
import { Allotment } from 'allotment';
import { useAppState } from './hooks/useAppState';
import {
  MONACO_READONLY_OPTIONS,
  MonacoEditorContainer,
  useMonacoEditor,
} from './hooks/useMonacoEditor';
import { useRef } from 'react';
import { UploadInfo } from 'types/utils';
import Tree, { TreeNodeProps } from 'rc-tree';
import 'rc-tree/assets/index.css';
import { Button } from '@components/Button';
import { GeneratedCodeActions } from '@components/mappingActions/MappingActions';

import IconDocument from '@apollo/icons/default/IconDocument.svg?react';
import IconExpandList from '@apollo/icons/default/IconExpandList.svg?react';
import IconCollapseList from '@apollo/icons/default/IconCollapseList.svg?react';

function App() {
  const {
    uploadInfo,
    setUploadInfo,
    treeData,
    setTreeData,
    onLoadData,
    onCheck,
    checkedKeys,
    onGenerateAnswers,
    generated,
    setGenerated,
    checkCheckedKeys,
  } = useAppState();
  const treeRef = useRef<any>();

  const obtainedEditor = useMonacoEditor({
    language: 'json',
    defaultValue: '',
    ...MONACO_READONLY_OPTIONS,
  });

  const getIconFor = (data: TreeNodeProps) => {
    if (!data.isLeaf)
      return data.expanded ? (
        <IconExpandList style={{ color: '#15252d' }} />
      ) : (
        <IconCollapseList style={{ color: '#15252d' }} />
      );
    else return <IconDocument style={{ color: '#fc5200' }} />;
  };

  return (
    <div className='flex flex-col size-full'>
      <GlobalHeader />
      <Allotment>
        <Allotment.Pane>
          <Panel
            title='OAS/Swagger Input'
            description='The JSON to be transformed by the mapping'
          >
            <div className='flex flex-row'>
              <div className='flex-grow'>
                <FileUpload
                  onUpload={(info: UploadInfo): void => {
                    setUploadInfo(info);
                    console.log('File uploaded');
                    setTreeData([]);

                    const data = info.paths.map((path) => ({
                      title: path,
                      key: 'get:' + path,
                      isLeaf: false,
                    }));

                    setTreeData(data);
                    setGenerated(undefined);
                  }}
                />
              </div>

              <Button
                size='sm'
                variant='primary'
                disabled={!uploadInfo || !checkCheckedKeys(checkedKeys)}
                className='ml-2'
                onClick={async () => {
                  const generated = await onGenerateAnswers();
                  obtainedEditor.setValue(generated);
                }}
              >
                Generate
              </Button>
            </div>
            {treeData && (
              <Tree
                ref={treeRef}
                treeData={treeData}
                checkable
                selectable={false}
                loadData={onLoadData}
                onCheck={onCheck}
                onExpand={(expandedKeys) => {
                  console.log('expandedKeys', treeRef);
                  // debugger;
                }}
                icon={(props: TreeNodeProps) => {
                  // console.log('props', props);
                  return getIconFor(props);
                }}
              />
            )}
          </Panel>
        </Allotment.Pane>
        <Allotment.Pane>
          <Panel
            title='Connector Schema'
            description='Output'
            actions={<GeneratedCodeActions editor={obtainedEditor} />}
          >
            <MonacoEditorContainer
              className='size-full'
              editor={obtainedEditor}
            />
          </Panel>
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}

export default App;
