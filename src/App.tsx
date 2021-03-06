import React, { useState } from 'react';
import { useRequest, useCopy, usePagination, useVirtualized } from './custom_hooks/index';
import { Switch, Radio } from './basic_components/index';
import './App.css';

const items = Array.from(Array(200)).map((_, index) => {
  return {
    id: index,
    name: 'fhjd',
    age: index + 5,
    job: 123 * index
  };
});

const computeIndexHeight = (index: number) => {
  return index % 3 === 0 ? 25 : 50;
};

const App: React.FC = () => {
  const { data } = useRequest('/api1');
  const [value, setValue] = useState(3);

  const { startIndex, endIndex, countPage } = usePagination({
    total: 96,
    rowsPerPage: 5,
    currentPage: 13
  });

  const { list, containerProps, wrapperProps, isScrolling } = useVirtualized(items, {
    itemHeight: computeIndexHeight
  });

  const copy = useCopy();
  function handleChangeRadio(e: any) {
    copy(123);
    setValue(e.target.value);
  }

  // console.log({ data, startIndex, endIndex, countPage });

  return (
    <div className="App">
      <Switch disabled={false} />
      <Radio.Group value={value} onChange={handleChangeRadio}>
        <Radio value={1} />
        <Radio value={2} />
        <Radio value={3} />
      </Radio.Group>
      <div
        {...containerProps}
        style={{
          width: '300px',
          height: '400px',
          margin: '0 auto',
          overflow: 'auto',
          background: '#eee'
        }}
      >
        <div {...wrapperProps}>
          {list.map(item => (
            <div style={{ height: computeIndexHeight(item.id) }} key={item.id}>
              编号: {item.id}
            </div>
          ))}
          {/* {isScrolling
            ? list.map(item => (
                <div style={{ height: '50px' }} key={item.id}>
                  nihao: {item.id}
                </div>
              ))
            : list.map(item => (
                <div style={{ height: '50px' }} key={item.id}>
                  编号: {item.id}
                </div>
              ))} */}
        </div>
      </div>
    </div>
  );
};

export default App;
