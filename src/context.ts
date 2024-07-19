import { createContext } from 'react';
import { ExampleTopic } from './types';

export type ILogicFlowThemeContext = {
  exampleTopics?: ExampleTopic[];
}

export const LogicFlowThemeContext = createContext<ILogicFlowThemeContext>({});
