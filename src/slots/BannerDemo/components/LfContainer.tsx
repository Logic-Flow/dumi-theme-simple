import React, { FC, useEffect, useRef, useState } from 'react';
import LogicFlow from '@logicflow/core';
import { MiniMap, Control } from '@logicflow/extension';
import { register, ReactNodeProps } from '@logicflow/react-node-registry';
import gh from 'parse-github-url';
import { useLocale } from 'dumi/dist/client/theme-api';
import { ConfigNode } from './ConfigNode';
import { IntroNode } from './IntroNode';
import { AdvantageNode } from './AdvantageNode';
import { ic } from '../../hooks';
import { IC } from '../../../types';
import { themeConfig, staticNodes, configNodes, staticEdges } from './lfConfig';
import GitHubButton from 'react-github-button';

import '@logicflow/core/es/index.css';
import '@logicflow/extension/es/index.css';
import styles from '../index.module.less';

type conatinerProps = {
  title: IC;
  engine?: IC;
  description: IC;
  buttons?: any;
  githubUrl: string;
  showGithubStars?: boolean;
  features: any;
  advantages: any;
};

const ConfigComponent: FC<ReactNodeProps> = (props) => {
  const { node, graph } = props;
  node.text.editable = false;
  const data = node.getData();
  const {
    editConfigModel: { isSilentMode },
  } = graph;
  if (!data.properties) data.properties = {};
  const { type = 'shape', defaultValue } = data.properties;
  const setValue = (key, value) => {
    const IntroNode = graph.getNodeModelById('banner-demo-node');
    switch (key) {
      case 'nodeShape': {
        graph.nodes.forEach((node) => {
          if (
            [
              'demo-node',
              'config-node',
              'github-node',
              'advantage-node',
            ].includes(node.type)
          )
            return;
          graph.changeNodeType(node.id, value);
          const newIntroNode = graph.getNodeModelById(node.id);
          if (value === 'rect') {
            newIntroNode.radius = newIntroNode.radius || 20;
          }
        });
        break;
      }
      case 'edgeShape': {
        graph.edgeType = value;
        graph.edges.forEach((edge) => {
          graph.changeEdgeType(edge.id, value);
        });
      }
      case 'fontColor': {
        graph.nodes.forEach((node) => {
          if (
            [
              'demo-node',
              'config-node',
              'github-node',
              'advantage-node',
            ].includes(node.type)
          )
            return;
          if (!node.properties.textStyle) {
            node.properties.textStyle = {};
          }
          node.setProperty('textStyle', {
            ...(node.properties.textStyle as any),
            color: value,
          });
        });
        break;
      }
      case 'nodeBackground': {
        graph.nodes.forEach((node) => {
          if (
            [
              'demo-node',
              'config-node',
              'github-node',
              'advantage-node',
            ].includes(node.type)
          )
            return;
          if (!node.properties.style) {
            node.properties.style = {};
          }
          node.setProperty('style', {
            ...(node.properties.style as any),
            fill: value,
            stroke: value,
          });
        });
        break;
      }
      case 'edgeColor': {
        const { line, polyline, bezier } = graph.theme;
        graph.setTheme({
          line: {
            ...line,
            stroke: value,
          },
          polyline: {
            ...polyline,
            stroke: value,
          },
          bezier: {
            ...bezier,
            stroke: value,
          },
        });
        graph.edges.forEach((edge) => {
          if (!edge.properties.style) {
            edge.properties.style = {};
          }
          edge.setProperty('style', {
            ...(edge.properties.style as any),
            stroke: value,
          });
        });
        break;
      }
      case 'title': {
        IntroNode.setProperty(key, value);
        break;
      }
      case 'slogan': {
        IntroNode.setProperty(key, value);
        break;
      }
      default: {
        const { editConfigModel } = graph;
        const updateConfig = {};
        updateConfig[key] = value;
        editConfigModel.updateEditConfig(updateConfig);
        break;
      }
    }
  };
  return (
    <ConfigNode
      type={type}
      isSilentMode={isSilentMode}
      value={defaultValue}
      setValue={setValue}
    />
  );
};

const DemoComponent: FC<ReactNodeProps> = ({ node }) => {
  const data = node.getData();
  node.text.editable = false;
  if (!data.properties) data.properties = {};
  const { title, engineText, description, buttons } = data.properties;
  return (
    <IntroNode title={title} description={description} buttons={buttons} />
  );
};

const GithubComponent: FC<ReactNodeProps> = ({ node }) => {
  const { githubObj } = node.properties;
  return (
    <div key="github" className={styles.githubWrapper}>
      <GitHubButton
        type="stargazers"
        namespace={(githubObj as any).owner}
        repo={(githubObj as any).name}
      />
    </div>
  );
};

const AdvantageComponent: FC<ReactNodeProps> = ({ node }) => {
  const data = node.getData();
  node.text.editable = false;
  if (!data.properties) data.properties = {};
  const { icon, advantageStyle, iconStyle, title } = data.properties;
  return (
    <AdvantageNode
      icon={icon}
      advantageStyle={advantageStyle}
      iconStyle={iconStyle}
      title={title}
    />
  );
};

export const LfContainer: FC<conatinerProps> = (props) => {
  const {
    title,
    description,
    githubUrl,
    showGithubStars,
    buttons,
    advantages,
  } = props;
  const lang = useLocale().id;
  const githubObj = gh(githubUrl);
  const showGitHubStarsButton =
    showGithubStars && githubObj && githubObj.owner && githubObj.name;
  const titleInfo = ic(title);
  const desc = ic(description);
  const buttonList = buttons.map((item) => ({
    ...item,
    text: ic(item.text),
    link: item.link[lang] || item.link,
  }));
  const advantagesList = advantages.map((item) => ({
    ...item,
    title: ic(item.title),
  }));
  const containerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    const lf = new LogicFlow({
      container: containerRef.current as HTMLElement,
      stopZoomGraph: true,
      stopScrollGraph: true,
      stopMoveGraph: false,
      nodeTextEdit: true,
      nodeTextDraggable: false,
      adjustEdge: true,
      allowResize: true,
      allowRotate: true,
      hoverOutline: false,
      keyboard: {
        enabled: true,
      },
      grid: {
        size: 20,
        visible: true,
        type: 'dot',
        config: {
          color: '#f3f7fd',
          thickness: 4,
        },
      },
      background: {
        background:
          'radial-gradient(circle at left, #C9D2FF3F, #F8FAFF7F), radial-gradient(circle at center, #F8FAFF7F, #D6ECFE0F), radial-gradient(circle at right, #A5DBFDFF, #F8FAFFFF)',
      },
      plugins: [Control, MiniMap],
      pluginsOptions: {
        MiniMap: {
          showEdge: true,
          width: 100,
          height: 80,
          isShowHeader: false,
        },
      },
      style: themeConfig,
      edgeType: 'bezier',
    });
    register(
      {
        type: 'config-node',
        component: ConfigComponent,
      },
      lf,
    );
    register(
      {
        type: 'demo-node',
        component: DemoComponent,
      },
      lf,
    );
    register(
      {
        type: 'github-node',
        component: GithubComponent,
      },
      lf,
    );
    register(
      {
        type: 'advantage-node',
        component: AdvantageComponent,
      },
      lf,
    );
    lf.render({});
    lf.render({
      nodes: [
        ...staticNodes,
        ...configNodes,
        {
          id: 'config-node-content',
          type: 'config-node',
          x: 680,
          y: 190,
          rotate: -0.3,
          properties: {
            width: 260,
            height: 170,
            type: 'content',
            defaultValue: {
              title: titleInfo,
              description: desc,
            },
          },
        },
        {
          id: 'banner-demo-node',
          type: 'demo-node',
          x: 1000,
          y: 660,
          resizable: false,
          properties: {
            width: 800,
            height: 500,
            title: titleInfo,
            lang,
            description: desc,
            buttons: buttonList,
          },
        },
      ],
      edges: staticEdges,
    });
    if (showGitHubStarsButton) {
      lf.addNode({
        id: 'github-node',
        type: 'github-node',
        x: 1420,
        y: 380,
        rotate: 0.45,
        properties: {
          githubObj,
          width: 100,
          height: 100,
        },
      });
    }
    advantagesList.forEach((advantage, index) => {
      const { icon, advantageStyle, iconStyle, title, position } = advantage;
      lf.addNode({
        id: `advantage-node-${index}`,
        type: 'advantage-node',
        x: 100 + index * 300,
        y: 600,
        ...position,
        resizable: false,
        rotate: index % 2 === 0 ? -0.3 : 0.3,
        properties: {
          width: 110,
          height: 110,
          icon: icon,
          advantageStyle: advantageStyle,
          iconStyle: iconStyle,
          title: title,
        },
      });
    });
    const body = document.querySelector('body');
    const clientWidth = body.clientWidth;
    const zoomSize = +(clientWidth / 2130).toFixed(1);
    (lf.extension.control as Control).addItem({
      key: 'mini-map',
      iconClass: 'lf-control-zoomOut',
      title: '',
      text: '小地图',
      onClick: (lf) => {
        (lf.extension.miniMap as MiniMap).show(0, 0);
        (lf.extension.miniMap as MiniMap).updatePosition('right-bottom');
      },
    });

    lf.focusOn({ x: 1000 * zoomSize, y: 460 * zoomSize });
    lf.zoom(zoomSize);
  });

  return (
    <div className={styles.lfContainer}>
      <div ref={containerRef} id="graph" className={styles.viewport}></div>
    </div>
  );
};
