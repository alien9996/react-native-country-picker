using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace React.Native.Country.Picker.RNReactNativeCountryPicker
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNReactNativeCountryPickerModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNReactNativeCountryPickerModule"/>.
        /// </summary>
        internal RNReactNativeCountryPickerModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNReactNativeCountryPicker";
            }
        }
    }
}
