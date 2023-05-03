import React, { FunctionComponent, ReactText, useState } from "react";
import { connect } from "umi";
import { Button, Input, Table, Image, Tag, Radio, Col, Row, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ColumnType } from "antd/lib/table";
import colors from "@/models/colors";

export interface ListProps {
  dataSource: any[],
  count: number,
  loading?: boolean,
  selectable?: boolean,
  columns: ListColumns[],
  pagination?: any,
  options?: (node: any, order: any) => JSX.Element,
  onFilter?: (reset?: boolean, filters?: any) => void
}

export interface ListColumns {
  name?: string
  filters?: any
  render?: any
  label: string
  tagColors?: any
  dataIndex: string
  searchable?: boolean
  type?: 'image' | 'text' | 'tag'
}

const List: FunctionComponent<ListProps> = (props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<ReactText[]>([]);
  const [searchInput, setSearchInput] = useState<Input | null>(null);
  const [filters, setFilters] = useState({})

  const getColumnSearchProps = (dataIndex: string, filterValues?: any[], tagColors?: any[]) => ({
    filterDropdown: ({ selectedKeys }: any) => (
      <Col span={24} style={{ padding: 10 }}>
        {filterValues && filterValues.length ?
          <>
            <Row style={{ color: colors.lightGray, width: 200 }} >{`Filtrar ${dataIndex} por...`}</Row>
            <Radio.Group
              style={{ marginBottom: '5px', width: 200, border: `1px solid ${colors.lightGray}`, padding: '10px' }}
              onChange={event => {
                filters[dataIndex] = event.target.value
                setFilters({ ...filters })
              }}
            >
              {filterValues.map(filterValue => <Radio style={{
                display: 'block',
                height: '30px',
                lineHeight: '30px',
              }} value={filterValue.value}>

                {tagColors ? <Tag color={tagColors[filterValue.value.toLowerCase()]}>{filterValue.text}</Tag> : filterValue.text}
              </Radio>)}
            </Radio.Group></>
          :
          <Input
            ref={(node) => {
              setSearchInput(node);
            }}
            placeholder={`Filtrar por ${props.columns.find(column => column.dataIndex === dataIndex)?.label ? props.columns.find(column => column.dataIndex === dataIndex)?.label : dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => {
              filters[dataIndex] = e.target.value
              setFilters({ ...filters })
            }}
            onPressEnter={() => {
              props.onFilter && props.onFilter(true, filters)
            }}
            style={{ width: 200, marginBottom: 8, display: 'block' }}
          />}
        <Row>
          <Button
            size="small"
            type="primary"
            icon={<SearchOutlined />}
            style={{ width: 97, margin: '2px', backgroundColor: colors.lightBlue }}
            onClick={() => props.onFilter && props.onFilter(true, filters)}
          >
            Pesquisar
          </Button>
          <Button
            size="small"
            onClick={() => {
              filters[dataIndex] = ""
              props.onFilter && props.onFilter(true, filters)
              setFilters({ ...filters })
              searchInput?.setValue('')
            }}
            style={{ width: 97, margin: '2px' }}>
            Limpar
          </Button>
        </Row>
      </Col>
    ),
    filterIcon: () => <SearchOutlined
      style={filters[dataIndex] ? {
        padding: '4px',
        color: colors.white,
        borderRadius: '50%',
        backgroundColor: colors.lightBlue,
      } : {}}
    />,
    onFilter: (value: string | number | boolean, entity: any) =>
      entity[dataIndex]
        ? entity[dataIndex].toString().toLowerCase().includes(value.toString().toLowerCase())
        : '',
    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible && searchInput) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
  });

  const creatColumns = () => {
    const createdColumns = props.columns.map((column: ListColumns) => {
      var newColumn: ColumnType<any> = {}
      column.type = column.type ? column.type : 'text'
      switch (column.type) {
        case 'image':
          newColumn.title = column.label
          newColumn.dataIndex = column.dataIndex
          newColumn.key = column.name ? column.name : column.dataIndex
          newColumn.render = (imageUrl: string[]) => <Image src={imageUrl && imageUrl[0] ? imageUrl[0] : ''} width='50px' />
          break
        case 'text':
          if (column.searchable)
            newColumn = { ...getColumnSearchProps(column.name ? column.name : column.dataIndex) }

          newColumn.title = column.label
          newColumn.dataIndex = column.dataIndex
          newColumn.key = column.name ? column.name : column.dataIndex

          if (column.render) {
            newColumn.render = column.render
          }
          break
        case 'tag':
          if (column.filters)
            newColumn = { ...getColumnSearchProps(column.name ? column.name : column.dataIndex, column.filters, column.tagColors) }

          newColumn.title = column.label
          newColumn.dataIndex = column.dataIndex
          newColumn.key = column.name ? column.name : column.dataIndex
          newColumn.render = (status: string) => <Tag color={column.tagColors[status.toLowerCase()]}>{status}</Tag>
      }
      return newColumn
    })

    if (props.options)
      createdColumns.push({
        title: 'Opções',
        dataIndex: 'options',
        key: 'options',
        render: props.options,
      })

    return createdColumns
  }

  const createDataSource = () => {
    if (props.dataSource && props.dataSource.length > 0) {
      return props.dataSource.map((data: any, index: number) => {
        return {
          ...data,
          key: index + 1,
        }
      })
    }
    return []
  }

  return (
    <Col span={24}>
      <span style={{ marginLeft: 8 }}>
        {selectedRowKeys.length === 1
          ? `${selectedRowKeys.length} item selecionado`
          : selectedRowKeys.length > 1
            ? `${selectedRowKeys.length} itens selecionados`
            : ''}
      </span>
      <Table
        scroll={{ x: true }}
        loading={props.loading}
        columns={creatColumns()}
        dataSource={createDataSource()}
        pagination={props.pagination}
        rowSelection={props.selectable ? {
          selectedRowKeys,
          onChange: (keys: ReactText[]) => setSelectedRowKeys(keys),
        } : undefined}
      >
      </Table>
      <Row
        justify={'end'}
        style={{ padding: "20px" }}
      >
        <Col>
          <Pagination
            defaultCurrent={1}
            onChange={(pageIndex, pageSize) => {
              filters["pageSize"] = pageSize;
              filters["pageIndex"] = pageIndex;

              props.onFilter ? props.onFilter(true, filters) : '';
            }} total={props.count}
          />
        </Col>
      </Row>
    </Col>

  )
}

export default connect()(List)
