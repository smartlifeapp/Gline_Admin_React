import React from 'react';

const Loading = (props) => {
  // if (!isLoading) return <div />;
  const blades = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const containerStyle = Object.assign({},
    props.className === 'input-container' ? { width: 34, height: 34, marginRight: 10 } : {},
  );
  return (
    <div style={containerStyle}>
      <div className={`apple-loading-spinner${props.className ? ` ${props.className}` : ''}`}>
        {blades.map(key => <div className="apple-loading-spinner-blade" key={key} />)}
      </div>
    </div>
  );
};

export default Loading;
