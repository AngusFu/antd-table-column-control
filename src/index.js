import React from 'react'
import ReactDOM from 'react-dom'
import { Table, version } from 'antd'
import { Resizable } from 'react-resizable'
import ReactDragListView from 'react-drag-listview'

import getData from './data'
import { columnConfig } from './config'

import 'antd/dist/antd.css'
import './index.css'

const defaultDraggbleOption = {
  enableUserSelectHack: false,
  onMouseDown: e => e.preventDefault()
}

const ResizeableTitle = props => {
  const { onResize, width, ...restProps } = props

  if (!width) {
    return <th {...restProps} />
  }

  return (
    <Resizable
      height={0}
      width={width}
      onResize={onResize}
      draggableOpts={defaultDraggbleOption}>
      <th {...restProps} />
    </Resizable>
  )
}

class Demo extends React.Component {
  components = {
    header: {
      cell: ResizeableTitle
    }
  }

  dragProps = {
    onDragEnd: (fromIndex, toIndex) => {
      const columns = this.state.columns
      const item = columns.splice(fromIndex, 1)[0]
      columns.splice(toIndex, 0, item)
      this.setState({ columns })
    },
    nodeSelector: 'th',
    handleSelector: 'th > div'
  }

  handleResize = (index, e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns]
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width
      }
      return { columns: nextColumns }
    })
  }

  constructor(props) {
    super(props)

    const resizePool = []
    const columns = columnConfig.map((col, index) => {
      const onHeaderCell = column => {
        resizePool[index] =
          resizePool[index] || this.handleResize.bind(this, index)
        return {
          width: column.width,
          onResize: resizePool[index]
        }
      }
      return { ...col, onHeaderCell }
    })

    this.state = {
      columns,
      data: getData(100)
    }
  }

  render() {
    return (
      <div style={{ margin: 20 }}>
        <h2>Table column with dragging</h2>
        <ReactDragListView.DragColumn {...this.dragProps}>
          <Table
            bordered
            components={this.components}
            columns={this.state.columns}
            dataSource={this.state.data}
            scroll={{ x: 1300 }}
          />
        </ReactDragListView.DragColumn>
      </div>
    )
  }
}

ReactDOM.render(
  <div style={{ margin: 24 }}>
    <h1 style={{ marginBottom: 24 }}>
      Current antd version: {version} <br />
    </h1>
    <Demo />
  </div>,
  document.getElementById('root')
)
