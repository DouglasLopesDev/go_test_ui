import React, { Dispatch, FunctionComponent, useEffect } from 'react';
import { connect, UserModelState } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { Row } from 'antd';
import { CheckSquareOutlined, FundOutlined } from '@ant-design/icons';
import HeaderButton from '@/components/HeaderButton';
import colors from '@/models/colors';
import CardProjects from '@/components/CardProjects';
import { dispatcherFactory, IProject, IProjectState } from '@/pages/projects/data.d';

export interface IDashboardProps {
  currentUser: UserModelState["currentUser"];
  projects: IProjectState["projects"];
  dispatch: Dispatch;
}

const Dashboard: FunctionComponent<IDashboardProps> = (props) => {

  let projects : IProject[] = props.projects ? props.projects : [];
  const projectFactory = dispatcherFactory(props.dispatch);

  const getProjects = (reset: boolean = false, filters: any = {}) => {
    if (!projects || reset) {
      projectFactory.getProject(filters);
    }
  }

  useEffect(() => {
    getProjects(true);
  },[props.currentUser])

  return (
    <PageContainer
      avatar={{ src: props.currentUser?.avatar }}
      title={`Bem-vindo ${props.currentUser?.name}`}
      content={[
        <Row
          justify={'end'}
        >
          <HeaderButton
            color={colors.green}
            label="Criar Projeto"
            icon={<FundOutlined />}
            htmlType="button"
            link='/projects/new'
            colPros={{ xs: 24, sm: 24, md: 24, lg: 6 }}
          />

          <HeaderButton
            color={colors.green}
            label="Criar Cenário"
            icon={<CheckSquareOutlined />}
            htmlType="button"
            link='/scenario/new'
            colPros={{ xs: 24, sm: 24, md: 24, lg: 6 }}
          />
        </Row>
      ]}
    >
      <CardProjects
        projects={projects}
      />
    </PageContainer>

  );
};

export default connect(({ user, projectModel }: { user: UserModelState; projectModel: IProjectState }) => ({
  currentUser: user.currentUser,
  projects: projectModel.projects,
}))(Dashboard);
