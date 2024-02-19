import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import 'taro-ui/dist/style/index.scss'
import { AtButton } from 'taro-ui'
import './index.css'

export default function Index() {

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='index'>
      <Text className='text-2xl text-yellow-200'>Hello world!</Text>
      <AtButton>你好</AtButton>
    </View>
  )
}
