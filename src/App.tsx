import React, { useContext } from 'react';
import { Row, Col, Button } from 'antd';
import styles from './app.less';
import Lib from './components/Lib';
import Board from './components/Board';
import Config from './components/Config';
import Preview from './components/Preview';
import { ReducerContext } from './components/ReducerWrapper';
import classnames from 'classnames';

const App = () => {
  const { state, dispatch } = useContext(ReducerContext);

  const handleReset = () => dispatch({ type: 'reset' });

  const handleCreate = () => console.log(JSON.stringify(state.data));

  return (
    <div className={styles.wrapper}>
      <section className={styles.body}>
        <Row className={styles.content}>
          <Col span={4} className={classnames(styles.panel, styles.left)}>
            <Lib />
          </Col>
          <Col span={10} className={classnames(styles.panel, styles.center)}>
            <Board />
          </Col>
          <Col span={10} className={classnames(styles.panel, styles.right)}>
            <Config />
          </Col>
        </Row>
        <Row className={styles.actions}>
          <Button onClick={handleReset}>重置</Button>
          <Button type="primary" onClick={handleCreate}>
            生成 Json
          </Button>
        </Row>
      </section>
      <Preview />
    </div>
  );
};

export default App;
