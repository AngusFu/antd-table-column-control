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
  const { width, onResize, onResizeStart, onResizeStop, ...restProps } = props

  if (!width) {
    return <th {...restProps} />
  }

  return (
    <Resizable
      height={0}
      width={width}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
      draggableOpts={defaultDraggbleOption}>
      <th {...restProps} />
    </Resizable>
  )
}

const getTableWidth = cols => cols.reduce((acc, col) => acc + col.width, 0)

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
      console.log(columns)
      this.setState({ columns })
    },
    nodeSelector: 'th',
    handleSelector: 'th > div'
  }

  handleResize(col) {
    return (e, { size }) => {
      this.setState(({ columns }) => {
        const nextColumns = [...columns]
        const index = columns.indexOf(col)
        nextColumns[index] = {
          ...nextColumns[index],
          width: size.width
        }

        return {
          columns: nextColumns,
          tableWidth: getTableWidth(nextColumns)
        }
      })
    }
  }

  constructor(props) {
    super(props)

    const columns = columnConfig.map(col => {
      const onHeaderCell = column => {
        return {
          width: column.width,
          onResize: this.handleResize.call(this, col),
          onResizeStart(_, data) {
            data.node.classList.add('dragging')
          },
          onResizeStop(_, data) {
            data.node.classList.remove('dragging')
          }
        }
      }
      return { ...col, align: 'center', onHeaderCell }
    })

    this.state = {
      columns,
      data: getData(100),
      tableWidth: getTableWidth(columns)
    }
  }

  render() {
    return (
      <div style={{ margin: 20 }}>
        <p>Table column with dragging & resizing</p>
        <ReactDragListView.DragColumn {...this.dragProps}>
          <Table
            components={this.components}
            columns={this.state.columns}
            dataSource={this.state.data}
            scroll={{ x: this.state.tableWidth }}
          />
        </ReactDragListView.DragColumn>
      </div>
    )
  }
}

ReactDOM.render(
  <div style={{ margin: 24 }}>
    <p style={{ marginBottom: 24 }}>
      Current antd version: {version} <br />
    </p>
    <Demo />
  </div>,
  document.getElementById('root')
)
