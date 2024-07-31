import React, { useState } from 'react';
import { keys } from 'lodash-es';
import { Space, Radio, Input, Popover, Switch, Button } from 'antd';
import { HighlightOutlined } from '@ant-design/icons';
import { HexColorPicker } from 'react-colorful';

import styles from '../index.module.less';
import { cloneDeep } from 'lodash-es';

export interface ConfigNodeProps {
  type: string;
  value: any;
  isSilentMode: boolean;
  setValue: (key: any, value: any) => void;
}

const typeMap = {
  shape: '形状',
  color: '颜色',
  content: '内容',
  graph: '画布',
};

const nodeShapeOptions = [
  { label: '矩形', value: 'rect' },
  { label: '圆形', value: 'circle' },
  { label: '椭圆形', value: 'ellipse' },
  { label: '菱形', value: 'polygon' },
  { label: '多边形', value: 'diamond' },
  { label: '文本', value: 'text' },
];
const edgeShapeOptions = [
  { label: '直线边', value: 'line' },
  { label: '折线边', value: 'polyline' },
  { label: '曲线边', value: 'bezier' },
];
const colorOptions = [
  { label: '文本颜色', key: 'fontColor' },
  { label: '节点背景色', key: 'nodeBackground' },
  { label: '边颜色', key: 'edgeColor' },
];
const contentOptions = [
  { label: '', key: 'title' },
  { label: '', key: 'description' },
];
const graphOptions = [
  { label: '禁止画布缩放', key: 'stopZoomGraph' },
  { label: '禁止画布移动', key: 'stopMoveGraph' },
  { label: '节点可拖动', key: 'adjustNodePosition' },
  { label: '可调整边', key: 'adjustEdge' },
  { label: '节点可旋转', key: 'allowRotate' },
  { label: '节点可缩放', key: 'allowResize' },
  { label: '隐藏锚点', key: 'hideAnchors' },
];

export const ConfigNode: React.FC<ConfigNodeProps> = ({
  type,
  value,
  isSilentMode,
  setValue,
}) => {
  const [nodeShape, setNodeShape] = useState<string>(value.node);
  const [edgeShape, setEdgeShape] = useState<string>(value.edge);
  const [pickerSwitchs, setPickerSwitchs] = useState<boolean[]>(
    keys(value).map(() => false),
  );
  const [buttonColors, setButtonColors] = useState<string[]>(
    keys(value).map((key) => value[key]),
  );
  const [graphSwitch, setGraphSwitch] = useState<boolean[]>(
    keys(value).map((key) => value[key]),
  );
  const onChange = (key, value) => {
    setValue(key, value);
  };
  return (
    <div className={styles.configCard}>
      <Space direction="vertical" size="middle">
        <div>{typeMap[type]}</div>
        {type === 'shape' && (
          <div className={styles['configCard-shapeConfig']}>
            <div>
              <span>节点形状：</span>
              <Radio.Group
                disabled={isSilentMode}
                onChange={(e) => {
                  const { target } = e;
                  setNodeShape(target.value);
                  onChange('nodeShape', target.value);
                }}
                value={nodeShape}
                buttonStyle="solid"
              >
                {nodeShapeOptions.map((item) => (
                  <Radio key={item.value} value={item.value}>
                    {item.label}
                  </Radio>
                ))}
              </Radio.Group>
            </div>
            <div>
              <span>边形状：</span>
              <Radio.Group
                disabled={isSilentMode}
                onChange={(e: any) => {
                  const { target } = e;
                  setEdgeShape(target.value);
                  onChange('edgeShape', target.value);
                }}
                value={edgeShape}
              >
                {edgeShapeOptions.map((item) => (
                  <Radio key={item.value} value={item.value}>
                    {item.label}
                  </Radio>
                ))}
              </Radio.Group>
            </div>
          </div>
        )}
        {type === 'color' && (
          <Space direction="vertical">
            {colorOptions.map((item, index) => (
              <div key={item.key}>
                <span>{item.label}：</span>
                <Popover
                  content={
                    <HexColorPicker
                      color={value[item.key]}
                      onChange={(value: any) => {
                        const newColors = cloneDeep(buttonColors);
                        newColors[index] = value;
                        setButtonColors(newColors);
                        onChange(item.key, value);
                      }}
                    />
                  }
                  title=""
                  trigger="click"
                  open={pickerSwitchs[index]}
                  onOpenChange={(open: boolean) => {
                    const newSwitch = cloneDeep(pickerSwitchs);
                    newSwitch[index] = open;
                    setPickerSwitchs(newSwitch);
                  }}
                >
                  <Button
                    disabled={isSilentMode}
                    shape="circle"
                    style={{
                      backgroundColor: buttonColors[index],
                    }}
                    icon={<HighlightOutlined />}
                  ></Button>
                </Popover>
              </div>
            ))}
          </Space>
        )}
        {type === 'content' && (
          <Space direction="vertical">
            {contentOptions.map((item) => (
              <div key={item.key}>
                <span>{item.label}</span>
                <Input
                  disabled={isSilentMode}
                  defaultValue={value[item.key]}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                  }}
                  onKeyDown={(e) => {
                    e.stopPropagation();
                  }}
                  onChange={(e: any) => {
                    e.stopPropagation();
                    const { value } = e.target;
                    onChange(item.key, value);
                  }}
                />
              </div>
            ))}
          </Space>
        )}
        {type === 'graph' && (
          <Space direction="vertical">
            {graphOptions.map((item, index) => (
              <div key={item.key}>
                <span>{item.label}：</span>
                <Switch
                  disabled={isSilentMode}
                  defaultChecked={graphSwitch[index]}
                  onChange={(value: any) => {
                    const newSwitch = cloneDeep(graphSwitch);
                    newSwitch[index] = value;
                    setGraphSwitch(newSwitch);
                    onChange(item.key, value);
                  }}
                />
              </div>
            ))}
          </Space>
        )}
      </Space>
      <div className={styles['configCard-filter-background']}></div>
    </div>
  );
};
