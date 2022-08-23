import Toast from "react-native-toast-message";
import {Platform} from "react-native";

export namespace PlatformToast {

    export function showSuccess(message: string) {
        showToast(message, 'success')
    }

    export function showError(message: string) {
        showToast(message, 'error')
    }

    function showToast(message: string, type: string) {
        Toast.show(
            {
                text1: message,
                type: type,
                position: Platform.select({web: 'top', default: 'bottom'}),
                visibilityTime: Platform.select({web: 4000, default: 2000}),
            }
        )
    }
}