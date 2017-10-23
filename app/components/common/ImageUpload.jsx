import React from 'react';
import Image from 'Image';
import View from 'View';
import Loading from 'Loading';

export const ImageUpload = (props) => {
  const imageSource = props.source || require('img_placeholder.png');
  const inputStyle = Object.assign({},
    styles.inputStyle,
    props.style && props.style.width ? { width: props.style.width } : {},
    props.style && props.style.height ? { height: props.style.height } : {},
  );
  const imageStyle = Object.assign({},
    props.style ? props.style : {},
    props.style && props.style.width ? { marginLeft: -props.style.width } : {},
  );
  const loadingContainerStyle = Object.assign({},
    { alignItems: 'center', justifyContent: 'center' },
    props.isUploading ? { backgroundColor: 'rgba(255, 255, 255, 0.8)', zIndex: 2, borderRadius: 5 } : { backgroundColor: 'transparent' },
    props.style && props.style.width ? { width: props.style.width, marginLeft: -props.style.width } : {},
    props.style && props.style.height ? { height: props.style.height } : {},
    props.style && props.style.borderRadius ? { borderRadius: props.style.borderRadius } : {},
  );
  return (
    <View>
      <input
        accept=".png, .jpg, .jpeg"
        className="custom-file-input"
        type="file"
        name="image"
        onChange={props.onChange}
        style={inputStyle}
        disabled={props.disabled}
      />
      {props.isUploading && <View style={loadingContainerStyle}>
        <View style={{ width: 34, height: 34 }}>
          <Loading className="image-upload" />
        </View>
      </View>}
      <Image source={imageSource} style={imageStyle} />
      {props.editIcon && <Image source={require('ic_edit_round_lightgray.png')} style={{ width: 30, height: 30, position: 'relative', marginTop: -5, marginLeft: -25 }} />}
    </View>
  );
};

const styles = {
  inputStyle: {
    opacity: 0,
    zIndex: 1,
    fontSize: 1,
  },
};

export default ImageUpload;
