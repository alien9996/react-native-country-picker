
# react-native-country-picker

**Various image filters** for **iOS** and **Android**

## Demo

![gif](https://github.com/alien9996/ReactNativeImageFilter/blob/master/filter.gif?raw=true)

## Getting started

`$ npm install react-native-country-picker --save`
<space><space> OR <space><space>
`$ yarn add react-native-country-picker`


## Example
```javascript
import RNImageFilter from 'react-native-image-filter';
 
RNImageFilter.getSourceImage({
          imageSource: "/storage/emulated/0/Download/img2-0.jpg",
          dataType: "Path",
          filterType: 1
        }, (source) => {
                    this.setState( imgBase64 : source.base64);
                    console.log("SOURCE", source);
                    // source returns the height, width and the Base64 string of the image.
        });
```

## Options

Props | Default | Options/Info
------ | --- | ------
imageSource (String)|null|The path to the image in the device or a Base64 string.
dataType (String)|Path|If you send a path, enter the string "Path"<br>If you send a Base64 string, enter the string "Base64".
filterType (int)|0|Select the type you want to filter images, the values from 0 to 21. Other values around 0 to 21 will not take effect.<br> **Note**: Valid only when dataType = "Path".

## Filter types

![filterType](https://github.com/alien9996/ReactNativeImageFilter/blob/master/filter_type.png?raw=true)

## Note
- The image path you send into **imageSource:''** must be the absolute path. If you have problems with the absolute path, you can find the solution [here](https://stackoverflow.com/questions/52423067/how-to-get-absolute-path-of-a-file-in-react-native).

### Thank you for your interest!
