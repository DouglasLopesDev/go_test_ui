import colors from "@/models/colors";
import { IUserTrack } from "@/utils/entity";
import { Col, Descriptions, Row } from "antd";
import { ColProps } from "antd/lib/col";
import React, { FunctionComponent } from "react";
import { connect } from "umi";
import locales from "@/locales/pt-BR";

export interface IRegisterInformationProps {
  createdBy?: IUserTrack
  createdOn?: string
  seeCreateBy?: boolean
  modifiedBy?: IUserTrack
  seeModifiedBy?: boolean
  modifiedOn?: string
  title?: string
  colPros?: ColProps
}

const RegisterInformation: FunctionComponent<IRegisterInformationProps> = (props) => {

  return (
    <>
      <Row
        justify={'space-between'}
        align={'top'}
        style={{
          backgroundColor: colors.white,
          display: !props.seeCreateBy && !props.seeModifiedBy ? 'none' : ''
        }}
      >
        {props.seeCreateBy ?
          <Col xs={24} sm={24} md={8} lg={12} style={{ padding: '20px' }} {...props.colPros}>
            <Descriptions
              title={locales["layout.createdBy"]} layout="vertical"
              bordered
              size={"small"}
            >
              <Descriptions.Item label={locales["layout.createdBy"]}>{props.createdBy?.name}</Descriptions.Item>
              <Descriptions.Item label={locales["layout.email"]}>{props.createdBy?.email}</Descriptions.Item>
              <Descriptions.Item label={locales["layout.createdOn"]}>{props.createdOn}</Descriptions.Item>
            </Descriptions>
          </Col> : <></>}
        {props.seeModifiedBy ?
          <Col xs={24} sm={24} md={8} lg={12} style={{ padding: '20px' }} {...props.colPros}>
            <Descriptions
              title={locales["layout.lastUpdate"]} layout="vertical"
              bordered
              size={"small"}
            >
              <Descriptions.Item label={locales["layout.modifiedBy"]}>{props.modifiedBy?.name}</Descriptions.Item>
              <Descriptions.Item label={locales["layout.email"]}>{props.modifiedBy?.email}</Descriptions.Item>
              <Descriptions.Item label={locales["layout.modifiedOn"]}>{props.modifiedOn}</Descriptions.Item>
            </Descriptions>
          </Col> : <></>}
      </Row>
    </>
  )
}

export default connect()(RegisterInformation)
