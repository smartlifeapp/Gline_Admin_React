import React from 'react';

export const Image = (props) => {
  const style = Object.assign({},
    styles.imageStyle,
    props.width ? { width: props.width } : {},
    props.height ? { height: props.height } : {},
    props.widthAndHeight ? { width: props.widthAndHeight, height: props.widthAndHeight } : {},
    props.borderRadius ? { borderRadius: props.borderRadius } : {},
    props.maxWidth ? { maxWidth: props.maxWidth } : {},
    props.maxHeight ? { maxHeight: props.maxHeight } : {},
    props.objectFit ? { objectFit: props.objectFit } : {},
    props.marginRight ? { marginRight: props.marginRight } : {},
    props.style ? props.style : {},
  );
  let imageSource = props.source;
  if (props.source && props.source.uri) imageSource = props.source.uri;
  return <img alt="content image" src={imageSource} style={style} />;
};

const styles = {
  imageStyle: {
    // objectFit: 'cover',
  },
};

export default Image;
