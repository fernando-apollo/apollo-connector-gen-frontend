import { Key, useState } from 'react';

import { Answers, Node, ResponseItem, TreeData, UploadInfo } from 'types/utils';

import axios from 'axios';
import { EventDataNode } from 'rc-tree/lib/interface';

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

  const onCheck = (values: Key[] | CheckedProps, _info: any): void => {
    const set = new Set<string>();

    // add all the parent nodes from the checked nodes
    // needed for the backend to generate the answers
    if (typeof values === 'object') {
      const checkedProps: CheckedProps = values as CheckedProps;
      checkedProps.checked
        .map((p) => findNode(treeData, p as string))
        .forEach((n: Node | undefined) => {
          let p = n;
          while ((p = p?.parent)) {
            set.add(p.key);
          }
        });

      setCheckedKeys({
        checked: [...checkedProps.checked, ...set],
        halfChecked: checkedProps.halfChecked,
      });
    }
  };

  const generateAnswers = (
    treeData: TreeData,
    checkedKeys: Key[],
    answers: Answers
  ) => {
    treeData.forEach((r) => {
      const key: string = r.key.replace(/#\/components\/schemas/g, '#/c/s');
      const id = r.key.substring(r.key.lastIndexOf('>') + 1);

      if (checkedKeys.includes(r.key)) {
        if (
          id.startsWith('obj:') ||
          id.startsWith('comp:') ||
          id.startsWith('union:')
        ) {
          answers[key] = 's';
        } else {
          answers[key] = 'y';
        }
      } else {
        // do nothing
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

  const onLoadData = async ({ key }: Node) => {
    const newTreeData: TreeData = [...treeData];
    const root = findNode(newTreeData, key);

    let response;
    if (!root!.parent) {
      // we are in a path
      const url = `${baseUrl}/visit/${
        uploadInfo!.md5
      }/path?id=${encodeURIComponent(key)}`;
      response = await axios.get(url);
    } else {
      const url = `${baseUrl}/visit/${
        uploadInfo!.md5
      }/type?&p=${encodeURIComponent(root!.parent!.title)}`;

      const payload = key;
      response = await axios.post(url, payload);
    }

    if (response.status === 200) {
      console.log('response', response.data);

      const items = Array.isArray(response.data.result)
        ? response.data.result
        : [response.data.result];

      if (items.length > 0) {
        items.forEach((item: ResponseItem) => {
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
    }
    // return true;
    await undefined;
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
    const isScalarOrEnum =
      item.id.startsWith('prop:scalar') || item.id.startsWith('enum:');

    const result = {
      title: formatTitle(item),
      key: item.path,
      isLeaf: isScalarOrEnum,
      disableCheckbox: !isScalarOrEnum,
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

    return false;
  };

  const getId = (key: string) => key.substring(key.lastIndexOf('>') + 1);

  const selectAllScalars = (info: {
    event: React.MouseEvent;
    node: EventDataNode<Node>;
  }) => {
    console.log('right click', info.event, info.node);
    const n = findNode(treeData, info.node.key);
    if (!n) return;

    const id = n.key.substring(n.key.lastIndexOf('>') + 1);

    if (id.startsWith('obj:') || id.startsWith('comp:')) {
      const keys: Key[] | undefined = n.children
        ?.filter((n: Node) => getId(n.key as string).startsWith('prop:scalar'))
        .map((c) => c.key);

      onCheck(
        {
          checked: [...checkedKeys?.checked, ...keys!],
          halfChecked: checkedKeys.halfChecked,
        },
        {}
      );
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
