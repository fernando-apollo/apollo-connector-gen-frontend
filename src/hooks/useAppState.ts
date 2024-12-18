import { Key, useState } from 'react';

import { Answers, Node, ResponseItem, TreeData, UploadInfo } from 'types/utils';
import { CheckInfo } from 'rc-tree/lib/Tree';

import axios from 'axios';

// export const PlaygroundResultsTabs = ['Obtained', 'Desired'] as const;
// export type PlaygroundResultsTab = (typeof PlaygroundResultsTabs)[number];

const baseUrl = 'http://localhost:8080';

export const useAppState = () => {
  const [uploadInfo, setUploadInfo] = useState<UploadInfo | null>(null);
  const [treeData, setTreeData] = useState<TreeData>([]);
  const [generated, setGenerated] = useState<string | undefined>('');
  const [checkedKeys, setCheckedKeys] = useState<Key[]>([]);

  // TODO: Do we want to persist these in our local storage?
  // const inputEditor = useMonacoEditor({
  //   language: 'json',
  // });

  // const inputModel = useEditorModel(inputEditor);
  const onCheck = (checked: Key[], info: CheckInfo<TreeDataType>): void => {
    console.log('onCheck', checked, info);
    setCheckedKeys([
      ...info.checkedNodes.map((n) => n.key),
      ...info.halfCheckedKeys,
    ]);
  };

  const generateAnswers = (
    treeData: TreeData,
    checkedKeys: Key[],
    answers: Answers
  ) => {
    treeData.forEach((r) => {
      const key = r.key.replaceAll('#/components/schemas', '#/c/s');
      const id = r.key.substring(r.key.lastIndexOf('>') + 1);
      // console.log('r', id);

      if (checkedKeys.includes(r.key)) {
        if (id.startsWith('obj:') || id.startsWith('comp:')) {
          answers[key] = 's';
        } else {
          //if (!id.startsWith('ref:') && !id.startsWith('prop:ref:')) {
          answers[key] = 'y';
        }
      } else {
        // do nothing
        // answers.push('"n" #' + id);
        answers[key] = 'n';
      }

      if (r.children) {
        generateAnswers(r.children, checkedKeys, answers);
      }
    });
  };

  const findNode = (
    items: Node[] | undefined,
    key: string
  ): Node | undefined => {
    if (!items) {
      return;
    }

    for (const item of items) {
      if (item.key === key) {
        return item;
      }

      // Test children recursively
      const child: Node | undefined = findNode(item.children, key);
      if (child) {
        return child;
      }
    }
  };

  const onLoadData = async ({ title, key, isLeaf }: Node) => {
    console.log('load data...', key);

    const newTreeData: TreeData = [...treeData];

    const root = findNode(newTreeData, key);
    console.log('root', root);

    let url = '';
    if (!root!.parent) {
      // we are in a path
      url = `${baseUrl}/visit/${uploadInfo!.md5}/path?id=${encodeURIComponent(
        key
      )}`;
    } else {
      url = `${baseUrl}/visit/${uploadInfo!.md5}/type?id=${encodeURIComponent(
        key
      )}&p=${encodeURIComponent(root!.parent!.title)}`;
    }

    const response = await axios.get(url);
    if (response.status === 200) {
      console.log('response', response.data);

      const items = Array.isArray(response.data.result)
        ? response.data.result
        : [response.data.result];

      items.forEach((item: ResponseItem, index: number) => {
        const newNode: Node = createNode(item, root);

        if (root) {
          root.isLeaf = false;
          if (root.children) {
            root.children.push(newNode);
          } else {
            root.children = [newNode];
          }
        }
      });

      console.log('newTreeData', newTreeData);
      setTreeData(newTreeData);
    }
  };

  const formatTitle = (item: ResponseItem): string => {
    if (item.value !== '') return item.value;

    const isScalar = item.id.startsWith('prop:scalar');
    if (isScalar) return item.name + ': ' + item.value;

    const isRef = item.id.startsWith('ref:') || item.id.startsWith('prop:ref');
    // const isObject = item.id.startsWith('obj:');
    if (isRef) return 'ref: ' + item.name;

    const isArray =
      item.id.startsWith('array:') || item.id.startsWith('prop:array:');

    if (isArray) {
      console.log('isArray', item.id);
      return '[' + item.id.replace('prop:array:', '') + ']';
    }

    if (item.id === 'res:r') {
      return 'Response';
    }

    return item.id;
  };

  const createNode = (item: ResponseItem, root: Node | undefined): Node => {
    const isScalar = item.id.startsWith('prop:scalar');

    const result = {
      title: formatTitle(item),
      key: item.path, // (root?.key || '<root>') + '>' + item.id,
      isLeaf: isScalar,
      // disableCheckbox: !isScalar,
      parent: root,
    };

    console.log('result', result);
    return result;
  };

  const onGenerateAnswers = async () => {
    setGenerated(undefined);
    const answers: Answers = {};
    generateAnswers(treeData, checkedKeys, answers);

    console.log('generate', JSON.stringify(answers, null, 2));

    const response = await axios.post(
      `${baseUrl}/visit/${uploadInfo!.md5}/generate`,
      answers,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.status === 200) {
      console.log('response', response.data);
      return response.data.result;
    }
  };

  const checkCheckedKeys = (checkedKeys: Key[]) => {
    if (checkCheckedKeys.length === 0) return false;

    for (const key of checkedKeys) {
      const node = findNode(treeData, key as string);
      if (node && node.isLeaf) {
        return true;
      }
    }

    // debugger;
    return false;
  };

  return {
    uploadInfo,
    setUploadInfo,
    treeData,
    setTreeData,
    onLoadData,
    onCheck,
    generated,
    setGenerated,
    checkedKeys,
    generateAnswers,
    onGenerateAnswers,
    checkCheckedKeys,
  };
};
