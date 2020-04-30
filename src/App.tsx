import React, { useContext } from 'react';
import { Row, Col, Button } from 'antd';
import styles from './app.less';
import Lib from './components/Lib';
import Board from './components/Board';
import Config from './components/Config';
import Preview from './components/Preview';
import { ReducerContext } from './components/ReducerWrapper';

const App = () => {
  const { dispatch } = useContext(ReducerContext);

  const handleReset = () => dispatch({ type: 'reset' });

  return (
    <div className={styles.wrapper}>
      <section className={styles.body}>
        <Row className={styles.content}>
          <Col span={6} className={styles.left}>
            <Lib />
          </Col>
          <Col span={12} className={styles.center}>
            <Board />
          </Col>
          <Col span={6} className={styles.right}>
            <Config />
          </Col>
        </Row>
        <Row className={styles.actions}>
          <Button onClick={handleReset}>重置</Button>
          <Button type="primary">生成 Json</Button>
        </Row>
      </section>
      <Preview />
    </div>
  );
};

export default App;
