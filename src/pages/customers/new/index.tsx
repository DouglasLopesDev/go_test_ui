import HeaderButton from '@/components/HeaderButton';
import colors from '@/models/colors';
import { PageContainer } from '@ant-design/pro-layout';
import { Col, Form, Row } from 'antd';
import React from 'react';
import { FunctionComponent } from 'react';
import { connect, UserModelState } from 'umi';
import locales from '@/locales/pt-BR';
import { SaveOutlined } from '@ant-design/icons';
import { Store } from 'antd/es/form/interface';
import { ICustomerState } from '../data.d';


export interface ICustomerNewProps {
  currentUser: UserModelState["currentUser"];
  // dispatch: Dispatch;
}

const CustomerNew: FunctionComponent<ICustomerNewProps> = (props) => {

  const onSubmitSaveCustomer = (store: Store) => {
  };

  return (
    <>
    <PageContainer
      onBack={() => window.history.back()}
      content={[
        <Row
          justify={'end'}
        >
          <HeaderButton
            color={colors.green}
            // label={mode === 'edit' ? locales['layout.edit'] : locales['layout.save']}
            label={locales['layout.save']}
            // icon={project.object_key ? <EditOutlined /> : <SaveOutlined />}
            icon={<SaveOutlined />}
            // loading={props.loading}
            // labelOnLoading={mode === 'edit' ? locales['layout.editing'] : locales['layout.saving']}
            htmlType="submit"
            form="customerForm"
            colPros={{ xs: 24, sm: 24, md: 24, lg: 6 }}
          />
        </Row>
      ]}
    >
      <Form
        onFinish={(event) => {
          onSubmitSaveCustomer(event);
        }}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        layout="horizontal"
        name="projectForm"
        id="projectForm"
        initialValues={{
          remember: true,
          layout: 'horizontal',
        }}
      >
        <Row justify={'space-between'}>

          <Col xs={24} sm={24} md={8} lg={8} style={{ backgroundColor: colors.white }}>
            {/* <CreateInputs
              formType={"project"}
              inputValue={project}
              rowStyle={{ paddingTop: 0 }}
            /> */}
          </Col>
        </Row>
      </Form>
      <br></br>

      {/* <RegisterInformation
        createdBy={project.createdBy}
        createdOn={project.createdOn}
        seeCreateBy={project.createdBy ? true : false}
        modifiedBy={project.modifiedBy}
        modifiedOn={project.modifiedOn}
        seeModifiedBy={project.modifiedBy ? true : false}
      /> */}
    </PageContainer >
    </>
  );
};

export default connect(({ user }: { user: UserModelState; customerModel: ICustomerState }) => ({
  currentUser: user.currentUser
}),
)(CustomerNew);
