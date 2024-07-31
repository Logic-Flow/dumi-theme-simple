import LogicFlow from '@logicflow/core';

export const themeConfig: Partial<LogicFlow.Theme> = {
  rect: {
    fill: '#E6F6FE',
    stroke: '#E6F6FE',
    strokeWidth: 20,
    radius: 20,
  },
  circle: {
    fill: '#EDF4FF',
    stroke: '#EDF4FF',
    strokeWidth: 20,
    radius: 20,
  },
  diamond: {
    fill: '#B9E2FD',
    stroke: '#B9E2FD',
    strokeWidth: 10,
    radius: 20,
  },
  ellipse: {
    fill: '#A1DBFC',
    stroke: '#A1DBFC',
    strokeWidth: 10,
    radius: 20,
  },
  polygon: {
    fill: '#B9E2FD',
    stroke: '#B9E2FD',
    strokeWidth: 10,
    radius: 20,
  },
  text: {
    fontSize: 20,
    lineHeight: 2,
  },
  nodeText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  edgeAnimation: {
    stroke: '#d2d2d2',
    // strokeDasharray: 5,
    // animation: 'dashdraw .5s linear infinite',
  }
};

export const staticNodes = [
  {
    id: 'static-node-1',
    type: 'rect',
    x: 140,
    y: 460,
    rotate: 0.1,
    text: '🤗',
    properties: {
      width: 120,
      height: 120,
      radius: 30,
      textStyle: {
        fontSize: 50,
      },
      style: {
        stroke: '#99C2F7',
        strokeWidth: 1,
        fill: '#99C2F7',
      },
    },
  },
  {
    id: 'static-node-3',
    type: 'circle',
    // x: 1680,
    // y: 200,
    x: 20,
    y: 200,
    rotate: -0.3,
    text: 'Hey!',
    properties: {
      r: 50,
      style: {
        stroke: '#5E4EF5',
        strokeWidth: 1,
        radius: 100,
        fill: '#5E4EF5',
      },
      textStyle: {
        color: '#fff',
        fontSize: 20,
      },
    },
  },
  {
    id: 'static-node-5',
    type: 'rect',
    // x: 200,
    // y: 120,
    x: 240,
    y: 110,
    rotate: -0.3,
    text: '👏Welcome!',
    properties: {
      width: 280,
      height: 80,
      radius: 40,
      style: {
        stroke: '#ffffff',
        strokeWidth: 10,
        fill: '#ffffff',
      },
      textStyle: {
        fontSize: 30,
        color: '#077ff0',
      },
    },
  },
  {
    id: 'static-node-6',
    type: 'circle',
    x: 1920,
    y: 650,
    text: '🎉',
    properties: {
      r: 50,
      textStyle: {
        fontSize: 40,
      },
      style: {
        stroke: '#fdfcdc',
        strokeWidth: 1,
        fill: '#fdfcdc',
      },
    },
  },
  {
    id: 'static-node-7',
    type: 'diamond',
    x: 220,
    y: 780,
    text: '✌️',
    rotate: -0.3,
    properties: {
      rx: 80,
      ry: 80,
      textStyle: {
        fontSize: 40,
      },
      style: {
        stroke: '#ffffff',
        strokeWidth: 1,
        fill: '#ffffff',
      },
    },
  },
];

export const configNodes = [
  {
    id: 'config-node-shape',
    type: 'config-node',
    x: 1220,
    y: 140,
    rotate: 0.2,
    properties: {
      width: 400,
      height: 180,
      type: 'shape',
      defaultValue: {
        node: '',
        edge: 'bezier',
      },
    },
  },
  {
    id: 'config-node-color',
    type: 'config-node',
    x: 420,
    y: 420,
    rotate: -0.1,
    properties: {
      width: 200,
      height: 180,
      type: 'color',
      defaultValue: {
        fontColor: '#fff',
        nodeBackground: '#fff',
        edgeColor: '#fff',
        graphBackGround: '#fff',
      },
    },
  },
];

export const staticEdges = [
  {
    type: 'bezier',
    sourceNodeId: 'banner-demo-node',
    targetNodeId: 'config-node-graph',
  },
  {
    type: 'bezier',
    sourceNodeId: 'config-node-graph',
    targetNodeId: 'config-node-shape',
  },
  {
    type: 'bezier',
    sourceNodeId: 'config-node-shape',
    targetNodeId: 'config-node-content',
  },
  {
    type: 'bezier',
    sourceNodeId: 'config-node-color',
    targetNodeId: 'config-node-content',
  },
  {
    type: 'bezier',
    sourceNodeId: 'banner-demo-node',
    targetNodeId: 'config-node-color',
  },
];

export const controlConfig = (lf, params) => {
  const { focusCenter, defaultZoomSize } = params;
  return [
    {
      key: 'zoom-out',
      iconClass: 'lf-control-zoomOut',
      title: '缩小流程图',
      text: '缩小',
      onClick: () => {
        lf.zoom(false);
        lf.focusOn(focusCenter);
      },
    },
    {
      key: 'zoom-in',
      iconClass: 'lf-control-zoomIn',
      title: '放大流程图',
      text: '放大',
      onClick: () => {
        lf.zoom(true);
        lf.focusOn(focusCenter);
      },
    },
    {
      key: 'reset',
      iconClass: 'lf-control-fit',
      title: '恢复流程原有尺寸',
      text: '适应',
      onClick: () => {
        lf.zoom(defaultZoomSize);
        lf.focusOn(focusCenter);
      },
    },
    {
      key: 'undo',
      iconClass: 'lf-control-undo',
      title: '回到上一步',
      text: '上一步',
      onClick: () => {
        lf.undo();
      },
    },
    {
      key: 'redo',
      iconClass: 'lf-control-redo',
      title: '移到下一步',
      text: '下一步',
      onClick: () => {
        lf.redo();
      },
    },
    {
      key: 'mini-map',
      iconClass: 'icon-ditu',
      title: '',
      text: '小地图',
      onClick: () => {
        const { isShow } = lf.extension.miniMap;
        if (isShow) {
          lf.extension.miniMap.hide();
          return;
        }
        lf.extension.miniMap.show();
      },
    },
  ];
};

export default {
  themeConfig,
  staticNodes,
  configNodes,
  staticEdges,
};
