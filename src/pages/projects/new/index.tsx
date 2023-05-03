import React, { FunctionComponent, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect, UserModelState } from 'umi';
import { Col, Form, Radio, Row } from 'antd';
import CreateInputs from '@/components/InputProps';
import { defaultProjectValues, dispatcherFactory, IProject, IProjectState } from '../data.d';
import { RouteChildrenProps } from 'react-router-dom';
import HeaderButton from '@/components/HeaderButton';
import colors from '@/models/colors';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import DynamicFormItem from '@/components/DynamicFormItem';
import { Store } from 'antd/es/form/interface';
import RegisterInformation from '@/components/RegisterInformation';
import { validations } from '@/components/InputProps/generics';
import locales from '@/locales/pt-BR';

interface IProjectNewProps extends RouteChildrenProps {
  dispatch: any;
  location: any;
  currentUser: UserModelState['currentUser'];
  userTrack: UserModelState['userTrack'];
  loading: IProjectState['loading'];
}

const ProjectsNew: FunctionComponent<IProjectNewProps> = (props) => {
  const project: IProject = props.location.state?.project ? props.location.state?.project : defaultProjectValues;
  const [inCharge, setInCharge] = useState<string[]>(project.inCharge);
  const [urls, setURL] = useState<string[]>(project.urls);
  const [cardColor, setCardColor] = useState<string>(colors.blue);
  const mode = project.object_key ? 'edit' : 'new';
  const projectFactory = dispatcherFactory(props.dispatch);

  const onSubmitSaveProject = (store: Store) => {
    let projectPayload: IProject = {
      description: store.description,
      name: store.name,
      customer: store.customer,
      inCharge: inCharge,
      urls: urls,
      cardColor: cardColor
    };

    mode === 'new' ? projectPayload.createdBy = props.userTrack : projectPayload.modifiedBy = props.userTrack;

    return mode === 'new' ? projectFactory.postProject(projectPayload) : projectFactory.putProject(projectPayload);
  }

  return (
    <PageContainer
      title={project.object_key ?
        `${project.name} ${project.customer ? `- ${project.customer}` : ""}` :
        locales['createProject']
      }
      onBack={() => window.history.back()}
      content={[
        <Row
          justify={'end'}
        >
          <HeaderButton
            color={colors.green}
            label={mode === 'edit' ? locales['layout.edit'] : locales['layout.save']}
            icon={project.object_key ? <EditOutlined /> : <SaveOutlined />}
            loading={props.loading}
            labelOnLoading={mode === 'edit' ? locales['layout.editing'] : locales['layout.saving']}
            htmlType="submit"
            form="projectForm"
            colPros={{ xs: 24, sm: 24, md: 24, lg: 6 }}
          />
        </Row>
      ]}
    >
      <Form
        onFinish={(event) => {
          onSubmitSaveProject(event);
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
            <Form.Item style={{ padding: '15px', paddingBottom: '0px' }} label={locales["layout.defineCardColor"]}>
              <Radio.Group onChange={(value) => { setCardColor(value.target.value) }} buttonStyle="solid" size="large">
                <Radio.Button style={{ backgroundColor: colors.lightBlue, width: '100px' }} value={colors.lightBlue}>{locales["layout.blue"]}</Radio.Button>
                <Radio.Button style={{ backgroundColor: colors.red, width: '100px' }} value={colors.red}>{locales["layout.red"]}</Radio.Button>
                <Radio.Button style={{ backgroundColor: colors.yellowGreen, width: '100px' }} value={colors.yellowGreen}>{locales["layout.green"]}</Radio.Button>
                <br />
                <Radio.Button style={{ backgroundColor: colors.gold, width: '100px' }} value={colors.gold}>{locales["layout.yellow"]}</Radio.Button>
                <Radio.Button style={{ backgroundColor: colors.violet, width: '100px' }} value={colors.violet}>{locales["layout.violet"]}</Radio.Button>
                <Radio.Button style={{ backgroundColor: colors.orange, width: '100px' }} value={colors.orange}>{locales["layout.orange"]}</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <CreateInputs
              formType={"project"}
              inputValue={project}
              rowStyle={{ paddingTop: 0 }}
            />
          </Col>

          <Col xs={24} sm={24} md={8} lg={7} style={{ backgroundColor: colors.white }}>
            <DynamicFormItem
              buttonText={locales["layout.addInCharge"]}
              setValues={setInCharge}
              values={inCharge}
              fieldsTitle={`${locales["layout.inCharge"]}:`}
              placeholderInput={locales["layout.setEmailInCharge"]}
              rules={[validations.email, validations.noInvertBar]}
              formListName={'formListInCharge'}
            />
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} style={{ backgroundColor: colors.white }}>
            <DynamicFormItem
              buttonText={locales["layout.addUrls"]}
              setValues={setURL}
              values={urls}
              fieldsTitle={`${locales["layout.Urls"]}:`}
              placeholderInput={locales["layout.setUrlsRelated"]}
              formListName={'formListURLs'}
            />
          </Col>
        </Row>
      </Form>
      <br></br>

      <RegisterInformation
        createdBy={project.createdBy}
        createdOn={project.createdOn}
        seeCreateBy={project.createdBy ? true : false}
        modifiedBy={project.modifiedBy}
        modifiedOn={project.modifiedOn}
        seeModifiedBy={project.modifiedBy ? true : false}
      />
    </PageContainer >
  );
};

export default connect(({ user, projectModel }: { user: UserModelState; projectModel: IProjectState }) => ({
  currentUser: user.currentUser,
  userTrack: user.userTrack,
  loading: projectModel.loading,
}),
)(ProjectsNew)
