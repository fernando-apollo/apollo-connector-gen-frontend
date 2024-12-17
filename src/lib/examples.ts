export type PlaygroundExample = {
  id: string;
  title: string;
  // The JSONSelection syntax used to generate the result
  mapping: string;
  // The JSON input that is mapped to the result
  input: string;
  // The variables (in JSON) that are used in the mapping process
  variables: string;
};

export const examples: PlaygroundExample[] = [
  {
    id: 'basic',
    title: 'Basic',
    mapping: `id
name
emailAddress: email
address {
  street
  postalCode: zipcode
}
`,
    input: JSON.stringify(
      [
        {
          id: 1,
          name: 'Leanne Graham',
          username: 'Bret',
          email: 'Sincere@april.biz',
          address: {
            street: 'Kulas Light',
            suite: 'Apt. 556',
            city: 'Gwenborough',
            zipcode: '92998-3874',
            geo: {
              lat: '-37.3159',
              lng: '81.1496',
            },
          },
          phone: '1-770-736-8031 x56442',
          website: 'hildegard.org',
          company: {
            name: 'Romaguera-Crona',
            catchPhrase: 'Multi-layered client-server neural-net',
            bs: 'harness real-time e-markets',
          },
        },
        {
          id: 2,
          name: 'Ervin Howell',
          username: 'Antonette',
          email: 'Shanna@melissa.tv',
          address: {
            street: 'Victor Plains',
            suite: 'Suite 879',
            city: 'Wisokyburgh',
            zipcode: '90566-7771',
            geo: {
              lat: '-43.9509',
              lng: '-34.4618',
            },
          },
          phone: '010-692-6593 x09125',
          website: 'anastasia.net',
          company: {
            name: 'Deckow-Crist',
            catchPhrase: 'Proactive didactic contingency',
            bs: 'synergize scalable supply-chains',
          },
        },
        {
          id: 3,
          name: 'Clementine Bauch',
          username: 'Samantha',
          email: 'Nathan@yesenia.net',
          address: {
            street: 'Douglas Extension',
            suite: 'Suite 847',
            city: 'McKenziehaven',
            zipcode: '59590-4157',
            geo: {
              lat: '-68.6102',
              lng: '-47.0653',
            },
          },
          phone: '1-463-123-4447',
          website: 'ramiro.info',
          company: {
            name: 'Romaguera-Jacobson',
            catchPhrase: 'Face to face bifurcated interface',
            bs: 'e-enable strategic applications',
          },
        },
        {
          id: 4,
          name: 'Patricia Lebsack',
          username: 'Karianne',
          email: 'Julianne.OConner@kory.org',
          address: {
            street: 'Hoeger Mall',
            suite: 'Apt. 692',
            city: 'South Elvis',
            zipcode: '53919-4257',
            geo: {
              lat: '29.4572',
              lng: '-164.2990',
            },
          },
          phone: '493-170-9623 x156',
          website: 'kale.biz',
          company: {
            name: 'Robel-Corkery',
            catchPhrase: 'Multi-tiered zero tolerance productivity',
            bs: 'transition cutting-edge web services',
          },
        },
        {
          id: 5,
          name: 'Chelsey Dietrich',
          username: 'Kamren',
          email: 'Lucio_Hettinger@annie.ca',
          address: {
            street: 'Skiles Walks',
            suite: 'Suite 351',
            city: 'Roscoeview',
            zipcode: '33263',
            geo: {
              lat: '-31.8129',
              lng: '62.5342',
            },
          },
          phone: '(254)954-1289',
          website: 'demarco.info',
          company: {
            name: 'Keebler LLC',
            catchPhrase: 'User-centric fault-tolerant solution',
            bs: 'revolutionize end-to-end systems',
          },
        },
        {
          id: 6,
          name: 'Mrs. Dennis Schulist',
          username: 'Leopoldo_Corkery',
          email: 'Karley_Dach@jasper.info',
          address: {
            street: 'Norberto Crossing',
            suite: 'Apt. 950',
            city: 'South Christy',
            zipcode: '23505-1337',
            geo: {
              lat: '-71.4197',
              lng: '71.7478',
            },
          },
          phone: '1-477-935-8478 x6430',
          website: 'ola.org',
          company: {
            name: 'Considine-Lockman',
            catchPhrase: 'Synchronised bottom-line interface',
            bs: 'e-enable innovative applications',
          },
        },
        {
          id: 7,
          name: 'Kurtis Weissnat',
          username: 'Elwyn.Skiles',
          email: 'Telly.Hoeger@billy.biz',
          address: {
            street: 'Rex Trail',
            suite: 'Suite 280',
            city: 'Howemouth',
            zipcode: '58804-1099',
            geo: {
              lat: '24.8918',
              lng: '21.8984',
            },
          },
          phone: '210.067.6132',
          website: 'elvis.io',
          company: {
            name: 'Johns Group',
            catchPhrase: 'Configurable multimedia task-force',
            bs: 'generate enterprise e-tailers',
          },
        },
        {
          id: 8,
          name: 'Nicholas Runolfsdottir V',
          username: 'Maxime_Nienow',
          email: 'Sherwood@rosamond.me',
          address: {
            street: 'Ellsworth Summit',
            suite: 'Suite 729',
            city: 'Aliyaview',
            zipcode: '45169',
            geo: {
              lat: '-14.3990',
              lng: '-120.7677',
            },
          },
          phone: '586.493.6943 x140',
          website: 'jacynthe.com',
          company: {
            name: 'Abernathy Group',
            catchPhrase: 'Implemented secondary concept',
            bs: 'e-enable extensible e-tailers',
          },
        },
        {
          id: 9,
          name: 'Glenna Reichert',
          username: 'Delphine',
          email: 'Chaim_McDermott@dana.io',
          address: {
            street: 'Dayna Park',
            suite: 'Suite 449',
            city: 'Bartholomebury',
            zipcode: '76495-3109',
            geo: {
              lat: '24.6463',
              lng: '-168.8889',
            },
          },
          phone: '(775)976-6794 x41206',
          website: 'conrad.com',
          company: {
            name: 'Yost and Sons',
            catchPhrase: 'Switchable contextually-based project',
            bs: 'aggregate real-time technologies',
          },
        },
        {
          id: 10,
          name: 'Clementina DuBuque',
          username: 'Moriah.Stanton',
          email: 'Rey.Padberg@karina.biz',
          address: {
            street: 'Kattie Turnpike',
            suite: 'Suite 198',
            city: 'Lebsackbury',
            zipcode: '31428-2261',
            geo: {
              lat: '-38.2386',
              lng: '57.2232',
            },
          },
          phone: '024-648-3804',
          website: 'ambrose.net',
          company: {
            name: 'Hoeger LLC',
            catchPhrase: 'Centralized empowering task-force',
            bs: 'target end-to-end models',
          },
        },
      ],
      null,
      2,
    ),
    variables: JSON.stringify({ $args: {}, $this: {} }, null, 2),
  },
  {
    id: 'github',
    title: 'Github Issues',
    mapping: `id
title
body
state
user {
  login
}
repository: repository.full_name
    `,
    input: JSON.stringify(
      [
        {
          id: 1,
          node_id: 'MDU6SXNzdWUx',
          url: 'https://api.github.com/repos/octocat/Hello-World/issues/1347',
          repository_url: 'https://api.github.com/repos/octocat/Hello-World',
          labels_url:
            'https://api.github.com/repos/octocat/Hello-World/issues/1347/labels{/name}',
          comments_url:
            'https://api.github.com/repos/octocat/Hello-World/issues/1347/comments',
          events_url:
            'https://api.github.com/repos/octocat/Hello-World/issues/1347/events',
          html_url: 'https://github.com/octocat/Hello-World/issues/1347',
          number: 1347,
          state: 'open',
          title: 'Found a bug',
          body: "I'm having a problem with this.",
          user: {
            login: 'octocat',
            id: 1,
            node_id: 'MDQ6VXNlcjE=',
            avatar_url: 'https://github.com/images/error/octocat_happy.gif',
            gravatar_id: '',
            url: 'https://api.github.com/users/octocat',
            html_url: 'https://github.com/octocat',
            followers_url: 'https://api.github.com/users/octocat/followers',
            following_url:
              'https://api.github.com/users/octocat/following{/other_user}',
            gists_url: 'https://api.github.com/users/octocat/gists{/gist_id}',
            starred_url:
              'https://api.github.com/users/octocat/starred{/owner}{/repo}',
            subscriptions_url:
              'https://api.github.com/users/octocat/subscriptions',
            organizations_url: 'https://api.github.com/users/octocat/orgs',
            repos_url: 'https://api.github.com/users/octocat/repos',
            events_url: 'https://api.github.com/users/octocat/events{/privacy}',
            received_events_url:
              'https://api.github.com/users/octocat/received_events',
            type: 'User',
            site_admin: false,
          },
          labels: [
            {
              id: 208045946,
              node_id: 'MDU6TGFiZWwyMDgwNDU5NDY=',
              url: 'https://api.github.com/repos/octocat/Hello-World/labels/bug',
              name: 'bug',
              description: "Something isn't working",
              color: 'f29513',
              default: true,
            },
          ],
          assignee: {
            login: 'octocat',
            id: 1,
            node_id: 'MDQ6VXNlcjE=',
            avatar_url: 'https://github.com/images/error/octocat_happy.gif',
            gravatar_id: '',
            url: 'https://api.github.com/users/octocat',
            html_url: 'https://github.com/octocat',
            followers_url: 'https://api.github.com/users/octocat/followers',
            following_url:
              'https://api.github.com/users/octocat/following{/other_user}',
            gists_url: 'https://api.github.com/users/octocat/gists{/gist_id}',
            starred_url:
              'https://api.github.com/users/octocat/starred{/owner}{/repo}',
            subscriptions_url:
              'https://api.github.com/users/octocat/subscriptions',
            organizations_url: 'https://api.github.com/users/octocat/orgs',
            repos_url: 'https://api.github.com/users/octocat/repos',
            events_url: 'https://api.github.com/users/octocat/events{/privacy}',
            received_events_url:
              'https://api.github.com/users/octocat/received_events',
            type: 'User',
            site_admin: false,
          },
          assignees: [
            {
              login: 'octocat',
              id: 1,
              node_id: 'MDQ6VXNlcjE=',
              avatar_url: 'https://github.com/images/error/octocat_happy.gif',
              gravatar_id: '',
              url: 'https://api.github.com/users/octocat',
              html_url: 'https://github.com/octocat',
              followers_url: 'https://api.github.com/users/octocat/followers',
              following_url:
                'https://api.github.com/users/octocat/following{/other_user}',
              gists_url: 'https://api.github.com/users/octocat/gists{/gist_id}',
              starred_url:
                'https://api.github.com/users/octocat/starred{/owner}{/repo}',
              subscriptions_url:
                'https://api.github.com/users/octocat/subscriptions',
              organizations_url: 'https://api.github.com/users/octocat/orgs',
              repos_url: 'https://api.github.com/users/octocat/repos',
              events_url:
                'https://api.github.com/users/octocat/events{/privacy}',
              received_events_url:
                'https://api.github.com/users/octocat/received_events',
              type: 'User',
              site_admin: false,
            },
          ],
          milestone: {
            url: 'https://api.github.com/repos/octocat/Hello-World/milestones/1',
            html_url: 'https://github.com/octocat/Hello-World/milestones/v1.0',
            labels_url:
              'https://api.github.com/repos/octocat/Hello-World/milestones/1/labels',
            id: 1002604,
            node_id: 'MDk6TWlsZXN0b25lMTAwMjYwNA==',
            number: 1,
            state: 'open',
            title: 'v1.0',
            description: 'Tracking milestone for version 1.0',
            creator: {
              login: 'octocat',
              id: 1,
              node_id: 'MDQ6VXNlcjE=',
              avatar_url: 'https://github.com/images/error/octocat_happy.gif',
              gravatar_id: '',
              url: 'https://api.github.com/users/octocat',
              html_url: 'https://github.com/octocat',
              followers_url: 'https://api.github.com/users/octocat/followers',
              following_url:
                'https://api.github.com/users/octocat/following{/other_user}',
              gists_url: 'https://api.github.com/users/octocat/gists{/gist_id}',
              starred_url:
                'https://api.github.com/users/octocat/starred{/owner}{/repo}',
              subscriptions_url:
                'https://api.github.com/users/octocat/subscriptions',
              organizations_url: 'https://api.github.com/users/octocat/orgs',
              repos_url: 'https://api.github.com/users/octocat/repos',
              events_url:
                'https://api.github.com/users/octocat/events{/privacy}',
              received_events_url:
                'https://api.github.com/users/octocat/received_events',
              type: 'User',
              site_admin: false,
            },
            open_issues: 4,
            closed_issues: 8,
            created_at: '2011-04-10T20:09:31Z',
            updated_at: '2014-03-03T18:58:10Z',
            closed_at: '2013-02-12T13:22:01Z',
            due_on: '2012-10-09T23:39:01Z',
          },
          locked: true,
          active_lock_reason: 'too heated',
          comments: 0,
          pull_request: {
            url: 'https://api.github.com/repos/octocat/Hello-World/pulls/1347',
            html_url: 'https://github.com/octocat/Hello-World/pull/1347',
            diff_url: 'https://github.com/octocat/Hello-World/pull/1347.diff',
            patch_url: 'https://github.com/octocat/Hello-World/pull/1347.patch',
          },
          closed_at: null,
          created_at: '2011-04-22T13:33:48Z',
          updated_at: '2011-04-22T13:33:48Z',
          repository: {
            id: 1296269,
            node_id: 'MDEwOlJlcG9zaXRvcnkxMjk2MjY5',
            name: 'Hello-World',
            full_name: 'octocat/Hello-World',
            owner: {
              login: 'octocat',
              id: 1,
              node_id: 'MDQ6VXNlcjE=',
              avatar_url: 'https://github.com/images/error/octocat_happy.gif',
              gravatar_id: '',
              url: 'https://api.github.com/users/octocat',
              html_url: 'https://github.com/octocat',
              followers_url: 'https://api.github.com/users/octocat/followers',
              following_url:
                'https://api.github.com/users/octocat/following{/other_user}',
              gists_url: 'https://api.github.com/users/octocat/gists{/gist_id}',
              starred_url:
                'https://api.github.com/users/octocat/starred{/owner}{/repo}',
              subscriptions_url:
                'https://api.github.com/users/octocat/subscriptions',
              organizations_url: 'https://api.github.com/users/octocat/orgs',
              repos_url: 'https://api.github.com/users/octocat/repos',
              events_url:
                'https://api.github.com/users/octocat/events{/privacy}',
              received_events_url:
                'https://api.github.com/users/octocat/received_events',
              type: 'User',
              site_admin: false,
            },
            private: false,
            html_url: 'https://github.com/octocat/Hello-World',
            description: 'This your first repo!',
            fork: false,
            url: 'https://api.github.com/repos/octocat/Hello-World',
            archive_url:
              'https://api.github.com/repos/octocat/Hello-World/{archive_format}{/ref}',
            assignees_url:
              'https://api.github.com/repos/octocat/Hello-World/assignees{/user}',
            blobs_url:
              'https://api.github.com/repos/octocat/Hello-World/git/blobs{/sha}',
            branches_url:
              'https://api.github.com/repos/octocat/Hello-World/branches{/branch}',
            collaborators_url:
              'https://api.github.com/repos/octocat/Hello-World/collaborators{/collaborator}',
            comments_url:
              'https://api.github.com/repos/octocat/Hello-World/comments{/number}',
            commits_url:
              'https://api.github.com/repos/octocat/Hello-World/commits{/sha}',
            compare_url:
              'https://api.github.com/repos/octocat/Hello-World/compare/{base}...{head}',
            contents_url:
              'https://api.github.com/repos/octocat/Hello-World/contents/{+path}',
            contributors_url:
              'https://api.github.com/repos/octocat/Hello-World/contributors',
            deployments_url:
              'https://api.github.com/repos/octocat/Hello-World/deployments',
            downloads_url:
              'https://api.github.com/repos/octocat/Hello-World/downloads',
            events_url:
              'https://api.github.com/repos/octocat/Hello-World/events',
            forks_url: 'https://api.github.com/repos/octocat/Hello-World/forks',
            git_commits_url:
              'https://api.github.com/repos/octocat/Hello-World/git/commits{/sha}',
            git_refs_url:
              'https://api.github.com/repos/octocat/Hello-World/git/refs{/sha}',
            git_tags_url:
              'https://api.github.com/repos/octocat/Hello-World/git/tags{/sha}',
            git_url: 'git:github.com/octocat/Hello-World.git',
            issue_comment_url:
              'https://api.github.com/repos/octocat/Hello-World/issues/comments{/number}',
            issue_events_url:
              'https://api.github.com/repos/octocat/Hello-World/issues/events{/number}',
            issues_url:
              'https://api.github.com/repos/octocat/Hello-World/issues{/number}',
            keys_url:
              'https://api.github.com/repos/octocat/Hello-World/keys{/key_id}',
            labels_url:
              'https://api.github.com/repos/octocat/Hello-World/labels{/name}',
            languages_url:
              'https://api.github.com/repos/octocat/Hello-World/languages',
            merges_url:
              'https://api.github.com/repos/octocat/Hello-World/merges',
            milestones_url:
              'https://api.github.com/repos/octocat/Hello-World/milestones{/number}',
            notifications_url:
              'https://api.github.com/repos/octocat/Hello-World/notifications{?since,all,participating}',
            pulls_url:
              'https://api.github.com/repos/octocat/Hello-World/pulls{/number}',
            releases_url:
              'https://api.github.com/repos/octocat/Hello-World/releases{/id}',
            ssh_url: 'git@github.com:octocat/Hello-World.git',
            stargazers_url:
              'https://api.github.com/repos/octocat/Hello-World/stargazers',
            statuses_url:
              'https://api.github.com/repos/octocat/Hello-World/statuses/{sha}',
            subscribers_url:
              'https://api.github.com/repos/octocat/Hello-World/subscribers',
            subscription_url:
              'https://api.github.com/repos/octocat/Hello-World/subscription',
            tags_url: 'https://api.github.com/repos/octocat/Hello-World/tags',
            teams_url: 'https://api.github.com/repos/octocat/Hello-World/teams',
            trees_url:
              'https://api.github.com/repos/octocat/Hello-World/git/trees{/sha}',
            clone_url: 'https://github.com/octocat/Hello-World.git',
            mirror_url: 'git:git.example.com/octocat/Hello-World',
            hooks_url: 'https://api.github.com/repos/octocat/Hello-World/hooks',
            svn_url: 'https://svn.github.com/octocat/Hello-World',
            homepage: 'https://github.com',
            language: null,
            forks_count: 9,
            stargazers_count: 80,
            watchers_count: 80,
            size: 108,
            default_branch: 'master',
            open_issues_count: 0,
            is_template: true,
            topics: ['octocat', 'atom', 'electron', 'api'],
            has_issues: true,
            has_projects: true,
            has_wiki: true,
            has_pages: false,
            has_downloads: true,
            archived: false,
            disabled: false,
            visibility: 'public',
            pushed_at: '2011-01-26T19:06:43Z',
            created_at: '2011-01-26T19:01:12Z',
            updated_at: '2011-01-26T19:14:43Z',
            permissions: {
              admin: false,
              push: false,
              pull: true,
            },
            allow_rebase_merge: true,
            template_repository: null,
            temp_clone_token: 'ABTLWHOULUVAXGTRYU7OC2876QJ2O',
            allow_squash_merge: true,
            allow_auto_merge: false,
            delete_branch_on_merge: true,
            allow_merge_commit: true,
            subscribers_count: 42,
            network_count: 0,
            license: {
              key: 'mit',
              name: 'MIT License',
              url: 'https://api.github.com/licenses/mit',
              spdx_id: 'MIT',
              node_id: 'MDc6TGljZW5zZW1pdA==',
              html_url: 'https://github.com/licenses/mit',
            },
            forks: 1,
            open_issues: 1,
            watchers: 1,
          },
          author_association: 'COLLABORATOR',
        },
      ],
      null,
      2,
    ),
    variables: JSON.stringify({ $args: {}, $this: {} }, null, 2),
  },
  {
    id: 'foreign-keys',
    title: 'Foreign keys',
    mapping: `$.me {
  name
  friends: friend_ids { id: $ }
}`,
    input: JSON.stringify(
      {
        me: {
          name: 'Alice',
          friend_ids: [1, 2, 3],
        },
      },
      null,
      2,
    ),
    variables: JSON.stringify({ $args: {}, $this: {} }, null, 2),
  },
  {
    id: 'body',
    title: 'Body',
    mapping: `$args.input {
  title
  body
}`,
    input: '{}',
    variables: JSON.stringify(
      { $args: { input: { title: 'Hello', body: 'World' } }, $this: {} },
      null,
      2,
    ),
  },
  {
    id: 'literal',
    title: 'Literal values',
    mapping: `hello: $("world")
theAnswer: $(42)
isTrue: $(true)
anObject: $({ key: "value", message: $.hello })
aList: $([1, 2, 3])`,
    input: JSON.stringify(
      {
        hello: 'world',
      },
      null,
      2,
    ),
    variables: JSON.stringify({ $args: {}, $this: {} }, null, 2),
  },
  {
    id: 'methods',
    title: 'Methods',
    mapping: `greeting: $->echo("Hello, World!")
colorObjects: colors->map({ name: @ })
status: status->match(
  ["active", "ACTIVE"],
  ["not active", "INACTIVE"],
  [@, @]
)
firstColor: colors->first
lastColor: colors->last
firstTwoColors: colors->slice(0, 2)
numberOfColors: colors->size
entries: object->entries`,
    input: JSON.stringify(
      {
        colors: ['red', 'green', 'blue'],
        status: 'not active',
        object: { foo: 'bar', baz: 'quux' },
      },
      null,
      2,
    ),
    variables: JSON.stringify({ $args: {}, $this: {} }, null, 2),
  },
];
