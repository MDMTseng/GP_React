if (typeof WebViewIf == 'undefined')
{
  var WebViewIf={
    showToast:(text)=> console.log(text)
  }
}

console.log(WebViewIf);

export function showAndroidToast(toast) {
        WebViewIf.showToast(toast);
    }
