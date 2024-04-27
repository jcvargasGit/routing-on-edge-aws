import { PluginOption } from 'vite'

type ReplaceData = {
  replace: string | RegExp
  value: string
}

export const transformHtmlPlugin = (replaceData: ReplaceData[]): PluginOption => ({
  name: 'transform-html',
  transformIndexHtml: {
    order: 'post',
    transform(html: string) {
      for (let i = 0; i < replaceData.length; i++) {
        const data = replaceData[i]
        html = html.replace(data.replace, data.value)
      }
      return html
    }
  }
})
