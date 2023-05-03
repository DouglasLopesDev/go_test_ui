import React, { FunctionComponent, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { dispatcherFactory, IProjectState, ProjectListColumns } from '../data.d';
import { connect, Dispatch, Link, UserModelState } from 'umi';
import { Row, Tooltip } from 'antd';
import List from '@/components/List';
import { FormOutlined } from '@ant-design/icons';
import colors from '@/models/colors';
import locales from '@/locales/pt-BR';

export interface IProjectsListProps {
  projects?: IProjectState["projects"];
  dispatch?: Dispatch;
  currentUser?: UserModelState["currentUser"];
  listLoading?: IProjectState["listLoading"];
  projectsCount?: IProjectState["projectsCount"];
}

const ProjectsList: FunctionComponent<IProjectsListProps> = (props) => {

  const { projects, dispatch, currentUser, projectsCount } = props;
  const projectFactory = dispatcherFactory(dispatch);

  const getProjects = (reset: boolean = false, filters: any = {}) => {
    if (!projects || reset) {

      if(!filters.pageSize)
        filters.pageSize = "10";

      if(!filters.pageIndex)
        filters.pageIndex= "1" ;

      projectFactory.getProject(filters);
    }
  }

  useEffect(() => {
    getProjects(true);
  }, [currentUser]);

  return (
    <>
      <PageContainer
        onBack={() => window.history.back()}
      >
        <Row style={{ marginTop: '20px' }}>
          <List
            onFilter={getProjects}
            loading={props.listLoading}
            columns={ProjectListColumns}
            pagination={false}
            dataSource={projects ? projects : []}
            count={projectsCount}
            selectable={true}
            options={(_, project: any) => (
              <>
                <Tooltip placement="bottom" title={`${locales["layout.projectDetails"]} ${project.name}`}>
                  <Link to={{ pathname: '/projects/new', state: { project } }}>
                    <FormOutlined style={{ color: colors.orange }} />
                  </Link>
                </Tooltip>
              </>
            )}
          ></List>
        </Row>
      </PageContainer>
    </>
  );
};

export default connect(({ projectModel, user }: { projectModel: IProjectState; user: UserModelState }) => ({
  projects: projectModel.projects,
  currentUser: user.currentUser,
  listLoading: projectModel.listLoading,
  projectsCount: projectModel.projectsCount
}),
)(ProjectsList);
