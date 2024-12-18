import { Key, useState } from 'react';

import { Answers, Node, ResponseItem, TreeData, UploadInfo } from 'types/utils';
import { CheckInfo } from 'rc-tree/lib/Tree';

import axios from 'axios';

// export const PlaygroundResultsTabs = ['Obtained', 'Desired'] as const;
// export type PlaygroundResultsTab = (typeof PlaygroundResultsTabs)[number];

const baseUrl = 'http://localhost:8080';

type CheckedProps = {
  checked: Key[];
  halfChecked: Key[];
};

export const useAppState = () => {
  const [uploadInfo, setUploadInfo] = useState<UploadInfo | null>(null);
  const [treeData, setTreeData] = useState<TreeData>([]);
  const [generated, setGenerated] = useState<string | undefined>('');
  const [checkedKeys, setCheckedKeys] = useState<CheckedProps>({
    checked: [],
    halfChecked: [],
  });
  const [loadedKeys, setLoadedKeys] = useState<Key[]>([]);

  // TODO: Do we want to persist these in our local storage?
  // const inputEditor = useMonacoEditor({
  //   language: 'json',
  // });

  // const inputModel = useEditorModel(inputEditor);
  const onCheck = (values: CheckedProps): void => {
    const set = new Set<string>();

    // add all the parent nodes from the checked nodes
    // needed for the backend to generate the answers
    values.checked
      .map((p) => findNode(treeData, p as string))
      .forEach((n: Node | undefined) => {
        let p = n;
        while ((p = p?.parent)) {
          set.add(p.key);
        }
      });

    setCheckedKeys({
      checked: [...values.checked, ...set],
      halfChecked: values.halfChecked,
    });
  };

  const generateAnswers = (
    treeData: TreeData,
    checkedKeys: Key[],
    answers: Answers
  ) => {
    treeData.forEach((r) => {
      const key = r.key.replaceAll('#/components/schemas', '#/c/s');
      const id = r.key.substring(r.key.lastIndexOf('>') + 1);

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
    const newTreeData: TreeData = [...treeData];
    const root = findNode(newTreeData, key);

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

      setTreeData(newTreeData);
    }
  };

  const formatTitle = (item: ResponseItem): string => {
    if (item.value !== '') return item.value;

    const isScalar = item.id.startsWith('prop:scalar');
    if (isScalar) return item.name + ': ' + item.value;

    const isRef = item.id.startsWith('ref:') || item.id.startsWith('prop:ref');
    if (isRef) return 'ref: ' + item.name;

    const isArray =
      item.id.startsWith('array:') || item.id.startsWith('prop:array:');

    if (isArray) {
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
      disableCheckbox: !isScalar,
      parent: root,
    };

    return result;
  };

  const onGenerateAnswers = async () => {
    setGenerated(undefined);
    const answers: Answers = {};
    generateAnswers(treeData, checkedKeys.checked, answers);

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

  const getId = (key: string) => key.substring(key.lastIndexOf('>') + 1);

  const selectAllScalars = (event: any, node: any) => {
    console.log('right click', event, node);
    const n = findNode(treeData, event.node.key);
    if (!n) return;

    const id = n.key.substring(n.key.lastIndexOf('>') + 1);

    if (id.startsWith('obj:')) {
      const keys: Key[] = n
        .children!.filter((n: Node) =>
          getId(n.key as string).startsWith('prop:scalar')
        )
        .map((c) => c.key);

      onCheck({
        checked: [...checkedKeys?.checked, ...keys],
        halfChecked: checkedKeys.halfChecked,
      });
    }
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
    setCheckedKeys,
    loadedKeys,
    setLoadedKeys,
    generateAnswers,
    onGenerateAnswers,
    checkCheckedKeys,
    selectAllScalars,
  };
};
