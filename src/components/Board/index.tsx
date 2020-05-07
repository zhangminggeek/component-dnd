import React from 'react';
import Board from './board';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

const Index = () => (
  <DndProvider backend={Backend}>
    <Board />
  </DndProvider>
);

export default Index;
