import React from 'react';

export const View = (props) => {
  const containerStyle = Object.assign({},
    styles.containerStyle,
    // css
    props.alignItems ? { alignItems: props.alignItems } : {},
    props.alignSelf ? { alignSelf: props.alignSelf } : {},
    props.backgroundColor ? { backgroundColor: props.backgroundColor } : {},
    props.borderRadius ? { borderRadius: props.borderRadius } : {},
    props.color ? { color: props.color } : {},
    props.display ? { display: props.display } : {},
    props.flex ? { flex: props.flex } : {},
    props.flexDirection ? { flexDirection: props.flexDirection } : {},
    props.flexWrap ? { flexWrap: 'wrap' } : {},
    props.height ? { height: props.height } : {},
    props.justifyContent ? { justifyContent: props.justifyContent } : {},
    props.margin ? { margin: props.margin } : {},
    props.marginTop ? { marginTop: props.marginTop } : {},
    props.marginBottom ? { marginBottom: props.marginBottom } : {},
    props.marginLeft ? { marginLeft: props.marginLeft } : {},
    props.marginLeftRight ? { marginLeft: props.marginLeftRight, marginRight: props.marginLeftRight } : {},
    props.marginRight ? { marginRight: props.marginRight } : {},
    props.maxHeight ? { maxHeight: props.maxHeight } : {},
    props.maxWidth ? { maxWidth: props.maxWidth } : {},
    props.minHeight ? { minHeight: props.minHeight } : {},
    props.minWidth ? { minWidth: props.minWidth } : {},
    props.padding ? { padding: props.padding } : {},
    props.paddingTop ? { paddingTop: props.paddingTop } : {},
    props.paddingBottom ? { paddingBottom: props.paddingBottom } : {},
    props.paddingTopBottom ? { paddingTop: props.paddingTopBottom, paddingBottom: props.paddingTopBottom } : {},
    props.paddingLeft ? { paddingLeft: props.paddingLeft } : {},
    props.paddingLeftRight ? { paddingLeft: props.paddingLeftRight, paddingRight: props.paddingLeftRight } : {},
    props.paddingRight ? { paddingRight: props.paddingRight } : {},
    props.width ? { width: props.width } : {},
    props.widthAndHeight ? { width: props.widthAndHeight, height: props.widthAndHeight } : {},
    props.whitespace ? { whitespace: props.whitespace } : {},
    // custom css
    props.row ? { flexDirection: 'row' } : {},
    props.column ? { flexDirection: 'column' } : {},
    props.bottomDivider ? { borderBottomWidth: 1, borderBottomColor: 'lightgray', borderBottomStyle: 'solid' } : {},
    props.flexbox ? { display: 'flex' } : {},
    props.fullWidth ? { width: '100%' } : {},
    props.halfWidth ? { width: '50%' } : {},
    // extra css
    props.style,
  );
  return (
    <div onScroll={props.onScroll} className={props.className || ''} style={containerStyle}>
      {props.children}
    </div>
  );
};

const styles = {
  containerStyle: {
    display: 'flex',
  },
};

// export { View };

export default View;
