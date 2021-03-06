import React, { Component } from 'react'
import './index.less'
import { Picker, List, InputItem, DatePicker, ImagePicker } from 'antd-mobile'
import { createForm } from 'rc-form'
import city from '@/assets/json/province_city_area.json'
import { connect } from 'dva'
import WxImageViewer from 'react-wx-images-viewer'
@connect(({ activity }) => ({ activity }))
class CustomForms extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageFiles: {},
      previewImageShow: false,
      previewImageList: [],
      previewImageIndex: null
    }
  }
  componentDidMount() {
  }
  imagePickerChange = (files, pkId) => {
    console.log(files)
    console.log(pkId)
    this.props.form.setFieldsValue({
      [pkId]: files
    })
    this.setState({
      imageFiles:{
        [pkId]: files
      }
    })
  }
  setImagePicker = (files, pkId) => {
    console.log(files)
    console.log(pkId)
    // this.props.form.setFieldsValue({
    //   [pkId]: files
    // })
    // this.setState({
    //   imageFiles:{
    //     [pkId]: files
    //   }
    // })
    let list = []
    files && files.map(item => {
      list.push({
        url: item
      })
    })
    return list
  }
  previewImage =(image, index)=> {
    console.log(image)
    let arr = []
    image.map(item =>{
      arr.push(item.url)
    })
    this.setState({
      previewImageShow: true,
      previewImageList: arr,
      previewImageIndex: index
    })
  }
  render() {
    const { activity } = this.props
    console.log(activity.formData)
    const { getFieldProps } = this.props.form
    return (
      <div className='custom-forms'>
        {
          activity.formData && activity.formData.map((item, index) => {
            return (
              <div key={index}>
                {
                  item.type.value === 4 && item.expand.type.value === 0 && item.defaultValue && item.defaultValue.length > 0 ?
                    <Picker
                      disabled
                      data={item.expand.item}
                      cols={1}
                      {...getFieldProps(item.pkId, {
                        initialValue: item.defaultValue || [],
                      })}
                      extra={<span className='placeholder'>{item.placeholder}</span>}
                    >
                      <List.Item
                        className={item.required ? 'require' : ''}
                        // arrow={'horizontal'}
                      >{item.label}</List.Item>
                    </Picker>
                    : ''
                }
                {
                  item.type.value === 0 && item.expand.type.value === 0 && item.defaultValue ?
                    <InputItem
                      disabled
                      className={item.required ? 'require' : ''}
                      // extra={<div className="am-list-arrow am-list-arrow-horizontal" aria-hidden="true" />}
                      placeholder={item.expand.placeholder}
                      {...getFieldProps(item.pkId, {
                        initialValue: item.defaultValue
                      })}
                    >{item.label}</InputItem>
                    : ''
                }
                {
                  item.type.value === 8 && item.expand.type.value === 0 && item.defaultValue && item.defaultValue.length > 0 ?
                    <Picker
                      disabled
                      data={city}
                      cols={3}
                      {...getFieldProps(item.pkId, {
                        initialValue: item.defaultValue || [],
                      })}
                      extra={<span className='placeholder'>{item.placeholder}</span>}
                    >
                      <List.Item
                        className={item.required ? 'require' : ''}
                        // arrow={'horizontal'}
                      >{item.label}</List.Item>
                    </Picker>
                    : ''
                }
                {
                  item.type.value === 5 && item.defaultValue ?
                    <DatePicker
                      disabled
                      format={item.expand.format}
                      mode="date"
                      title=''
                      extra={<span className='placeholder'>{item.placeholder}</span>}
                      {...getFieldProps(item.pkId, {
                        initialValue: item.defaultValue ? new Date(item.defaultValue) : '',
                      })}
                      okText='确定'
                      dismissText='取消'
                    >
                      <List.Item
                        className={item.required ? 'require' : ''}
                        // arrow={'horizontal'}
                      >{item.label}</List.Item>
                    </DatePicker>
                    : ''
                }
                {
                  item.type.value === 1 && item.expand.type.value === 0 && item.defaultValue ?
                    <InputItem
                      disabled
                      className={item.required ? 'require' : ''}
                      type='number'
                      // extra={<div className="am-list-arrow am-list-arrow-horizontal" aria-hidden="true" />}
                      placeholder={item.placeholder}
                      {...getFieldProps(item.pkId, {
                        initialValue: item.defaultValue,
                      })}
                    >{item.label}</InputItem>
                    : ''
                }
                {
                  item.type.value === 6 && item.expand.type.value === 0 && item.defaultValue ?
                    <List.Item
                      className={item.required ? 'require' : ''}
                    >
                      {item.label}
                      <List.Item.Brief>
                        <ImagePicker
                          files={this.setImagePicker(item.defaultValue, item.pkId)}
                          onChange={(files) => this.imagePickerChange(files, item.pkId)}
                          onImageClick={(index, fs) => this.previewImage(fs, index)}
                          selectable={false}
                          disableDelete
                          // accept="image/gif,image/jpeg,image/jpg,image/png"
                          accept="image/*"
                        />
                      </List.Item.Brief>
                      <InputItem
                        {...getFieldProps(item.pkId, {
                          initialValue: item.defaultValue,
                        })}
                        className={'hidden'}
                      />
                    </List.Item>
                    : ''
                }
              </div>
            )
          })
        }
        {
          this.state.previewImageShow ? <WxImageViewer onClose={()=>this.setState({previewImageShow: false})} urls={this.state.previewImageList} index={this.state.previewImageIndex}/> : ''
        }
      </div>
    )
  }
}
export default createForm()(CustomForms)
