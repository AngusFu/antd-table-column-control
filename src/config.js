import React from 'react'

function stopPropagation(e: React.SyntheticEvent<any>) {
  e.stopPropagation()
  if (e.nativeEvent.stopImmediatePropagation) {
    e.nativeEvent.stopImmediatePropagation()
  }
}

function TableTitle(props) {
  return <div {...props} style={{ position: 'relative', zIndex: 9 }} />
}

const TitleKey = (
  <TableTitle>
    Key<a onClick={stopPropagation}>[Copy]</a>
  </TableTitle>
)

export const columnConfig = [
  {
    title: TitleKey,
    dataIndex: 'key',
    width: 300,
    sorter: true
  },
  {
    title: 'Name',
    dataIndex: 'name',
    width: 200,
    sorter: true
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    width: 300,
    sorter: true
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 800,
    sorter: true
  },
  {
    title: 'Address',
    dataIndex: 'address',
    width: 300
  }
]
